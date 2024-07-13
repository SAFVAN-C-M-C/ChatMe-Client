/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { ChatContext } from "@/context/ChatContext";
import { useSocket } from "@/context/SocketContext";
import { RootState } from "@/redux/store";

import axios from "axios";
import React, { useContext, useState } from "react";
import { BsSend } from "react-icons/bs";
import { useSelector } from "react-redux";

const MessageInput = () => {
  const { user } = useSelector(
    (state: RootState) => state.user
  );
  const {socket}=useSocket()
  const appContext = useContext(ChatContext);
  if (!appContext) {
    throw new Error('useContext must be used within an AppProvider');
  }
  const { chat,getChat,addNewMessage, } = appContext;
  const [message,setMessage]=useState<string>("");
  const handleMessageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();
    setMessage(e.target.value)
  }

  const handleMessageSend=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      const receiverId=chat?.participants?.filter((val)=>val!==user?.data._id)[0]
      const formData=new FormData();
      formData.append("message",message);
      formData.append("receiverId",String(receiverId));
      formData.append("chatId",String(chat?._id));

      const res=await axios.post(`${URL}/chat/message`,formData,config);
      if(res.status===200){
        getChat(String(chat?._id))
        console.log(res.data.data,"===message");
        
        setMessage('')
        addNewMessage(res.data.data)
        if (socket) {
          socket.emit('newMessage', { obj: res.data.data,chatId:chat?._id });
        } else {
          console.error('Socket not connected yet, cannot emit message.');
        }
      }
    } catch (error:any) {
      console.log("Some thing went wrong",error.message);
      
    }
    
  }
  return (
    <>
    <form className=" px-4 mx-8 my-3" onSubmit={handleMessageSend}>
        <div className="w-full flex bg-gray-700 rounded-lg ">
            <input type="text"
            
            value={message}
            onChange={handleMessageChange}
            className="border outline-none text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white " placeholder=" Send a message" />
            <button type="submit" className=" m-3 text-white">
                <BsSend/>
            </button>

        </div>

    </form>
      {/* <div className="message-send w-full flex justify-center items-center ">
        <div className="input-container w-[80%]  h-[6vh] bg-slate-200 rounded-lg flex items-center">
          <input type="text" className="w-full h-full outline-none ml-4" />
          <Icon icon={"tabler:send"} width={26} height={26} className="mr-3" />
        </div>
      </div> */}
    </>
  );
};

export default MessageInput;
