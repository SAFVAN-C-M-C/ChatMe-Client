import React, { FC } from 'react'
import Message from './Message'
import { UserDetails } from '@/types/IProfile'


interface MessageProps{
  reciever:UserDetails|null
}
const Messages:FC<MessageProps> = ({reciever}) => {
  return (
    <>
    <div className="message-list-area py-2 my-2 h-[80vh] overflow-auto px-4 flex-1">
        <Message reciever={reciever} fromMe={true}/>
        <Message reciever={reciever} fromMe={false}/>
        <Message reciever={reciever} fromMe={false}/>
        <Message reciever={reciever} fromMe={false}/>

    </div>
    </>
  )
}

export default Messages