import { UserPostsPayload } from "@/redux/reducers/posts/userPosts";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Posts from "./Posts";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface UserPostPartProps {
  userPosts: UserPostsPayload | null;
}
const UserPostPart: React.FC<UserPostPartProps> = ({ userPosts }) => {
  const [postNav, setPostNav] = useState("post");
  const handleNavPostClick = (value: string) => {
    setPostNav(value);
  };
  const { profile } = useSelector((state: RootState) => state.profile);
  return (
    <>
      <div
        data-theme={profile?.data.theme || "light"}
        className=" nonlist navigat-part mt-10"
      >
        <ul
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
        </ul>
      </div>
      <Posts userPosts={userPosts} />
    </>
  );
};

export default UserPostPart;
