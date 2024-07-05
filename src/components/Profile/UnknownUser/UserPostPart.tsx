import { UserPostsPayload } from "@/redux/reducers/posts/userPosts";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Posts from "./Posts";


interface UserPostPartProps{
    userPosts:UserPostsPayload|null
}
const UserPostPart:React.FC<UserPostPartProps> = ({userPosts}) => {
  const [postNav, setPostNav] = useState("post");
  const handleNavPostClick = (value: string) => {
    setPostNav(value);
  };
  return (
    <>
      <div className="navigat-part mt-10">
        <ul
          className="flex items-center justify-around md:justify-center space-x-12  
                    uppercase tracking-widest font-semibold text-xs text-gray-600
                    border-t"
        >
          {/* <!-- posts tab is active --> */}
          <li
            className={
              postNav === "post"
                ? "md:border-t md:border-gray-700 md:-mt-px md:text-gray-700"
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
