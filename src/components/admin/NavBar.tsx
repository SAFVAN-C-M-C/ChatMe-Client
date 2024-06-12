import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/user/userActions";
import NavigationOptions from "../general/NavigationOptions";
import { Icon } from "@iconify/react";

const NavBar = () => {
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const options = {
    Home: ["teenyicons:home-solid", "/"],
    "Company Requests": ["mdi:company", "/admin/company/requests"],
    "Verify Recruiters": ["clarity:employee-group-solid", "/admin/recruiter/requests"],
    Reports: ["ph:flag-fill", "/"],
    Users: ["mdi:user", "/admin/users"],
    Companies: ["mdi:company", "/admin/company"],
    "Add Notification": ["mingcute:notification-fill", "/"],
  };

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleLogout = (e: any) => {
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
    <div className="Nav-Bar h-[100%] lg:w-[320px] w-[75px] ">
      <div className="Nav-Bar fixed h-[100vh] lg:w-[270px] w-[75px] border-r-[.5px] border-black">
        <div className="logo-container hidden lg:block p-3 h-[90px]">
          <img
            src="/logo/ChatMe--full-color.png"
            alt="ChatMe"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="logo-container block lg:hidden p-3 h-[90px]">
          <img
            src="/logo/ChatMe--logo-color.png"
            alt="ChatMe"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="options-container flex flex-col items-center mt-10">
          {Object.entries(options).map(([title, icon], index) => (
            <NavigationOptions key={index} title={title} value={icon} />
          ))}
          <div
            className="options flex cursor-pointer justify-center w-[80%] mt-4 mb-4"
            onClick={handleLogout}
          >
            <div className="option-icon w-[40%] flex justify-center">
              <Icon icon="tabler:logout" width={26} height={26} />
            </div>
            <div className="option-title w-[60%] text-lg  justify-start hidden lg:flex">
              <b className="text-base">Logout</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
