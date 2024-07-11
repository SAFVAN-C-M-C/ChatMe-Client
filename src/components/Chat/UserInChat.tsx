/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from '@/common/api';
import { config } from '@/common/configurations';
import { ChatContext } from '@/context/ChatContext';
import { RootState } from '@/redux/store';
import { IChat } from '@/types/IChat';
import { UserDetails } from '@/types/IProfile';
import axios from 'axios';
import React, { FC, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


interface UserInChatProps{
  chat:IChat
}
const UserInChat:FC<UserInChatProps>=({chat})=> {
  const { user } = useSelector(
    (state: RootState) => state.user
  );
  const appContext = useContext(ChatContext);
  const navigate = useNavigate();
  if (!appContext) {
    throw new Error('useContext must be used within an AppProvider');
  }
  const {chatId}=useParams();

  const { setChat } = appContext;
  const [isSelectedChat,setIsSelectedChat]=useState(false);
  
  useEffect(()=>{
    if(chat?._id){
      
      if(chat._id===chatId){
        
        
        setIsSelectedChat(true)
      }else{
        setIsSelectedChat(false)
      }
    }
  },[chatId]);
  const handleClick=()=>{
    setChat(chat)
    navigate(`/chat/u/${chat?._id}`)
  }
  const [reciever,setReceiver]=useState<UserDetails |null>(null)
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
  return (
    <>
        <div className={`chat-user w-full h-auto mt-1 ml-2  flex items-center   border-gray-300 hover:bg-slate-300 ${isSelectedChat?"bg-blue-500":""}`} onClick={handleClick}>
            <div className='avatar online'>
            <div className=" w-10  ml-4 mt-3 mb-3 mr-3 rounded-full">
                <img src={reciever?.avatar?reciever.avatar:"/general/ChatMe-profile.png"} alt="" className='w-full h-full rounded-full object-cover'/>
            </div>
            </div>
            <div className={`name ${isSelectedChat?"text-white":""}`}><span className=' font-semibold '>{reciever?.name}</span></div>
            
        </div>
        <div className='divider h-1 my-0 ml-2 py-0'></div>
    </>
  )
}

export default UserInChat