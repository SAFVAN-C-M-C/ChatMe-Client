/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { formateDateForChat } from "@/_lib/util/formateDateForChat";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { useChatContext } from "@/context/ChatContext";
import { useSocket } from "@/context/SocketContext";
import { RootState } from "@/redux/store";
import { IChat, IMessage } from "@/types/IChat";
import { UserDetails } from "@/types/IProfile";
import { Icon } from "@iconify/react";
import axios from "axios";

import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

interface UserInChatProps {
  chat: IChat;
}
const UserInChat: FC<UserInChatProps> = ({ chat }) => {
  const { user } = useSelector((state: RootState) => state.user);

  const { onlineUsers } = useSocket();
  const navigate = useNavigate();

  const { chatId } = useParams();

  const { setChat, getChat, myChats } = useChatContext();
  const { socket } = useSocket();
  const [isSelectedChat, setIsSelectedChat] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [unread, setUnread] = useState(0);
  useEffect(() => {
    if (chat?._id) {
      if (chat._id === chatId) {
        setIsSelectedChat(true);
      } else {
        setIsSelectedChat(false);
      }
    }
  }, [chat._id, chatId, myChats]);

  useEffect(() => {
    const getTotalUnread = (messages: IMessage[]) => {
      let count = 0;
      for (const message of messages) {
        if (!message.recieverSeen && message.receiverId === user?.data._id) {
          count++;
        }
      }
      setUnread(count);
    };
    getTotalUnread(chat.messages);
  }, [chat, user?.data._id]);
  const handleClick = () => {
    setChat(chat);

    navigate(`/chat/u/${chat?._id}`, { replace: true });
    getChat(String(chat._id));
    if (chat.unread && socket) {
      socket.emit("messageSeen", {
        chatId: String(chat?._id),
        receiverId: String(user?.data._id),
      });
    }
  };
  const [reciever, setReceiver] = useState<UserDetails | null>(null);
  useEffect(() => {
    if (reciever && onlineUsers.includes(reciever.userId)) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, [reciever?.userId, onlineUsers, reciever]);
  const getUserDetails = async (userId: string) => {
    try {
      const res = await axios.get(`${URL}/profile/get/user/${userId}`, config);
      if (res.status === 200) {
        setReceiver(res.data.data);
      }
    } catch (error: any) {
      setReceiver(null);
    }
  };
  useEffect(() => {
    if (chat?._id && chat.participants) {
      if (chat.participants[0] === user?.data._id) {
        getUserDetails(String(chat.participants[1]));
      } else {
        getUserDetails(String(chat.participants[0]));
      }
    }
  }, [chat?._id, chat.participants, user?.data._id]);
  const [formattedDate, setFormattedDate] = useState(() =>
    formateDateForChat(chat?.messages[chat?.messages?.length - 1]?.createdAt)
  );

  useEffect(() => {
    // Update the date format every minute
    const intervalId = setInterval(() => {
      setFormattedDate(
        formateDateForChat(
          chat?.messages[chat?.messages?.length - 1]?.createdAt
        )
      );
    }, 60000); // 1 minute interval

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div
        className={`chat-user relative w-[95%] h-auto mt-1 ml-3 mr-10 flex items-center rounded-md border-gray-300 hover:bg-blue-200 hover:text-black ${
          isSelectedChat ? "bg-blue-200" : ""
        }`}
        onClick={handleClick}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 ml-3 mt-3 mb-3 mr-3 rounded-full">
            <img
              src={
                reciever?.avatar
                  ? reciever.avatar
                  : "/general/ChatMe-profile.png"
              }
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
        <div className="main-part flex flex-col">
          <div
            className={`name flex items-center ${
              isSelectedChat ? "text-black" : ""
            }`}
          >
            <span className="font-semibold">{reciever?.name}</span>
            {reciever?.accountType === "company" && reciever?.isVerified ? (
              <Icon
                className="text-blue-500"
                icon="mdi:verified-user"
                height={20}
                width={20}
              />
            ) : reciever?.accountType === "recruiter" &&
              reciever?.isVerified ? (
              <Icon
                className="text-green-500"
                icon="material-symbols:verified"
                height={20}
                width={20}
              />
            ) : null}
          </div>
          <div className="last-message flex gap-1">
            {chat?.messages[chat?.messages?.length - 1]?.senderId ===
            user?.data._id ? (
              <span className="flex text-sm flex-wrap text-wrap break-all message-content">
                You:{" "}
                {chat?.messages[chat?.messages?.length - 1]?.type === "text" ? (
                  chat?.messages[chat?.messages?.length - 1]?.message
                ) : (
                  <span className="flex">
                    Media{" "}
                    <Icon
                      icon="material-symbols:image-outline"
                      width={26}
                      height={26}
                    />
                  </span>
                )}
              </span>
            ) : (
              <span className="message-content text-sm">
                {chat?.messages[chat?.messages?.length - 1]?.type === "text" ? (
                  chat?.messages[chat?.messages?.length - 1]?.message
                ) : (
                  <span className="flex text-sm">
                    Media{" "}
                    <Icon
                      icon="material-symbols:image-outline"
                      width={26}
                      height={26}
                    />
                  </span>
                )}
              </span>
            )}
            <span className="flex text-sm">
              {" "}
              . {formattedDate}
            </span>
          </div>
        </div>

        {unread > 0 ? (
          <div className="absolute right-5 flex justify-end ml-10">
            <div className="inline-flex text-white items-center justify-center font-bold w-6 h-6 text-xs border-2 border-white rounded-full bg-blue-700">
              {unread}
            </div>
          </div>
        ) : null}
      </div>
      <div className="divider h-1 my-0 ml-2 py-0"></div>
    </>
  );
};

export default UserInChat;
