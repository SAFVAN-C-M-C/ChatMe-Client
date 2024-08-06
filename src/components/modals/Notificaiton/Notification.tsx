/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { useNotificationSocket } from "@/context/NotificationSocket";
import { followUser, unFollowUser } from "@/redux/actions/user/profileActions";
import { INotification } from "@/redux/reducers/notification/notification";
import { AppDispatch, RootState } from "@/redux/store";
import { IPosts } from "@/types/IPosts";
import { UserDetails } from "@/types/IProfile";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface NotificationProps {
  notification: INotification;
}
const Notification: FC<NotificationProps> = ({ notification }) => {
    const {profile}=useSelector((state:RootState)=>state.profile)
    const dispatch = useDispatch<AppDispatch>();
    const { socket } = useNotificationSocket();
  const [fromUser, setFromUser] = useState<UserDetails | null>(null);
  const [post, setPost] = useState<IPosts | null>(null);
  const [isAdminMessage, setIsAdminMessage] = useState<boolean>(false);
  const [type, setType] = useState(notification.type);
  const [following, setFollowing] = useState(false);
  useEffect(()=>{
    if(profile?.data.following?.includes(String(notification?.fromUserId))){
        setFollowing(true)
    }else{
        setFollowing(false)
    }
  },[notification?.fromUserId,profile?.data.following])
  useEffect(() => {
    if (!notification.read ) {
      socket?.emit("notificationSeen", {
        receiverId: String(notification.recipientId),
        notificationId: String(notification._id),
      });
    }
  }, []);
  const getFromUser = async (userId: string) => {
    try {
      const res = await axios.get(`${URL}/profile/get/user/${userId}`, config);
      if (res.status === 200) {
        setFromUser(res.data.data);
      }
    } catch (error: any) {
      console.log("Somthing wrong", error.message);
    }
  };
  const getPost = async (postId: string) => {
    try {
      const res = await axios.get(`${URL}/post/posts/${postId}`, config);
      if (res.status === 200) {
        setPost(res.data.data);
      }
    } catch (error: any) {
      console.log("Somthing wrong", error.message);
    }
  };
  useEffect(() => {
    if (!notification.isAdminMessage) {
      setIsAdminMessage(false);
      getFromUser(String(notification.fromUserId));
      if(notification.postId){
        getPost(notification.postId)
      }
    } else {
      setIsAdminMessage(true);
    }
  }, [notification.fromUserId, notification.isAdminMessage]);
  
  const handleUnfollow=()=>{
    try {
      console.log("clicked");
      dispatch(unFollowUser({userId:String(notification?.fromUserId)}))
      
      
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  }
  const handlefollow=()=>{
    try {
      console.log("clicked");
      dispatch(followUser({userId:String(notification?.fromUserId)}))
      
      
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  }
  return (
    <>
      <div className={`Notification-container relative flex items-center rounded-md  ${profile?.data.theme==="dark"?"hover:bg-slate-600":"hover:bg-slate-200"}`}>
        <div className="avatar  w-10 m-3 ">
          <div className="img-container rounded-full w-10">
            <img
              src={
                isAdminMessage
                  ? "/logo/ChatMe--logo-color.png"
                  : fromUser?.avatar
                  ? String(fromUser?.avatar)
                  : "/general/ChatMe-profile.png"
              }
              alt=""
              className="rounded-full w-full h-full"
            />
          </div>
        </div>
        <div className="data flex flex-col">
          <div className="name">
            <span className="font-bold">
              {isAdminMessage
                ? "ChatMe Team"
                : fromUser?.name
                ? String(fromUser?.name)
                : "somebody"}
            </span>
          </div>
          {type === "like" ? (
            <div className="data flex flex-wrap">
              <span className="text-gray-400">Liked your post</span>
            </div>
          ) : type === "comment" ? (
            <div className="data flex flex-wrap">
              <span className="text-gray-400">commented on you post:</span>
              <span>{notification?.content}</span>
            </div>
          ) : type === "follow" ? (
            <div className="data flex flex-wrap">
              <span className="text-gray-400">Started to follow you</span>
            </div>
          ) : (
            <div className="data flex flex-wrap">
              <span>{notification?.content}</span>
            </div>
          )}
        </div>
        {/* here may be the post pic shows or follow button  */}
        <div className="follow-up flex justify-center absolute right-0">
          {type === "like" || type === "comment" ? (
            <div className="post w-10 h-10 m-3">
              <img
                src={post?.media}
                alt=""
                className="object-cover w-full h-full rounded-sm"
              />
            </div>
          ) : type === "follow" ? (
            <div className="follow mr-1">
                {
                    following?<span onClick={handleUnfollow} className='btn btn-outline btn-primary hover:text-white'>Following</span>:<span onClick={handlefollow} className='btn btn-primary text-white'>Follow</span> 
                }
            </div>
          ) : null}
        </div>
      </div>
      <div className="divider "></div>
    </>
  );
};

export default Notification;
