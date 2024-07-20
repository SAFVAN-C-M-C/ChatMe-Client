import  { FC, useEffect, useRef } from "react";
import Message from "./Message";
import { UserDetails } from "@/types/IProfile";
import {  useChatContext } from "@/context/ChatContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UseListenMessages from "@/hooks/UseListenMessages";

interface MessageProps {
  reciever: UserDetails | null;
}
const Messages: FC<MessageProps> = ({ reciever }) => {
  UseListenMessages();
  const { user } = useSelector((state: RootState) => state.user);
  const { chat } = useChatContext();
  const sample = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setTimeout(() => {
      sample.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  }, [chat?.messages]);
  return (
    <>
      <div className="message-list-area py-2 my-2 h-[80vh] overflow-y-auto overflow-x-hidden px-4 flex-1">
        {chat?.messages
          ? chat.messages.map((message, index) => (
              <Message
                key={index}
                reciever={reciever}
                message={message}
                fromMe={message.senderId === user?.data._id}
              />
            ))
          : null}
        <div ref={sample}></div>
      </div>
    </>
  );
};

export default Messages;
