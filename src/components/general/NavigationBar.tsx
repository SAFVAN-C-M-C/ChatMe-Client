/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
import NavigationOptions from "./NavigationOptions";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/actions/user/userActions";
import { useNavigate } from "react-router-dom";
import { changeTheme } from "@/redux/actions/user/profileActions";

interface NavigationBarProps {
  isChat?: boolean;
}
const NavigationBar: React.FC<NavigationBarProps> = ({ isChat }) => {
  const { profile } = useSelector((state: RootState) => state.profile);

  const [theme, setTheme] = useState(
    profile?.data.theme ? profile?.data.theme : "light"
  );
  useEffect(() => {
    setTheme(profile?.data.theme ? profile.data.theme : "light");
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [profile?.data.theme, theme]);
  const options = {
    Home: ["teenyicons:home-solid", "/"],
    Notification: ["mingcute:notification-fill", "/"],
    Search: ["tabler:search", "/"],
    Chat: ["icon-park-solid:message", "/chat"],
    "Create Post": ["icons8:plus", "/"],
    "My Application": ["material-symbols:post-add", "/jobs/my-applications"],
    "Create Job Post": ["material-symbols:post-add", "/"],
    Jobs: ["solar:suitcase-bold", "/jobs"],
  };
  const [shrink, setShrink] = useState(isChat ? isChat : false);

  // const [theamToggle,setTheamToggle]=useState("light");

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(changeTheme({ theam: "dark" }));
    } else {
      dispatch(changeTheme({ theam: "light" }));
    }
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
    navigate(`/${option}`);
  };
  return (
    <>
      <div
        className={
          shrink
            ? "Nav-Bar   w-[90px] overflow-hidden relative"
            : " overflow-hidden Nav-Bar h-[100%] lg:w-[330px] w-[95px] relative"
        }
      >
        <div
          className={
            shrink
              ? "Nav-Bars overflow-hidden  fixed h-[100vh] w-[75px] border-r-[.5px] border-black"
              : "Nav-Bars overflow-hidden fixed h-[100vh] lg:w-[270px] w-[75px] border-r-[.5px] border-black"
          }
        >
          <div
            className={
              shrink
                ? "logo-container overflow-hidden hidden p-3 h-[90px]"
                : " overflow-hidden logo-container hidden lg:block p-3 h-[90px]"
            }
          >
            <img
              src="/logo/ChatMe--full-color.png"
              alt="ChatMe"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className={
              shrink
                ? "logo-container block  p-3 h-[90px]"
                : "logo-container block lg:hidden p-3 h-[90px]"
            }
          >
            <img
              src="/logo/ChatMe--logo-color.png"
              alt="ChatMe"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="options-container flex flex-col items-center mt-10">
            {Object.entries(options).map(([title, icon], index) => (
              <NavigationOptions
                shrink={shrink}
                setShrink={setShrink}
                key={index}
                title={title}
                value={icon}
              />
            ))}
            <div
              className="options flex justify-center w-[90%] mb-2 mt-2 pt-2 pb-2 hover:bg-slate-200 hover:text-gray-700 rounded-lg"
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
                  className={
                    shrink
                      ? "rounded-full object-cover w-[24px] h-[24px]"
                      : "rounded-full object-cover w-[24px] h-[24px] lg:w-[26px] lg:h-[26px]"
                  }
                />
              </div>
              <div
                className={
                  shrink
                    ? "option-title w-[60%] text-lg  justify-start hidden"
                    : "option-title w-[60%] text-lg  justify-start hidden lg:flex"
                }
              >
                <b className="text-base">{profile?.data?.name}</b>
              </div>
            </div>
          </div>
          <div className="footers-options absolute  w-full h-auto bottom-10  flex items-center flex-col ">
            <label className="options flex justify-center items-center w-[90%] mb-2 mt-2 pt-2 pb-2 hover:bg-slate-200 hover:text-gray-700 rounded-lg">
              <div className="option-icon rounded-full h-auto  w-[40%] flex justify-center items-center">
                <label className="swap swap-rotate" id="theam-controller">
                  {/* this hidden checkbox controls the state */}
                  <input
                    onChange={handleToggle}
                    checked={theme === "light" ? false : true}
                    type="checkbox"
                    className="theme-controller"
                    value="synthwave"
                  />

                  {/* sun icon */}
                  <svg
                    className="swap-off h-[26px] w-[26px] fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  {/* moon icon */}
                  <svg
                    className="swap-on h-[26px] w-[26px] fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </div>
              <div
                className={
                  shrink
                    ? "option-title w-[60%] text-lg  justify-start hidden"
                    : "option-title w-[60%] text-lg  justify-start hidden lg:flex"
                }
              >
                <b className="text-base">Theme</b>
              </div>
            </label>
            <div
              className="options flex justify-center w-[90%] mb-2 mt-2 pt-2 pb-2 hover:bg-slate-200 hover:text-gray-700  rounded-lg"
              onClick={handleLogout}
            >
              <div className="option-icon rounded-full h-auto  w-[40%] flex justify-center">
                <Icon icon="tabler:logout" width={26} height={26} />
              </div>
              <div
                className={
                  shrink
                    ? "option-title w-[60%] text-lg  justify-start hidden"
                    : "option-title w-[60%] text-lg  justify-start hidden lg:flex"
                }
              >
                <b className="text-base">Logout</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
