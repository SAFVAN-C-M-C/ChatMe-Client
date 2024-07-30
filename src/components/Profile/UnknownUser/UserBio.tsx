/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";

import React, { useEffect, useState } from "react";

import { ProfilePayload } from "@/redux/reducers/profileSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "@/redux/actions/user/profileActions";

interface UserBioProps {
  Userprofile: ProfilePayload | null;
  postLength?:number
}
const UserBio: React.FC<UserBioProps> = ({ Userprofile,postLength}) => {
  const [follow,setFollow]=useState(false);
  const { profile  } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    if(profile?.data.following?.find(val=>val===Userprofile?.data.userId)){
      setFollow(true);
    }else{
      setFollow(false)
    }
  },[profile?.data.following?.length])
  const handleUnfollow=()=>{
    try {
      console.log("clicked");
      dispatch(unFollowUser({userId:String(Userprofile?.data.userId)}))
      setFollow(false)
      
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  }
  const handlefollow=()=>{
    try {
      console.log("clicked");
      dispatch(followUser({userId:String(Userprofile?.data.userId)}))
      setFollow(true);
      
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  }
  return (
    <>
      {/* for phone */}
      <div data-theme={profile?.data.theme || "light"} className="Userprofile-bio-sm flex-col  w-[80%] border-[.5px] border-gray-600  h-auto pb-3 rounded-xl border-dashed mt-12 flex md:hidden">
        <div className="first-row w-full flex justify-center h-[50px]  mt-3 mb-3">
          <div className="provile-avatar mr-4 w-[30%] flex justify-center">
            <img
              src="/general/ChatMe-Userprofile.png"
              alt="avatar"
              className="w-[40px] h-[40px]"
            />{" "}
          </div>
          <div className="user-name w-[70%] flex-wrap h-full flex items-center">
            <span className="text-sm">
              {Userprofile?.data ? Userprofile?.data?.name : "User Name"}
            </span>
          </div>
        </div>
        <div className="second-row w-full flex justify-around h-auto">
          <div className="post">
            <p>
              <span className="font-bold flex justify-center">0 </span>Posts
            </p>
          </div>
          <div className="follower">
            <p>
              <span className="font-bold flex justify-center">
                {Userprofile?.data ? Userprofile.data?.followers?.length : "0"}
              </span>
              Followers
            </p>
          </div>
          <div className="following ">
            <p>
              <span className="font-bold flex justify-center">
                {Userprofile?.data ? Userprofile.data?.following?.length : "0"}{" "}
              </span>
              Following
            </p>
          </div>
        </div>
        <div className="thrid-row mt-2 ml-2  flex w-full justify-between">
          {Userprofile?.data?.title ? (
            <div className="title">
              <span className="text-gray-400">Web Developer</span>
            </div>
          ) : (
            <div className="title">
              <span className="text-gray-400 hidden"></span>
            </div>
          )}
          <div className="action flex mr-2">
            <div className="edit-Userprofile mr-1 flex justify-center items-center">
              <Icon
                className=" cursor-pointer"
                icon="mdi:edit"
                width={20}
                height={20}
              />
            </div>
            <div className="settings mr-1 flex justify-center items-center cursor-pointer">
              {" "}
              <Icon
                icon="material-symbols:settings-account-box"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
        {Userprofile?.data.bio?.location ? (
          <div className="fourth-row ml-2 mt-2 flex">
            <Icon
              className="text-gray-400 mr-1"
              icon="mdi:location"
              width={26}
              height={26}
            />
            <span className="text-gray-400">{Userprofile?.data.bio?.location}</span>
          </div>
        ) : null}
        {Userprofile?.data.bio?.phone ? (
          <div className="fifth-row ml-2 mt-2 flex">
            <Icon
              className="text-gray-400 mr-1"
              icon="ic:baseline-phone"
              width={26}
              height={26}
            />
            <span className="text-gray-400">
              +91 {Userprofile?.data.bio?.phone}
            </span>
          </div>
        ) : null}
        {Userprofile?.data.email ? (
          <div className="sixth-row ml-2 mt-2 flex">
            <Icon
              className="text-gray-400 mr-1"
              icon="ic:baseline-email"
              width={26}
              height={26}
            />
            <span className="text-gray-400">{Userprofile?.data.email}</span>
          </div>
        ) : null}
        {Userprofile?.data.bio?.resume ? (
          <div className="seventh-row ml-2 mb-2  mt-2 flex">
            <span className="text-blue-600 flex cursor-pointer">
              <Icon icon="carbon:document" width={26} height={26} />
              <p>View Resume</p>
            </span>
          </div>
        ) : null}
      </div>
      {/* lap */}
      <div data-theme={profile?.data.theme || "light"} className="Userprofile-bio w-[80%] border-[.5px] border-gray-600  h-auto pb-3 rounded-xl border-dashed mt-12 md:flex hidden">
        <div className="Userprofile-avatar w-[30%] h-full  flex justify-center items-center ">
          <img
            src={
              Userprofile?.data?.bio?.avatar
                ? Userprofile.data.bio.avatar
                : "/general/ChatMe-Userprofile.png"
            }
            alt="avatar"
            className="w-[56px] h-[56px] sm:w-[76px] sm:h-[76px] md:w-[96px] md:h-[96px] lg:w-[146px] rounded-full lg:h-[146px]"
          />
        </div>
        <div className="Userprofile-details  w-[70%] h-full ">
          <div className="first-row w-full flex h- ml-4 mt-3 mb-3">
            <div className="user-name p-2 mr-14 ">
              <span>{Userprofile?.data ? Userprofile?.data?.name : "User Name"}</span>
            </div>
            {
              !follow?<div className="edit-Userprofile h-auto bg-blue-500 mr-5 rounded-md p-2 cursor-pointer" onClick={handlefollow}>
              <span className="text-white">Follow</span>
            </div>:<div className="edit-Userprofile h-auto bg-slate-400 mr-5 rounded-md p-2 cursor-pointer" onClick={handleUnfollow}>
              <span className="text-white">Following</span>
            </div>
            }
          </div>
          <div className="second-row md:w-[60%] w-full flex justify-around">
            <div className="post">
              <p>
                <span className="font-bold">{postLength} </span>Posts
              </p>
            </div>
            <div className="follwers">
              <p>
                <span className="font-bold">
                  {Userprofile?.data ? Userprofile.data?.followers?.length : "0"}{" "}
                </span>
                Followers
              </p>
            </div>
            <div className="following">
              <p>
                <span className="font-bold">
                  {Userprofile?.data ? Userprofile.data?.following?.length : "0"}{" "}
                </span>
                Following
              </p>
            </div>
          </div>
          {Userprofile?.data?.title ? (
            <div className="thrid-row mt-2 ml-4 pl-2">
              <span className="text-gray-500">{Userprofile?.data?.title}</span>
            </div>
          ) : null}
          {Userprofile?.data?.bio?.location ? (
            <div className="fourth-row ml-2 mt-2 flex">
              <Icon
                className="text-gray-400 mr-1"
                icon="mdi:location"
                width={26}
                height={26}
              />
              <span className="text-gray-400">
                {Userprofile?.data?.bio?.location}
              </span>
            </div>
          ) : null}
          {Userprofile?.data?.bio?.phone ? (
            <div className="fifth-row ml-2 mt-2 flex">
              <Icon
                className="text-gray-400 mr-1"
                icon="ic:baseline-phone"
                width={26}
                height={26}
              />
              <span className="text-gray-400">
                +91 {Userprofile?.data?.bio?.phone}
              </span>
            </div>
          ) : null}
          {Userprofile?.data?.email ? (
            <div className="sixth-row ml-2 mt-2 mb-3 flex">
              <Icon
                className="text-gray-400 mr-1"
                icon="ic:baseline-email"
                width={26}
                height={26}
              />
              <span className="text-gray-400">{Userprofile?.data?.email}</span>
            </div>
          ) : null}
          {Userprofile?.data?.bio?.resume ? (
            <div className="seventh-row ml-4 pl-2 mt-2 flex">
              <span className="text-blue-600 flex cursor-pointer">
                <Icon icon="carbon:document" width={26} height={26} />
                <p>View Resume</p>
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UserBio;
