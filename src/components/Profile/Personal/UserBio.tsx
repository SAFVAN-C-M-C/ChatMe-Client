import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useRef, useState } from "react";
import RecruiterApplicationModal from "../../modals/RecruiterApplicationModal";
import AvatarViewModal from "../../modals/AvatarViewModal";
import EditBioModal from "../../modals/EditBioModal";

const UserBio = () => {
  const { profile } = useSelector((state: RootState) => state.profile);


  //local state
  const [optionActive,setOptionActive]=useState(false)
  const [openEditBio, setOpenEditBio] = useState(false);
  const [requestActive,setRequestActive]=useState(false)
  const [openAvatarView,setOpenAvatarView]=useState(false)
  const optionRef=useRef<HTMLDivElement | null>(null)

//useEffects
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const handleAvatarViewModalOpen=()=>{
    setOpenAvatarView(!openAvatarView)
  }
  const handleRecruiterRequestModalOpen=()=>{
    setRequestActive(!requestActive)
  }
  // const handleAvaterViewModalOpen=()=>{
  //   setOpenAvatarView(!openAvatarView)
  // }
  //event handers
  // const handleEditButtonClick=(e:React.MouseEvent<HTMLDivElement>)=>{
  //   e.preventDefault();
  //   setEditActive(!editActive)
  // }
  const requestOptionClick=(e:React.MouseEvent<HTMLDivElement>)=>{
    e.preventDefault();
    setRequestActive(!requestActive)
  }
  const handleClickOutside = (event:MouseEvent) => {
    if (optionRef.current && !optionRef.current.contains(event.target as Node)) {
      setOptionActive(false);
    }
  };
  const settingClick=(e:React.MouseEvent<SVGSVGElement>)=>{
    e.preventDefault();
    setOptionActive(!optionActive)
  }
  
  
  return (
    <>
    {openEditBio?<EditBioModal setOpenEditBio={setOpenEditBio}/>:null}
    {
      requestActive?<RecruiterApplicationModal handleRecruiterRequestModalOpen={handleRecruiterRequestModalOpen}/>:null
    }
    {
      openAvatarView?<AvatarViewModal handleAvatarViewModalOpen={handleAvatarViewModalOpen} photoUrl={profile?.data.bio?.avatar? profile?.data.bio?.avatar:"/general/ChatMe-profile.png"}/>:null
    }
      {/* for phone */}
      <div className="profile-bio-sm flex-col  w-[80%] border-[.5px] border-gray-600  h-auto pb-3 rounded-xl bg-slate-50 mt-12 flex md:hidden">
        <div className="first-row w-full flex justify-center h-[50px]  mt-3 mb-3">
          <div className="provile-avatar mr-4 w-[30%] flex justify-center">
            <img
              src="/general/ChatMe-profile.png"
              alt="avatar"
              className="w-[40px] h-[40px]"
            />{" "}
          </div>
          <div className="user-name w-[70%] flex-wrap h-full flex items-center">
            <span className="text-sm">
              {profile?.data ? profile?.data?.name : "User Name"}
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
                {profile?.data ? profile.data?.followers?.length : "0"}
              </span>
              Followers
            </p>
          </div>
          <div className="following ">
            <p>
              <span className="font-bold flex justify-center">
                {profile?.data ? profile.data?.following?.length : "0"}{" "}
              </span>
              Following
            </p>
          </div>
        </div>
        <div className="thrid-row mt-2 ml-2  flex w-full justify-between">
          {profile?.data?.title ? (
            <div className="title">
              <span className="text-gray-400">Web Developer</span>
            </div>
          ) : (
            <div className="title">
              <span className="text-gray-400 hidden"></span>
            </div>
          )}
          <div className="action flex mr-2">
            <div className="edit-profile mr-1 flex justify-center items-center">
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
        {
          profile?.data.bio?.resume?(<div className="seventh-row ml-2 mb-2  mt-2 flex">
          <span className="text-blue-600 flex cursor-pointer">
            <Icon icon="carbon:document" width={26} height={26} />
            <p>View Resume</p>
          </span>
        </div>):null
        }
      </div>
      {/* lap */}
      <div className="profile-bio w-[80%] border-[.5px] border-gray-600  h-auto pb-3 rounded-xl bg-slate-50 mt-12 md:flex hidden">
        <div className="profile-avatar w-[30%] h-full  flex justify-center items-center ">
          <img
            onClick={()=>setOpenAvatarView(!openAvatarView)}
            src={profile?.data?.bio?.avatar?profile.data.bio.avatar:"/general/ChatMe-profile.png"}
            alt="avatar"
            className="w-[56px] h-[56px] sm:w-[76px] sm:h-[76px] md:w-[96px] md:h-[96px] lg:w-[146px] rounded-full lg:h-[146px]"
          />
        </div>
        <div className="profile-details  w-[70%] h-full ">
          <div className="first-row w-full flex h- ml-4 mt-3 mb-3">
            <div className="user-name p-2 mr-14 ">
              <span>{profile?.data ? profile?.data?.name : "User Name"}</span>
            </div>
            <div onClick={()=>setOpenEditBio(true)} className="edit-profile h-auto bg-slate-200 mr-5 rounded-md p-2 cursor-pointer">
              <span>Edit profile</span>
            </div>
            <div className="settings flex justify-center items-center cursor-pointer">
          
              <Icon
                onClick={settingClick}
                icon="material-symbols:settings-account-box"
                width={26}
                height={26}
              />
            </div>
            {
              optionActive?(<div ref={optionRef} className="setings-opotions-cover rounded-md relative top-10 left-1 bg-slate-100 w-[200px] h-auto">
                <div onClick={requestOptionClick} className="options cursor-pointer flex justify-center items-center rounded-b-md w-full border-b-[.5px] border-gray-500 h-[40px]">
                  <span>Change into Recruiter</span>
                </div>
              </div>):null
            }
            
          </div>
          <div className="second-row md:w-[60%] w-full flex justify-around">
            <div className="post">
              <p>
                <span className="font-bold">0 </span>Posts
              </p>
            </div>
            <div className="follwers">
              <p>
                <span className="font-bold">
                  {profile?.data ? profile.data?.followers?.length : "0"}{" "}
                </span>
                Followers
              </p>
            </div>
            <div className="following">
              <p>
                <span className="font-bold">
                  {profile?.data ? profile.data?.following?.length : "0"}{" "}
                </span>
                Following
              </p>
            </div>
          </div>
          {profile?.data?.title ? (
            <div className="thrid-row mt-2 ml-4 pl-2">
              <span className="text-gray-500">{profile?.data?.title}</span>
            </div>
          ) : null}
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
          {profile?.data?.bio?.resume ? (
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
