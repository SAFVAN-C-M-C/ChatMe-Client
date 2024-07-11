/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
import NavigationOptions from "./NavigationOptions";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/actions/user/userActions";
import { useNavigate } from "react-router-dom";

interface NavigationBarProps{
  isChat?:boolean
}
const NavigationBar:React.FC<NavigationBarProps> = ({isChat}) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const options = {
    Home: ["teenyicons:home-solid", "/"],
    Notification: ["mingcute:notification-fill", "/"],
    Search: ["tabler:search", "/"],
    Chat: ["icon-park-solid:message", "/chat"],
    "Create Post": ["icons8:plus", "/"],
    Jobs: ["solar:suitcase-bold", "/"],
  };
  const [shrink,setShrink]=useState(isChat?isChat:false)
  const [moreActive, setMoreActive] = useState(false);
  // const [theamToggle,setTheamToggle]=useState("light");
  const [darkTheamActive, setDarkTheamActive] = useState(false);
  const handleToggle = () => {
    // darkTheamActive?setTheamToggle("light"):setTheamToggle("dark");
    setDarkTheamActive(!darkTheamActive);
  };
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout(navigate));
  };
  type HandleOptionClick = (
    event: React.MouseEvent<HTMLDivElement>,
    option: string
  ) => void;

  // Implement the event handler function
  const handleOptionClick: HandleOptionClick = (event, option) => {
    event.preventDefault();
    navigate(`/${option}`)
  };
  return (
    <>
      <div 
      className={shrink?"Nav-Bar   w-[75px] overflow-hidden":" overflow-hidden Nav-Bar h-[100%] lg:w-[270px] w-[75px] "}
      >
        <div className={shrink?"Nav-Bars overflow-hidden  fixed h-[100vh] w-[75px] border-r-[.5px] border-black":"Nav-Bars overflow-hidden fixed h-[100vh] lg:w-[270px] w-[75px] border-r-[.5px] border-black"}>
          <div className={shrink?"logo-container overflow-hidden hidden p-3 h-[90px]":" overflow-hidden logo-container hidden lg:block p-3 h-[90px]"}>
            <img
              src="/logo/ChatMe--full-color.png"
              alt="ChatMe"
              className="w-full h-full object-contain"
            />
          </div>
          <div className={shrink?"logo-container block  p-3 h-[90px]":"logo-container block lg:hidden p-3 h-[90px]"}>
            <img
              src="/logo/ChatMe--logo-color.png"
              alt="ChatMe"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="options-container flex flex-col items-center mt-10">
            {Object.entries(options).map(([title, icon], index) => (
              <NavigationOptions shrink={shrink} setShrink={setShrink} key={index} title={title} value={icon} />
            ))}
            <div
              className="options flex justify-center w-[80%] mt-4 mb-4"
              onClick={(e) => handleOptionClick(e, "profile")}
            >
              <div className="option-icon rounded-full h-auto  w-[40%] flex justify-center">
                <img
                  src={
                    profile?.data?.bio?.avatar
                      ? profile.data.bio.avatar
                      : "/general/ChatMe-profile.png"
                  }
                  alt="profile"
                  className={shrink?"rounded-full object-cover w-[24px] h-[24px]":"rounded-full object-cover w-[24px] h-[24px] lg:w-[26px] lg:h-[26px]"}
                />
              </div>
              <div className={shrink?"option-title w-[60%] text-lg  justify-start hidden":"option-title w-[60%] text-lg  justify-start hidden lg:flex"}>
                <b className="text-base">{profile?.data?.name}</b>
              </div>
            </div>
            {moreActive ? (
              <div className="more-container w-[270px] h-auto border-[.5px] border-black rounded-md absolute bottom-24 left-4 bg-white">
                <div className="options-container flex flex-col items-center w-full">
                  <div className="options flex justify-center w-[80%] mt-4 mb-4">
                    <div className="option-action w-[40%] flex justify-center">
                      <button
                        onClick={handleToggle}
                        className={`w-12 h-6 flex items-center rounded-full p-1 ${
                          darkTheamActive ? "bg-blue-500" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                            darkTheamActive ? "translate-x-6" : "translate-x-0"
                          }`}
                        ></div>
                      </button>
                    </div>
                    <div className="option-title w-[60%] text-lg flex justify-start">
                      <b>Dark Mode</b>
                    </div>
                  </div>
                  <div className="options flex justify-center w-[80%] mt-4 mb-4 outline-[.5px]">
                    <div className="option-icon w-[40%] flex justify-center">
                      <Icon icon="tabler:logout" width={26} height={26} />
                    </div>
                    <div
                      className="option-title w-[60%] text-lg flex justify-start cursor-pointer"
                      onClick={handleLogout}
                    >
                      <b>Logout</b>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div
              onClick={() => setMoreActive(!moreActive)}
              className="options flex justify-center w-[80%] mt-28 cursor-pointer"
            >
              <div className="option-icon w-[40%] flex justify-center">
                <Icon icon="gg:details-more" width={26} height={26} />
              </div>
              <div className={shrink?"option-title w-[60%] text-lg  justify-start hidden":"option-title w-[60%] text-lg  justify-start hidden lg:flex"}>
                <b>More</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
