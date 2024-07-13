/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useEffect } from "react";
import notificationSound from "@/assets/sounds/notification.mp3";
import { useNotificationSocket } from "@/context/NotificationSocket";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
// import { addNotification } from "@/redux/reducers/notification/notification";
import { getNotification } from "@/redux/actions/notification/notificationAction";

const UseListenNotification = () => {
    const dispatch = useDispatch<AppDispatch>();
  const { socket } = useNotificationSocket();
  useEffect(() => {
    if (socket) {
      socket.on("newNotification", (newNotification: any) => {
        const sound = new Audio(notificationSound);
        sound.volume = 1.0; // Ensure the volume is set
        sound.muted = false; // Ensure the sound is not muted
        sound.load();
        sound.play().catch((error) => {
          console.error("Error playing sound:", error);
        });
        // dispatch(addNotification(newNotification))
        // addNewMessage(newMessage);
        dispatch(getNotification())
      });
      socket.on("notificationSeen",(data:any)=>{
        console.log(data);
        dispatch(getNotification())
      })
    }

    

    return () => {
      socket?.off("newMessage");
    };
  }, [socket]);
};

export default UseListenNotification;
