import { Icon } from '@iconify/react'
import {  TextField } from '@mui/material'
import React from 'react'
interface ChatPartProps{

}
const ChatPart:React.FC<ChatPartProps> = () => {
  return (
    <>
    <div className="chat_main  h-[100vh] w-[80%]">
    <div className="header w-full flex  h-[10vh] bg-slate-200 items-center">
      <div className="avatar w-[40px] h-[40px] ml-4 mt-3 mb-3 mr-3"><img src="/general/ChatMe-profile.png" alt="" className='w-full h-full rounded-full'/></div>
      <div className="name">Name</div>  
    </div>
    <div className="message-list-area  h-[80vh] overflow-auto">

    </div>
    <div className="message-send w-full flex justify-center items-center ">
      <div className="input-container w-[80%]  h-[6vh] bg-slate-200 rounded-lg flex items-center">
      <input type="text"  className='w-full h-full outline-none ml-4'/>
      <Icon icon={"tabler:send"} width={26} height={26} className='mr-3'/>
      </div>
    </div>
    </div>
    </>
  )
}

export default ChatPart