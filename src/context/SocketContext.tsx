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
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: any[];
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  onlineUsers: [],
});
interface SocketProviderProps {
  children: ReactNode;
}
export const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  useEffect(() => {
    if (user && user.data._id) {
      const socket = io("https://chatme-server.safvancmc.in", {
        path: "/chat/socket.io",
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
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
