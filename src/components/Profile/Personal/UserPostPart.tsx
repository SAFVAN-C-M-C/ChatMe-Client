import { Icon } from "@iconify/react";
import { useState } from "react";
import Posts from "../General/Posts";
import Saved from "../Saved/Saved";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const UserPostPart = () => {
  const [postNav, setPostNav] = useState("post");
  const handleNavPostClick = (value: string) => {
    setPostNav(value);
  };
  const { profile } = useSelector((state: RootState) => state.profile);
  return (
    <>
      <div
        data-theme={profile?.data.theme || "light"}
        className=" nonlist navigat-part mt-2"
      >
        <ul
          data-theme={profile?.data.theme || "light"}
          className={` nonlist flex items-center justify-around md:justify-center space-x-12  
                    uppercase tracking-widest font-semibold text-xs 
                    border-t ${
                      profile?.data.theme === "dark"
                        ? "text-gray-600  "
                        : "text-gray-600"
                    }`}
        >
          {/* <!-- posts tab is active --> */}
          <li
            className={
              postNav === "post"
                ? `nonlist md:border-t ${
                    profile?.data.theme === "dark"
                      ? "md:border-gray-400 md:text-gray-400"
                      : "md:border-gray-700 md:text-gray-700"
                  } md:-mt-px `
                : ""
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={() => handleNavPostClick("post")}
          >
            <div className=" p-3 flex items-center">
              <Icon
                icon="bi:image-fill"
                className="mr-1"
                width={26}
                height={26}
              />
              <span className="hidden md:inline">post</span>
            </div>
          </li>
          <li
            className={
              postNav === "saved"
                ? ` nonlist md:border-t ${
                    profile?.data.theme === "dark"
                      ? "md:border-gray-400 md:text-gray-400"
                      : "md:border-gray-700 md:text-gray-700"
                  } md:-mt-px `
                : ""
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={() => handleNavPostClick("saved")}
          >
            <div className=" p-3 flex items-center">
              <Icon
                icon="mdi:bookmark"
                className="mr-1"
                width={26}
                height={26}
              />
              <span className="hidden md:inline">Saved</span>
            </div>
          </li>
          <li
            className={
              postNav === "applied_job"
                ? `nonlist md:border-t ${
                    profile?.data.theme === "dark"
                      ? "md:border-gray-400 md:text-gray-400"
                      : "md:border-gray-700 md:text-gray-700"
                  } md:-mt-px `
                : ""
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={() => handleNavPostClick("applied_job")}
          >
            <div className="p-3 flex items-center">
              <Icon
                icon="hugeicons:job-search"
                className="mr-1"
                width={26}
                height={26}
              />
              <span className="hidden md:inline">Applied Jobs</span>
            </div>
          </li>
        </ul>
      </div>
      {postNav === "post" ? <Posts /> : postNav === "saved" ? <Saved /> : null}
    </>
  );
};

export default UserPostPart;
