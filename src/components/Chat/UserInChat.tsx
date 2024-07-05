import React from 'react'

function UserInChat() {
  return (
    <>
        <div className="chat-user w-full h-auto mt-1 ml-2  flex items-center  border-gray-300 hover:bg-slate-300">
            <div className="avatar w-[40px] h-[40px] ml-4 mt-3 mb-3 mr-3 ">
                <img src="/general/ChatMe-profile.png" alt="" className='w-full h-full rounded-full object-cover'/>
            </div>
            <div className="name"><span className=' font-semibold '>Name</span></div>
        </div>
    </>
  )
}

export default UserInChat