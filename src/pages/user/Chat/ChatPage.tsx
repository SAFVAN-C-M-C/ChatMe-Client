import ChatPart from "@/components/Chat/ChatPart";
import InboxPart from "@/components/Chat/InboxPart";
import NavigationBar from "@/components/general/NavigationBar";
import React from "react";
// import "./ChatPage.css";

function ChatPage() {
  return (
    <>
      <div className="flex   ">
        <NavigationBar isChat={true}/>
        <InboxPart/>
        <ChatPart/>
      </div>
    </>
  );
}

export default ChatPage;
