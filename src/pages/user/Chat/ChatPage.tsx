import ChatPart from "@/components/Chat/ChatPart/ChatPart";
import InboxPart from "@/components/Chat/InboxPart";
import NavigationBar from "@/components/general/NavigationBar";
import UseListenMessages from "@/hooks/UseListenMessages";
import UseListenNotification from "@/hooks/UseListenNotification";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './ChatPage.css'
import { useEffect, useRef } from "react";
import { useChatContext } from "@/context/ChatContext";

function ChatPage() {
  
  const { profile } = useSelector((state: RootState) => state.profile);
  UseListenMessages()
  UseListenNotification()
  const {chatId}=useParams()
  const searchRef=useRef<HTMLInputElement | null>(null)
  const {getMyChats}=useChatContext()
  useEffect(() => {
    getMyChats();
  }, []);
  return (
    <>
      <div data-theme={profile?.data.theme || "light"} className="hidden sm:flex   overflow-hidden">
        <NavigationBar isChat={true} />
          <InboxPart serachRef={searchRef}/>
          <ChatPart serachRef={searchRef}/>
      </div>
      <div data-theme={profile?.data.theme || "light"} className="sm:hidden flex   overflow-hidden">
        <NavigationBar isChat={true} />
          {
            chatId?<ChatPart serachRef={searchRef}/>:<InboxPart serachRef={searchRef}/>
            
          }
      </div>
    </>
  );
}

export default ChatPage;
