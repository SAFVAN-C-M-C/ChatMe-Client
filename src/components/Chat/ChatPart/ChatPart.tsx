/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */


import React, { useContext, useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useParams } from "react-router-dom";
import { ChatContext } from "@/context/ChatContext";
import axios from "axios";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { UserDetails } from "@/types/IProfile";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Icon } from "@iconify/react";
import { useSocket } from "@/context/SocketContext";


interface ChatPartProps {}
const ChatPart: React.FC<ChatPartProps> = () => {
  const { user } = useSelector(
    (state: RootState) => state.user
  );
  const {onlineUsers}=useSocket()
  const appContext = useContext(ChatContext);
  const [isChatSelected,setIsChatSelected]=useState(false)
  const [reciever,setReceiver]=useState<UserDetails |null>(null)
  const [isOnline, setIsOnline] = useState(false);
  if (!appContext) {
    throw new Error('useContext must be used within an AppProvider');
  }
  const {chatId}=useParams();

  const { chat,getChat } = appContext;
  useEffect(()=>{
      if(chatId){
        setIsChatSelected(true)
        if(!chat?._id){
          getChat(chatId)
        }
        // 
      }else{
        setIsChatSelected(false)
      }
  },[chatId,chat?._id,getChat])

  const getUserDetails=async(userId:string)=>{
    try {
      const res=await axios.get(`${URL}/profile/get/user/${userId}`,config)
      if(res.status===200){
        setReceiver(res.data.data)
      }
    } catch (error:any) {
      console.log("Somthing wrong",error.message);
      
    }
  }
  useEffect(()=>{
    if(chat?._id && chat.participants){
      if(chat.participants[0]===user?.data._id){
        getUserDetails(String(chat.participants[1]))
      }else{
        getUserDetails(String(chat.participants[0]))
      }
    }
  },[chat?._id])
  useEffect(()=>{
    if(reciever && onlineUsers.includes(reciever.userId)){
      setIsOnline(true)
    }else{
      setIsOnline(false)
    }
  },[reciever?.userId,onlineUsers])
  return (
    <>
      {
        isChatSelected?(<div className="chat_main  h-[100vh] w-[80%]  overflow-hidden">
          <div className="header w-full flex  h-[10vh] bg-slate-200 items-center">
            <div className={`avatar ${isOnline?"online":""}`}>
              <div className=" w-10  ml-4 mt-3 mb-3 mr-3 rounded-full">
                <img
                  src={reciever?.avatar?reciever.avatar:"/general/ChatMe-profile.png"}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div className="name items-center flex"><span>{reciever?.name}</span>
            {reciever?.accountType === "company" && reciever?.isVerified ? (
            <Icon
              className="text-blue-500"
              icon="mdi:verified-user"
              height={20}
              width={20}
            />
          ) : reciever?.accountType === "recruiter" && reciever?.isVerified ? (
            <Icon
                className="text-green-500"
                icon="material-symbols:verified"  
                height={20}
                width={20}
              />
          ) : null}</div>
          </div>
  
  
          <Messages reciever={reciever}/>
          <MessageInput/>
  
        </div>):(<NoChatSelected/>)
      }
    </>
  );
};
const NoChatSelected=()=>{
  return (
    <>
    <div className=" chat_main h-[100vh] w-[80%] flex justify-center items-center">
      <div className="btn btn-primary">
        <span className="text-white">Select a chat</span>
      </div>
    </div>
    </>
  )
}
export default ChatPart;
