import { Icon } from "@iconify/react";

const UserBio = () => {
  return (
    <>
      {/* for phone */}
      <div className="profile-bio-sm flex-col  w-[80%] border-[.5px] border-gray-600  h-auto rounded-xl bg-slate-50 mt-12 flex md:hidden">
        <div className="first-row w-full flex justify-center h-[50px]  mt-3 mb-3">
          <div className="provile-avatar mr-4 w-[30%] flex justify-center">
            <img
              src="/general/ChatMe-profile.png"
              alt="avatar"
              className="w-[40px] h-[40px]"
            />{" "}
          </div>
          <div className="user-name w-[70%] flex-wrap h-full flex items-center">
            <span className="text-sm">SAFVAN CMC</span>
          </div>
          
        </div>
        <div className="second-row w-full flex justify-around h-auto">
          <div className="post">
            <p>
              <span className="font-bold flex justify-center">3 </span>Posts
            </p>
          </div>
          <div className="follower">
            <p>
              <span className="font-bold flex justify-center">1,661 </span>
              Followers
            </p>
          </div>
          <div className="following ">
            <p>
              <span className="font-bold flex justify-center">114 </span>
              Following
            </p>
          </div>
        </div>
        <div className="thrid-row mt-2 ml-2  flex w-full justify-between">
            <div className="title">
            <span className="text-gray-500">Web Developer</span>
            </div>
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
          <div className="fourth-row ml-2 mt-2 ">
            <span className="text-blue-600">Tirur, Kerala</span>
          </div>
          <div className="fourth-row ml-2 mb-2  mt-2 flex">
            <span className="text-blue-600 flex cursor-pointer">
              <Icon icon="carbon:document" width={26} height={26} />
              <p>View Resume</p>
            </span>
          </div>
      </div>
      <div className="profile-bio w-[80%] border-[.5px] border-gray-600  h-[200px] rounded-xl bg-slate-50 mt-12 md:flex hidden">
        <div className="profile-avatar w-[30%] h-full  flex justify-center items-center ">
          <img
            src="/general/ChatMe-profile.png"
            alt="avatar"
            className="w-[56px] h-[56px] sm:w-[76px] sm:h-[76px] md:w-[96px] md:h-[96px] lg:w-[146px] lg:h-[146px]"
          />
        </div>
        <div className="profile-details  w-[70%] h-full ">
          <div className="first-row w-full flex ml-4 mt-3 mb-3">
            <div className="user-name p-2 mr-14 ">
              <span>SAFVAN CMC</span>
            </div>
            <div className="edit-profile bg-slate-300 mr-5 rounded-md p-2 cursor-pointer">
              Edit profile
            </div>
            <div className="settings flex justify-center items-center cursor-pointer">
              {" "}
              <Icon
                icon="material-symbols:settings-account-box"
                width={26}
                height={26}
              />
            </div>
          </div>
          <div className="second-row md:w-[60%] w-full flex justify-around">
            <div className="post">
              <p>
                <span className="font-bold">3 </span>Posts
              </p>
            </div>
            <div className="follwers">
              <p>
                <span className="font-bold">1,661 </span>Followers
              </p>
            </div>
            <div className="following">
              <p>
                <span className="font-bold">114 </span>Following
              </p>
            </div>
          </div>
          <div className="thrid-row mt-2 ml-4 pl-2">
            <span className="text-gray-500">Web Developer</span>
          </div>
          <div className="fourth-row ml-4 mt-2 pl-2">
            <span className="text-blue-600">Tirur, Kerala</span>
          </div>
          <div className="fourth-row ml-4 pl-2 mt-2 flex">
            <span className="text-blue-600 flex cursor-pointer">
              <Icon icon="carbon:document" width={26} height={26} />
              <p>View Resume</p>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBio;
