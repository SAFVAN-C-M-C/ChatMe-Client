import { RootState } from "@/redux/store";
import { UserDetails } from "@/types/IProfile";
import React, { FC } from "react";
import { useSelector } from "react-redux";
interface MessageProps{
  reciever:UserDetails|null;
  fromMe:boolean;
}
const Message:FC<MessageProps> = ({reciever,fromMe}) => {
  const { profile } = useSelector(
    (state: RootState) => state.profile
  );
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
        <div className="chat-bubble text-white bg-blue-500">
            Hi how are you

        </div>
        <div className="chat-footer opacity-50  text-sm flex gap-1 items-center">12:23</div>
      </div>
    </>
  );
};

export default Message;
