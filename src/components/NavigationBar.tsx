import { Icon } from "@iconify/react";
import NavigationOptions from "./NavigationOptions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logout } from "../redux/actions/user/userActions";

const NavigationBar = () => {
  const options = {
    Home: "teenyicons:home-solid",
    Notification: "mingcute:notification-fill",
    Explore: "mdi:compass",
    Chat: "icon-park-solid:message",
    Saved: "iconamoon:bookmark-fill",
    "Create Post": "icons8:plus",
    Jobs: "solar:suitcase-bold",
  };
  const [moreActive, setMoreActive] = useState(false);
  // const [theamToggle,setTheamToggle]=useState("light");
  const [darkTheamActive, setDarkTheamActive] = useState(false);
  const handleToggle = () => {
    // darkTheamActive?setTheamToggle("light"):setTheamToggle("dark");
    setDarkTheamActive(!darkTheamActive);
  };
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout=(e:any)=>{
    dispatch(logout())
  }
  return (
    <div className="Nav-Bar h-[100%] lg:w-[270px] w-[75px] ">
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
          <NavigationOptions key={index} title={title} icon={icon} />
        ))}
        <div className="options flex justify-center w-[80%] mt-4 mb-4">
          <div className="option-icon w-[40%] flex justify-center">
            <img
              src="/general/ChatMe-profile.png"
              alt="profile"
              width={26}
              height={26}
              className="rounded-full"
            />
          </div>
          <div className="option-title w-[60%] text-lg flex justify-start hidden lg:flex">
            <b>Profile</b>
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
                <div className="option-title w-[60%] text-lg flex justify-start cursor-pointer" onClick={handleLogout}>
                  <b  >Logout</b>
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
          <div className="option-title w-[60%] text-lg flex justify-start hidden lg:flex">
            <b>More</b>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default NavigationBar;
