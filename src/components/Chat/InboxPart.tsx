import React from 'react'
import UserInChat from './UserInChat'

interface InboxPartProps{

}
const InboxPart:React.FC<InboxPartProps> = () => {
  return (
    <>
        <div className="inbox-container w-[25%] h-[100vh]   ">
            <div className="header w-full flex justify-center h-[10vh] items-center"><span className='font-bold text-2xl'>Chat With ChatMe😊</span></div>
            <div className="user-container overflow-y-scroll h-[90vh] border-t-[.3px] border-gray-300">
                <UserInChat/>
                <UserInChat/>
                <UserInChat/>
            </div>
        </div>
    </>
  )
}

export default InboxPart