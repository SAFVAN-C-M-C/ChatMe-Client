/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import { URL } from "@/common/api";
import { IChat, ISoccketMessage } from "@/types/IChat";
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
  addNewMessage:(newMessage:ISoccketMessage)=>void;
  setRead:()=>void;
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
  const addNewMessage=(newMessage:ISoccketMessage)=>{
    if(chat?._id===newMessage.chatId){
      getChat(chat?._id)
      getMyChats()
    }else{
      getMyChats()
    }
    
  }
  const setRead=()=>{
    getMyChats()
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
      value={{ getChat,setRead, getChatSearch,addNewMessage, chat,getMyChats, setChat, myChats, setMyChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};


export default ChatContextProvider;
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};