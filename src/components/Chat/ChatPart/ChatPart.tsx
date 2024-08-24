/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */

import React, { FC, useContext, useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useNavigate, useParams } from "react-router-dom";
import { ChatContext } from "@/context/ChatContext";
import axios from "axios";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { UserDetails } from "@/types/IProfile";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Icon } from "@iconify/react";
import { useSocket } from "@/context/SocketContext";

interface ChatPartProps {
  serachRef: React.MutableRefObject<HTMLInputElement | null>;
}
const ChatPart: React.FC<ChatPartProps> = ({ serachRef }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { profile } = useSelector((state: RootState) => state.profile);
  const { onlineUsers } = useSocket();
  const appContext = useContext(ChatContext);
  const [isChatSelected, setIsChatSelected] = useState(false);
  const [reciever, setReceiver] = useState<UserDetails | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  if (!appContext) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { chat, getChat } = appContext;
  const handleBackToChat = () => {
    navigate("/chat", { replace: true });
  };
  useEffect(() => {
    if (chatId) {
      setIsChatSelected(true);
      if (!chat?._id) {
        getChat(chatId);
      }
      //
    } else {
      setIsChatSelected(false);
    }
  }, [chatId, chat?._id, getChat]);

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
  }, [chat?._id, chat?.participants, user?.data._id]);
  useEffect(() => {
    if (reciever && onlineUsers.includes(reciever.userId)) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, [reciever?.userId, onlineUsers, reciever]);
  const handleUserClick = (userId: string) => {
    if (userId === profile?.data.userId) {
      navigate(`/profile`);
      return;
    }
    navigate(`/u/profile/${userId}`);
  };
  return (
    <>
      {isChatSelected ? (
        <div
          className={` ${
            profile?.data.theme === "dark" ? "chat_dark_main" : "chat_main"
          }  h-[100vh] w-full sm:w-[50%] md:w-[60%] lg:w-[80%]  overflow-hidden`}
        >
          <div
            className={`header w-full flex ${
              profile?.data.theme === "dark" ? "light-dark" : "bg-slate-200"
            }  h-[10vh]  items-center`}
          >
            <Icon
              className="sm:hidden flex cursor-pointer"
              icon={"weui:back-filled"}
              width={26}
              height={26}
              onClick={handleBackToChat}
            />
            <div
              className={`avatar ${isOnline ? "online" : ""} cursor-pointer`}
              onClick={() => handleUserClick(String(reciever?.userId))}
            >
              <div className=" w-10  ml-4 mt-3 mb-3 mr-3 rounded-full">
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
            <div
              className="name items-center flex cursor-pointer"
              onClick={() => handleUserClick(String(reciever?.userId))}
            >
              <span>{reciever?.name}</span>
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
          </div>

          <Messages reciever={reciever} />
          <MessageInput />
        </div>
      ) : (
        <NoChatSelected theme={profile?.data.theme} serachRef={serachRef} />
      )}
    </>
  );
};
interface NoChatSelectedProps {
  theme?: string | null;
  serachRef: React.MutableRefObject<HTMLInputElement | null>;
}
const NoChatSelected: FC<NoChatSelectedProps> = ({ theme, serachRef }) => {
  const handleClick = () => {
    if (serachRef.current) {
      serachRef.current.value = "dffs";

      serachRef.current.focus(); // Set focus to the input field
    }
  };
  return (
    <>
      <div
        className={`${
          theme === "dark" ? "chat_dark_main" : "chat_main"
        } h-[100vh] w-[80%] flex justify-center items-center`}
      >
        <div className="btn btn-primary">
          <span className="text-white" onClick={handleClick}>
            Select a chat
          </span>
        </div>
      </div>
    </>
  );
};
export default ChatPart;
