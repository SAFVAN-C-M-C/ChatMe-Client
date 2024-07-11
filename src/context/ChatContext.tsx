/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import { URL } from "@/common/api";
import { IChat, IMessage } from "@/types/IChat";
import axios from "axios";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export interface ChatContextType {
  getChatSearch: (receiverId: string,navigate:any) => Promise<void>;
  getChat: (chatId: string) => Promise<void>;
  chat: IChat | null;
  setChat: Dispatch<SetStateAction<IChat | null>>;
  setMyChats: Dispatch<SetStateAction<IChat[] | null>>;
  myChats: IChat[] | null;
  getMyChats:() => Promise<void>;
  addNewMessage:(newMessage:IMessage)=>void;
}

// Create the context with a default value
export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

const ChatContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chat, setChat] = useState<IChat | null>(null);
  const [myChats, setMyChats] = useState<IChat[] | null>(null);
  const getMyChats = async () => {
    const res = await axios.get(`${URL}/chat/`);
    if (res.status === 200) {
      setMyChats(res.data.data);
    }
  };
  useEffect(() => {
    getMyChats();
  }, []);
  const addNewMessage=(newMessage:IMessage)=>{
    setChat((prevChat) => {
      if (!prevChat) {
        return null; // or handle the case where prevChat is null
      }
      
      return {
        ...prevChat,
        messages: [
          ...prevChat.messages,
          newMessage
        ]
      };
    });
  }
  const getChatSearch = async (receiverId: string,navigate:any) => {
    try {
      console.log(receiverId, "here in get chat");

      const res = await axios.get(`${URL}/chat/search/${receiverId}`);
      console.log(res);

      if (res.status === 200) {
        console.log(chat);
        navigate(`/chat/u/${res.data.data?._id}`, { replace: true });
        setChat(res.data.data);
        getMyChats();
      }
    } catch (error: any) {
      console.log("some wrong", error.message);
    }
  };
  const getChat = async (chatId: string) => {
    try {
      console.log(chatId, "here in get chat");

      const res = await axios.get(`${URL}/chat/${chatId}`);
      console.log(res);

      if (res.status === 200) {
        console.log(chat);

        setChat(res.data.data);
        getMyChats();
      }
    } catch (error: any) {
      console.log("some wrong", error.message);
    }
  };
  return (
    <ChatContext.Provider
      value={{ getChat, getChatSearch,addNewMessage, chat,getMyChats, setChat, myChats, setMyChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
export default ChatContextProvider;
