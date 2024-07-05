import { Icon } from "@iconify/react";

import { useState } from "react";

import { UserPostsPayload } from "@/redux/reducers/posts/userPosts";
import Posts from "./Posts";
import Jobs from "../Company/Jobs";
import Recruiters from "../Company/Recruiters";

interface CompanyPostPartProps{
    userPosts:UserPostsPayload|null
}
const CompanyPostPart:React.FC<CompanyPostPartProps> = ({userPosts}) => {
    const [postNav, setPostNav] = useState<string | "post" | "jobs" | "recruiter" | "recruiter_request">("post");
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
          <li
            className={
              postNav === "jobs"
                ? "md:border-t md:border-gray-700 md:-mt-px md:text-gray-700"
                : ""
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={() => handleNavPostClick("jobs")}
          >
            <div className=" p-3 flex items-center">
              <Icon
                icon="solar:suitcase-bold"
                className="mr-1"
                width={26}
                height={26}
              />
              <span className="hidden md:inline">jobs</span>
            </div>
          </li>
          <li
            className={
              postNav === "recruiter"
                ? "md:border-t md:border-gray-700 md:-mt-px md:text-gray-700"
                : ""
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={() => handleNavPostClick("recruiter")}
          >
            <div className=" p-3 flex items-center">
              <Icon
                icon="clarity:employee-group-solid"
                className="mr-1"
                width={26}
                height={26}
              />
              <span className="hidden md:inline">Recruiters</span>
            </div>
          </li>
          <li
            className={
              postNav === "recruiter_request"
                ? "md:border-t md:border-gray-700 md:-mt-px md:text-gray-700"
                : ""
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={() => handleNavPostClick("recruiter_request")}
          >
            <div className="p-3 flex items-center">
              <Icon
                icon="mdi:user-add"
                className="mr-1"
                width={26}
                height={26}
              />
              <span className="hidden md:inline">recruiter request</span>
            </div>
          </li>
          <li
            className={
              postNav === "saved"
                ? "md:border-t md:border-gray-700 md:-mt-px md:text-gray-700"
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
        </ul>
      </div>
      {postNav === "post" ? <Posts userPosts={userPosts} /> : postNav==="jobs"?<Jobs/>:postNav==="recruiter"?<Recruiters/>:null}
    </>
  )
}

export default CompanyPostPart