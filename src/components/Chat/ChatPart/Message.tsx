import { useChatContext } from "@/context/ChatContext";
import { useSocket } from "@/context/SocketContext";
import { RootState } from "@/redux/store";
import { IMessage } from "@/types/IChat";
import { UserDetails } from "@/types/IProfile";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
interface MessageProps {
  reciever: UserDetails | null;
  fromMe: boolean;
  message: IMessage;
}

const Message: FC<MessageProps> = ({ reciever, fromMe, message }) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const { socket } = useSocket();
  const { chat } = useChatContext();

  useEffect(() => {
    if (!message.recieverSeen && message.receiverId === profile?.data.userId) {
      socket?.emit("messageSeen", {
        chatId: String(chat?._id),
        receiverId: String(message.receiverId),
        messageId: String(message._id),
      });
    }
  }, [message, profile, socket, chat]);

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <>
      <div className={`chat ${fromMe ? "chat-end" : "chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-8">
            <img
              src={
                fromMe
                  ? String(profile?.data.bio.avatar)
                  : reciever?.avatar
                  ? reciever.avatar
                  : "/general/ChatMe-profile.png"
              }
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
        <div
          className={`chat-bubble ${shakeClass} break-all whitespace-pre-wrap flex flex-wrap text-white ${
            fromMe ? "bg-blue-200 " : "bg-blue-700"
          }`}
        >
          {message.type === "text" ? (
            <span className={`${fromMe ? "text-black " : "text-white"}`}>
              {message.message}
            </span>
          ) : message.type === "image" ? (
            <span className={`${fromMe ? "text-black " : "text-white "}`}>
              <img src={message.media} alt="" className="w-[300px]" />
            </span>
          ) : message.type === "image" ? (
            <span className={`${fromMe ? "text-black " : "text-white"}`}>
              <video src={message.media}></video>
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="chat-footer opacity-50 text-sm flex gap-1 items-center">
          <span className={`text-white`}>{new Date(message?.createdAt).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}</span>
        </div>
      </div>
    </>
  );
};

export default Message;
