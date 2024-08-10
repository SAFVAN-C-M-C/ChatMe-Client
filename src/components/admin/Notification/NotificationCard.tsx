/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { formatDate } from "@/helper/formateDate";
import { INotification } from "@/redux/reducers/notification/notification";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";

import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";


interface NotificationCardProps{
  notification:INotification;
  getNotification:()=>Promise<void> 
}
const NotificationCard:FC<NotificationCardProps> = ({notification,getNotification}) => {
  const colors = [

    "bg-green-900",
    "bg-purple-900",
    "bg-violet-900",
    "bg-orange-900",
    "bg-emerald-900",
  ];
  const [bgColor, setBgColor] = useState("lime");

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  }, []);

  const handleDelete=async()=>{
    try {
      const res = await axios.post(`${URL}/notification/admin/${notification._id}`, config);
      console.log(res);
      
      if(res.status===200){
        getNotification()
        toast.success("Notification deleted")
      }
    } catch (error:any) {
      console.log(error.message);
      toast.error("somthing went wrong")
      
    }
  }
  return (
    <>
      <div className={`card job_card ${bgColor} h w-[300px] shadow-xl`}>
        <div className="card-body">
          <h2 className="card-title break-all whitespace-pre-wrap ">{notification.title}</h2>
          <Icon onClick={handleDelete} className="absolute right-1 job_card  " icon={"material-symbols:delete"} width={26} height={26}/>
          <p className="break-all whitespace-pre-wrap">{notification.content}</p>
          <p>Date:{formatDate(notification.createdAt)}</p>
        </div>
      </div>
    </>
  );
};

export default NotificationCard;
