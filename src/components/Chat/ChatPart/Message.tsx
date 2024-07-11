import { RootState } from "@/redux/store";
import { IMessage } from "@/types/IChat";
import { UserDetails } from "@/types/IProfile";
import React, { FC } from "react";
import { useSelector } from "react-redux";
interface MessageProps{
  reciever:UserDetails|null;
  fromMe:boolean;
  message:IMessage
}
const Message:FC<MessageProps> = ({reciever,fromMe,message}) => {
  const { profile } = useSelector(
    (state: RootState) => state.profile
  );
  const shakeClass=message.shouldShake?"shake":""
  return (
    <>
      <div className={`chat  ${fromMe?"chat-end":"chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-8">
            <img
              src={fromMe?String(profile?.data.bio.avatar):reciever?.avatar?reciever.avatar:"/general/ChatMe-profile.png"}
              alt=""    
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
        <div className={`chat-bubble ${shakeClass} text-white bg-blue-500`}>
            {message.message}

        </div>
        {/* <div className="chat-footer opacity-50  text-sm flex gap-1 items-center">{new Date(message?.createdAt).getHours()}:{new Date(message?.createdAt).getMinutes()}</div> */}
        <div className="chat-footer  opacity-50  text-sm flex gap-1 items-center">{new Date(message?.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}</div>
      </div>
    </>
  );
};

export default Message;
