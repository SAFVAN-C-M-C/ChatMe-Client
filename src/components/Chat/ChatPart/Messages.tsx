import React, { FC, useContext, useEffect, useRef } from 'react'
import Message from './Message'
import { UserDetails } from '@/types/IProfile'
import { ChatContext } from '@/context/ChatContext'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import UseListenMessages from '@/hooks/UseListenMessages'


interface MessageProps{
  reciever:UserDetails|null
}
const Messages:FC<MessageProps> = ({reciever}) => {
  UseListenMessages()
  const { user } = useSelector(
    (state: RootState) => state.user
  );
  const appContext = useContext(ChatContext);
  if (!appContext) {
    throw new Error('useContext must be used within an AppProvider');
  }
  const lastMsgRef=useRef<HTMLSpanElement | null>(null);
  useEffect(()=>{
    setTimeout(()=>{
      // lastMsgRef.current?.scrollIntoView({behavior:"smooth"})
    },100)
  },[])
  const { chat } = appContext;
  return (
    <>
    <div  className="message-list-area py-2 my-2 h-[80vh] overflow-auto px-4 flex-1">
    {
      chat?.messages? chat.messages.map((message,index)=>(
          <span ref={lastMsgRef} key={index}>
            <Message  reciever={reciever} message={message} fromMe={message.senderId===user?.data._id}/>
          </span>

      )):null
    }

    </div>
    </>
  )
}

export default Messages