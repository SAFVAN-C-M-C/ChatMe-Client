import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
const MessageInput = () => {
  const [message,setMessage]=useState<string>("");
  const handleMessageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();
    setMessage(e.target.value)
  }

  const handleMessageSend=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(message);
    
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
