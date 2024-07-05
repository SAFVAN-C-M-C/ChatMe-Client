import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import CompanyBioEditModal from "../../modals/CompanyBioEditModal";



const CompanyBio = () => {
  //redux
  const { profile } = useSelector((state: RootState) => state.profile);
  const { userPosts } = useSelector((state: RootState) => state.userPosts);
  const [openEditBio,setOpenEditBio]=useState(false)

  return (
    <>
{openEditBio?<CompanyBioEditModal setOpenEditBio={setOpenEditBio}/>:null}

      {/* for phone */}
      <div className="profile-bio-sm flex-col  w-[80%] border-[.5px] border-gray-600  h-auto pb-3 rounded-xl bg-slate-50 mt-12 flex md:hidden">
        <div className="first-row w-full flex justify-center items-center h-[50px]  mt-3 mb-3">
          <div className="provile-avatar mr-4 w-[30%] flex justify-center items-center">
            <img
              src="/general/ChatMe-profile.png"
              alt="avatar"
              className="w-[40px] h-[40px]"
            />{" "}
          </div>
          <div className="user-name w-[70%] flex-wrap h-full flex items-center">
            <span className="text-md mr-1">{profile?.data.name}</span>
            {
              profile?.data.isVerified?(<Icon
                className="text-blue-500"
                icon="mdi:verified-user"
                height={20}
                width={20}
              />):null
            }
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
              <span className="font-bold flex justify-center">{profile?.data ? profile.data?.followers?.length : "0"} </span>
              Followers
            </p>
          </div>
          <div className="following ">
            <p>
              <span className="font-bold flex justify-center">{profile?.data ? profile.data?.following?.length : "0"} </span>
              Following
            </p>
          </div>
        </div>
        <div className="thrid-row mt-2 ml-2  flex w-full justify-between">
          <div className="title">
            <span className="text-gray-500 bg-slate-200 pl-4 pr-4 pt-1 pb-1 rounded-md">
              Company
            </span>
          </div>
          <div className="action flex mr-3">
            <div className="edit-profile mr-1 flex justify-center items-center">
              <Icon
                className=" cursor-pointer"
                icon="mdi:edit"
                width={20}
                height={20}
              />
            </div>
            {/* <div className="settings mr-1 flex justify-center items-center cursor-pointer">
              {" "}
              <Icon
                icon="material-symbols:settings-account-box"
                width={20}
                height={20}
              />
            </div> */}
          </div>
        </div>
        {
          profile?.data.bio?.location?(<div className="fourth-row ml-2 mt-2 flex">
          <Icon
            className="text-gray-400 mr-1"
            icon="mdi:location"
            width={26}
            height={26}
          />
          <span className="text-gray-400">{profile?.data.bio?.location}</span>
        </div>):null
        }
        {
          profile?.data.bio?.phone?(<div className="fifth-row ml-2 mt-2 flex">
          <Icon
            className="text-gray-400 mr-1"
            icon="ic:baseline-phone"
            width={26}
            height={26}
          />
          <span className="text-gray-400">+91 {profile?.data.bio?.phone}</span>
        </div>):null
        }
        {
          profile?.data.email?(<div className="sixth-row ml-2 mt-2 flex">
          <Icon
            className="text-gray-400 mr-1"
            icon="ic:baseline-email"
            width={26}
            height={26}
          />
          <span className="text-gray-400">{profile?.data.email}</span>
        </div>):null
        }
      </div>

    {/* for lap */}
      <div className="profile-bio w-[80%] border-[.5px] border-gray-600  h-auto pb-3 rounded-xl bg-slate-50 mt-12 md:flex hidden">
        <div className="profile-avatar w-[30%] h-full  flex justify-center items-center pt-2 pb-2">
          <img
            src={profile?.data?.bio?.avatar?profile.data.bio.avatar:"/general/ChatMe-profile.png"}
            alt="avatar"
            className="w-[56px] h-[56px] sm:w-[76px] sm:h-[76px] md:w-[96px] md:h-[96px] lg:w-[146px] lg:h-[146px]"
          />
        </div>
        <div className="profile-details  w-[70%] h-full flex flex-col justify-center ">
          <div className="first-row w-full flex ml-4 mt-3 mb-3">
            <div className="user-name p-2 mr-14 flex items-center">
              <span>{profile?.data.name}</span>
              {
              profile?.data.isVerified?(<Icon
                className="text-blue-500"
                icon="mdi:verified-user"  
                height={20}
                width={20}
              />):null
            }
            </div>
            <div onClick={()=>setOpenEditBio(!openEditBio)} className="edit-profile h-auto bg-slate-200 mr-5 rounded-md p-2 cursor-pointer">
              <span>Edit profile</span>
            </div>
            
          </div>
          <div className="second-row md:w-[60%] w-full flex justify-around">
            <div className="post">
              <p>
                <span className="font-bold">{userPosts?.data? userPosts?.data.length:"0"} </span>Posts
              </p>
            </div>
            <div className="follwers">
              <p>
                <span className="font-bold">{profile?.data ? profile.data?.followers?.length : "0"}</span>Followers
              </p>
            </div>
            <div className="following">
              <p>
                <span className="font-bold">{profile?.data ? profile.data?.following?.length : "0"} </span>Following
              </p>
            </div>
          </div>
          <div className="thrid-row mt-2 ml-4 pl-2">
            <span className="text-gray-500 bg-slate-200 pl-4 pr-4 pt-1 pb-1 rounded-md">
              Company
            </span>
          </div>
          {profile?.data?.bio?.location ? (
            <div className="fourth-row ml-2 mt-2 flex">
              <Icon
                className="text-gray-400 mr-1"
                icon="mdi:location"
                width={26}
                height={26}
              />
              <span className="text-gray-400">
                {profile?.data?.bio?.location}
              </span>
            </div>
          ) : null}
          {profile?.data?.bio?.phone ? (
            <div className="fifth-row ml-2 mt-2 flex">
              <Icon
                className="text-gray-400 mr-1"
                icon="ic:baseline-phone"
                width={26}
                height={26}
              />
              <span className="text-gray-400">
                +91 {profile?.data?.bio?.phone}
              </span>
            </div>
          ) : null}
          {profile?.data?.email ? (
            <div className="sixth-row ml-2 mt-2 mb-3 flex">
              <Icon
                className="text-gray-400 mr-1"
                icon="ic:baseline-email"
                width={26}
                height={26}
              />
              <span className="text-gray-400">{profile?.data?.email}</span>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CompanyBio;
