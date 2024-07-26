/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { SelectMedia } from "@/components/modals/SendMediaModal/SelectMedia";
import { ChatContext } from "@/context/ChatContext";
import { useSocket } from "@/context/SocketContext";
import { RootState } from "@/redux/store";
import { Icon } from "@iconify/react";

import axios from "axios";
import React, { useContext, useState } from "react";
import { BsSend } from "react-icons/bs";
import { useSelector } from "react-redux";

const MessageInput = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { socket } = useSocket();
  const appContext = useContext(ChatContext);
  if (!appContext) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { chat, getChat, addNewMessage } = appContext;
  const [message, setMessage] = useState<string>("");
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
  };
  const [openSelectMediaModal,setOpenSelectMediaModal]=useState(false)
  const handleSendMediaModal=()=>{
    setOpenSelectMediaModal(true)
  }
  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const receiverId = chat?.participants?.filter(
        (val) => val !== user?.data._id
      )[0];
      const formData = new FormData();
      formData.append("message", message);
      formData.append("receiverId", String(receiverId));
      formData.append("chatId", String(chat?._id));

      const res = await axios.post(`${URL}/chat/message`, formData, config);
      if (res.status === 200) {
        getChat(String(chat?._id));
        console.log(res.data.data, "===message");

        setMessage("");
        addNewMessage(res.data.data);
        if (socket) {
          socket.emit("newMessage", { obj: res.data.data, chatId: chat?._id });
        } else {
          console.error("Socket not connected yet, cannot emit message.");
        }
      }
    } catch (error: any) {
      console.log("Some thing went wrong", error.message);
    }
  };
  return (
    <>
    {
      openSelectMediaModal?<SelectMedia  setOpenSelectMediaModal={setOpenSelectMediaModal}/>:null
    }
      <form className=" px-4 mx-8 my-3" onSubmit={handleMessageSend}>
        <div className="w-full flex light-dark rounded-lg ">
          <input
            type="text"
            value={message}
            onChange={handleMessageChange}
            className=" outline-none text-sm rounded-lg block w-full p-2.5 light-dark  text-white "
            placeholder=" Send a message"
          />
          <div className=" m-3 text-white cursor-pointer" onClick={handleSendMediaModal}>
            <Icon
              icon="material-symbols:image-outline"
              width={26}
              height={26}
            />
          </div>
          <button type="submit" className=" m-3 text-white">
            <BsSend />
          </button>
        </div>
      </form>
    </>
  );
};

export default MessageInput;
