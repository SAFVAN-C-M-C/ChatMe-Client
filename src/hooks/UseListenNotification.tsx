/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import notificationSound from "@/assets/sounds/notification.mp3";
import { useNotificationSocket } from "@/context/NotificationSocket";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getNotification } from "@/redux/actions/notification/notificationAction";
import toast from "react-hot-toast";

const UseListenNotification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { socket } = useNotificationSocket();
  useEffect(() => {
    if (socket) {
      socket.on("newNotification", (newNotification: any) => {
        const sound = new Audio(notificationSound);
        sound.volume = 1.0;
        sound.muted = false;
        sound.load();
        sound.play().catch((error) => {
          console.error("Error playing sound:", error);
        });
        toast(newNotification.content, {
          icon: "🔔",
        });
        dispatch(getNotification());
      });

      socket.on("notificationSeen", (data: any) => {
        console.log(data);
        dispatch(getNotification());
      });
    }

    return () => {
      socket?.off("newNotification");
    };
  }, [dispatch, socket]);
};

export default UseListenNotification;
