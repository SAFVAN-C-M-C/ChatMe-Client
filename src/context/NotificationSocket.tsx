/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import io, { Socket } from "socket.io-client";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import notificationSound from "@/assets/sounds/notification.mp3";
import { getNotification } from "@/redux/actions/notification/notificationAction";
import toast from "react-hot-toast";
interface NotificationSocketContextProps {
  socket: Socket | null;
  onlineUsers: any[];
}

const NotificationSocketContext = createContext<NotificationSocketContextProps>(
  {
    socket: null,
    onlineUsers: [],
  }
);
interface NotificationSocketProviderProps {
  children: ReactNode;
}
export const NotificationSocketProvider: FC<
  NotificationSocketProviderProps
> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (user && user.data._id) {
      const socket = io("https://chatme-server.safvancmc.in", {
        path: "/notification/socket.io",
        query: {
          userId: user.data._id,
        },
        transports: ["websocket"],
        withCredentials: true,
      });      

      socket.on("connect", () => {
        console.log("Connected to server🌐🌐🌐");
        setSocket(socket);
      });
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      socket.on("newAdminNotification", (newNotification: any) => {
        const sound = new Audio(notificationSound);
        sound.volume = 1.0; // Ensure the volume is set
        sound.muted = false; // Ensure the sound is not muted
        sound.load();
        if (user.data.role !== "admin") {
          sound.play().catch((error) => {
            console.error("Error playing sound:", error);
          });
          toast(newNotification.content, {
            icon: "🔔",
          });
        }
        dispatch(getNotification());
      });

      setSocket(socket);

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [socket]);

  const value = {
    socket,
    onlineUsers,
  };
  return (
    <NotificationSocketContext.Provider value={value}>
      {children}
    </NotificationSocketContext.Provider>
  );
};

export const useNotificationSocket = () => {
  const context = useContext(NotificationSocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
