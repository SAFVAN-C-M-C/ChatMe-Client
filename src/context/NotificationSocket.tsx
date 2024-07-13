/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import io, { Socket } from "socket.io-client";
import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface NotificationSocketContextProps {
  socket: Socket | null;
  onlineUsers: any[];
}

const NotificationSocketContext = createContext<NotificationSocketContextProps>({
    socket: null,
    onlineUsers: [],
});
interface NotificationSocketProviderProps {
  children: ReactNode;
}
export const NotificationSocketProvider: FC<NotificationSocketProviderProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  useEffect(() => {
    if (user && user.data._id) {
      const socket = io("http://localhost:1236", {
        query: {
          userId: user.data._id,
        },
        withCredentials: true,
      });

      socket.on("connect", () => {
        console.log("Connected to server🌐🌐🌐");
        setSocket(socket);
      });
      socket.on("getOnlineUsers",(users)=>{
        setOnlineUsers(users)
      })


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
  }, [user?.data._id]);

  const value = {
    socket,
    onlineUsers,
  };
  return (
    <NotificationSocketContext.Provider value={value}>{children}</NotificationSocketContext.Provider>
  );
};


export const useNotificationSocket = () => {
    const context = useContext(NotificationSocketContext);
    if (!context) {
      throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
  };
