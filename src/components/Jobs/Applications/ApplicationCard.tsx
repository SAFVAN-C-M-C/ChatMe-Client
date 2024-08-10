/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { capitalizeString } from "@/_lib/util/capitalizeString";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import ViewApplicationModal from "@/components/modals/Application/ViewApplicationModal";
import { formatDate } from "@/helper/formateDate";
import { RootState } from "@/redux/store";
import { IJobApplicationFromBackend } from "@/types/IJob";
import { UserDetails } from "@/types/IProfile";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ApplicationCardProps {
  application: IJobApplicationFromBackend;
  fetchApplications: () => Promise<void>
}
const ApplicationCard: FC<ApplicationCardProps> = ({ application,fetchApplications }) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const [user,setUser]=useState<UserDetails | null>(null);
useEffect(()=>{
  const getUserDetails = async (userId: string) => {
    try {
      const res = await axios.get(`${URL}/profile/get/user/${userId}`, config);
      if (res.status === 200) {
        setUser(res.data.data);
      }
    } catch (error: any) {
      console.log("Something wrong", error.message);
    }
  };
  if(!user){
    getUserDetails(application.userId)
  }
},[application.userId, user])
  const [openViewApplicationModal,setOpenViewApplicationModal]=useState(false);
  return (
    <>
    {
      openViewApplicationModal && user?<ViewApplicationModal fetchApplications={fetchApplications} user={user} application={application} setOpenViewApplicationModal={setOpenViewApplicationModal}/>:null
    }
    <div
    onClick={()=>setOpenViewApplicationModal(true)}
      data-theme={profile?.data.theme || "light"}
      className="card job_card bg-slate-100 overflow-hidden cursor-pointer  border-blue-900 border-[.5px] h w-[300px] "
    >
      <div
        data-theme={profile?.data.theme || "light"}
        className="card-body rounded-b-lg gap-1 relative"
      >
        <div className="main flex w-full gap-2">
          <div className="avatar-part  w-[50px]   flex justify-center items-center">
            <img src={user?.avatar?user.avatar:"/general/ChatMe-profile.png"} alt="" className="w-[50px] rounded-full"/>
          </div>
          <div className="content-part w-[80%] flex flex-col gap-3">
            <span className=" flex">{application.name}</span>
            <span className="flex">{application.email}</span>
            <span>Applied on: {formatDate(application.createdAt)}</span>
            <span className={`absolute right-2 top-2 ${application.status==="applied"?"text-blue-600":application.status==="reviewed"?"text-blue-900":application.status==="rejected"?"text-red-600":application.status==="accepted"?"text-green-600":""}`}> {capitalizeString(application.status)}</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ApplicationCard;
