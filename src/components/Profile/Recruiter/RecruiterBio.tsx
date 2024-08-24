import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useState } from "react";
import RecruiterBioEditModal from "../../modals/RecruiterBioEditModal";
import AvatarViewModal from "@/components/modals/AvatarViewModal";
import FollowerList from "@/components/modals/FollowModals/FollowerList";
import FollowingList from "@/components/modals/FollowModals/FollowingList";
const RecruiterBio = () => {
  //redux
  const { profile } = useSelector((state: RootState) => state.profile);
  const { userPosts } = useSelector((state: RootState) => state.userPosts);
  const [openEditBio, setOpenEditBio] = useState(false);
  const [openAvatarView, setOpenAvatarView] = useState(false);
  const [openFollowingList, setOpenFollowingList] = useState(false);
  const [openFollowerList, setOpenFollowerList] = useState(false);
  const handleAvatarViewModalOpen = () => {
    setOpenAvatarView(!openAvatarView);
  };
  return (
    <>
      {openFollowerList ? (
        <FollowerList setOpenFollowerList={setOpenFollowerList} />
      ) : null}
      {openFollowingList ? (
        <FollowingList setOpenFollowingList={setOpenFollowingList} />
      ) : null}
      {openEditBio ? (
        <RecruiterBioEditModal setOpenEditBio={setOpenEditBio} />
      ) : null}
      {openAvatarView ? (
        <AvatarViewModal
          handleAvatarViewModalOpen={handleAvatarViewModalOpen}
          photoUrl={
            profile?.data.bio?.avatar
              ? profile?.data.bio?.avatar
              : "/general/ChatMe-profile.png"
          }
        />
      ) : null}
      {/* for phone */}
      <div
        data-theme={profile?.data.theme || "light"}
        className="profile-bio-sm flex-col  w-[95%]  border-[.5px] border-gray-600  h-auto pb-3 rounded-lg border-dashed mt-12 flex md:hidden"
      >
        <div className="first-row w-full flex justify-start h-auto  m-3 gap-2">
          <div className="provile-avatar flex justify-center items-center">
            <img
              src={
                profile?.data.bio?.avatar
                  ? profile?.data.bio?.avatar
                  : "/general/ChatMe-profile.png"
              }
              alt="avatar"
              className="w-[40px] h-[40px] rounded-full"
            />{" "}
          </div>
          <div className="user-name  flex-wrap h-auto flex gap-1 items-center">
            <span className="text-sm sm:text-base md:text-lg">
              {profile?.data.name}
            </span>
            {profile?.data.isVerified ? (
              <Icon
                className="text-green-500 w-[14px] h-[14px]"
                icon="material-symbols:verified"
              />
            ) : null}
          </div>
        </div>
        <div className="second-row w-full flex justify-around h-auto text-sm sm:text-base md:text-lg">
          <div className="post">
            <p>
              <span className="font-bold flex justify-center">
                {userPosts?.data ? userPosts?.data.length : "0"}{" "}
              </span>
              Posts
            </p>
          </div>
          <div className="follower">
            <p>
              <span className="font-bold flex justify-center">
                {profile?.data ? profile.data?.followers?.length : "0"}{" "}
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
          <div className="title">
            <span
              className={`text-gray-500 text-sm sm:text-base md:text-lg  ${
                profile?.data.theme === "dark"
                  ? "bg-gray-600 text-slate-300"
                  : "bg-slate-200"
              } pl-4 pr-4 pt-1 pb-1 mr-2 rounded-md`}
            >
              Recruiter
            </span>
            {/* <span className="text-gray-500 bg-slate-200 pl-4 pr-4 pt-1 pb-1 rounded-md">
                {profile?.data.campanyId}
              </span> */}
          </div>
          <div className="action flex mr-3 text-sm sm:text-base md:text-lg">
            <div className="edit-profile mr-1 flex justify-center items-center">
              <Icon
                onClick={() => setOpenEditBio(!openEditBio)}
                className="cursor-pointer w-[18px]  h-[18px] sm:w-[20px] sm:h-[20px]"
                icon="mdi:edit"
              />
            </div>
          </div>
        </div>
        {profile?.data.bio?.location ? (
          <div className="fourth-row ml-2 mt-2 flex items-center text-sm sm:text-base md:text-lg">
            <Icon
              className="text-gray-400 mr-1 w-[16px]  h-[16px] sm:w-[18px] sm:h-[18px]"
              icon="mdi:location"
            />
            <span className="text-gray-400">{profile?.data.bio?.location}</span>
          </div>
        ) : null}
        {profile?.data.bio?.phone ? (
          <div className="fifth-row ml-2 mt-2 flex items-center">
            <Icon
              className="text-gray-400 mr-1 w-[16px]  h-[16px] sm:w-[18px] sm:h-[18px]"
              icon="ic:baseline-phone"
            />
            <span className="text-gray-400 text-sm sm:text-base md:text-lg">
              +91 {profile?.data.bio?.phone}
            </span>
          </div>
        ) : null}
        {profile?.data.email ? (
          <div className="sixth-row ml-2 mt-2 flex items-center">
            <Icon
              className="text-gray-400 mr-1 w-[16px]  h-[16px] sm:w-[18px] sm:h-[18px]"
              icon="ic:baseline-email"
            />
            <span className="text-gray-400 text-sm sm:text-base md:text-lg">
              {profile?.data.email}
            </span>
          </div>
        ) : null}
      </div>
      {/* for lap */}
      <div
        data-theme={profile?.data.theme || "light"}
        className="profile-bio w-[80%] border-[.5px] border-gray-600  h-auto pb-3 rounded-xl border-dashed mt-12 md:flex hidden"
      >
        <div className="profile-avatar w-[30%] h-full  flex justify-center items-center pt-2 pb-2">
          <img
            onClick={() => setOpenAvatarView(!openAvatarView)}
            src={
              profile?.data?.bio?.avatar
                ? profile.data.bio.avatar
                : "/general/ChatMe-profile.png"
            }
            alt="avatar"
            className="w-[56px] h-[56px] sm:w-[76px] sm:h-[76px] md:w-[96px] md:h-[96px] lg:w-[146px] rounded-full lg:h-[146px]"
          />
        </div>
        <div className="profile-details  w-[70%] h-full flex flex-col justify-center ">
          <div className="first-row w-full flex ml-4 mt-3 mb-3">
            <div className="user-name p-2 mr-14 flex items-center">
              <span>
                {profile?.data.name ? profile?.data.name : "User Name"}
              </span>
              {profile?.data.isVerified ? (
                <Icon
                  className="text-green-500"
                  icon="material-symbols:verified"
                  height={20}
                  width={20}
                />
              ) : null}
            </div>
            <div
              onClick={() => setOpenEditBio(!openEditBio)}
              className="edit-profile btn btn-info mr-3"
            >
              <span className="text-white">Edit profile</span>
            </div>
          </div>
          <div className="second-row md:w-[60%] w-full flex justify-around">
            <div className="post">
              <p>
                <span className="font-bold">
                  {userPosts?.data ? userPosts?.data.length : "0"}{" "}
                </span>
                Posts
              </p>
            </div>
            <div className="follwers">
              <p
                className="cursor-pointer"
                onClick={() => setOpenFollowerList(true)}
              >
                <span className="font-bold">
                  {profile?.data ? profile.data?.followers?.length : "0"}{" "}
                </span>
                Followers
              </p>
            </div>
            <div className="following">
              <p
                className="cursor-pointer"
                onClick={() => setOpenFollowingList(true)}
              >
                <span className="font-bold">
                  {profile?.data ? profile.data?.following?.length : "0"}
                </span>
                Following
              </p>
            </div>
          </div>
          <div className="thrid-row mt-2 ml-4 pl-2 flex">
            <span
              className={`text-gray-500  ${
                profile?.data.theme === "dark"
                  ? "bg-gray-600 text-slate-300"
                  : "bg-slate-200"
              }   pl-4 pr-4 pt-1 pb-1 mr-3 rounded-md`}
            >
              Recruiter
            </span>
            {/* <span className="text-gray-500 bg-slate-200 pl-4 pr-4 pt-1 pb-1 rounded-md">
              Company Name
            </span> */}
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

export default RecruiterBio;
