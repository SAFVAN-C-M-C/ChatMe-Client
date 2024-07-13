import ChatPart from "@/components/Chat/ChatPart/ChatPart";
import InboxPart from "@/components/Chat/InboxPart";
import NavigationBar from "@/components/general/NavigationBar";
import UseListenMessages from "@/hooks/UseListenMessages";
import UseListenNotification from "@/hooks/UseListenNotification";
import { useParams } from "react-router-dom";


function ChatPage() {
  UseListenMessages()
  UseListenNotification()
  const {chatId}=useParams()
  return (
    <>
      <div className="hidden sm:flex   overflow-hidden">
        <NavigationBar isChat={true} />
          <InboxPart />
          <ChatPart />
      </div>
      <div className="sm:hidden flex   overflow-hidden">
        <NavigationBar isChat={true} />
          {
            chatId?<ChatPart />:<InboxPart />
            
          }
      </div>
    </>
  );
}

export default ChatPage;
