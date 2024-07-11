/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatContext } from "@/context/ChatContext";
import { useSocket } from "@/context/SocketContext";
import { useContext, useEffect } from "react";
import notificationSound from "@/assets/sounds/notification.mp3";
const UseListenMessages = () => {
  const { socket } = useSocket();
  const appContext = useContext(ChatContext);
  if (!appContext) {
    throw new Error("useContext must be used within an AppProvider");
  }
  const { addNewMessage } = appContext;
  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage: any) => {
        newMessage.obj.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.volume = 1.0; // Ensure the volume is set
        sound.muted = false; // Ensure the sound is not muted
        sound.load();
        sound.play().catch((error) => {
          console.error("Error playing sound:", error);
        });
        addNewMessage(newMessage.obj);
      });
    }
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, addNewMessage]);
};

export default UseListenMessages;
