import ChatPart from "@/components/Chat/ChatPart/ChatPart";
import InboxPart from "@/components/Chat/InboxPart";
import NavigationBar from "@/components/general/NavigationBar";
import ChatContextProvider from "@/context/ChatContext";
import { useParams } from "react-router-dom";

function ChatPage() {
  return (
    <>
      <div className="flex   overflow-hidden">
        <NavigationBar isChat={true} />
        <ChatContextProvider>
          <InboxPart />
          <ChatPart />
        </ChatContextProvider>
      </div>
    </>
  );
}

export default ChatPage;
