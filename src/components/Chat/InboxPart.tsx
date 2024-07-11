import React, { useContext } from 'react'
import UserInChat from './UserInChat'
import SearchInput from './SearchInput'
import { ChatContext } from '@/context/ChatContext';

interface InboxPartProps{

}
const InboxPart:React.FC<InboxPartProps> = () => {
  const appContext = useContext(ChatContext);

  if (!appContext) {
    throw new Error('useContext must be used within an AppProvider');
  }

  const { myChats} = appContext;
  return (
    <>
        <div className="inbox-container w-[25%] h-[100vh] ">
            <div className="header w-full flex justify-center h-[10vh] items-center"><span className='font-bold text-2xl'>Chat With ChatMe😊</span></div>
            <SearchInput/>
            <div className="user-container  overflow-y-auto overflow-x-hidden h-[90vh] ">
            {
  myChats && myChats.length > 0 ? 
    myChats.map((chat, index) => (
      <UserInChat chat={chat} key={index} />
    )) 
    : null
}
                {/* <UserInChat/>
                <UserInChat/>
                <UserInChat/> */}
            </div>
        </div>
    </>
  )
}

export default InboxPart