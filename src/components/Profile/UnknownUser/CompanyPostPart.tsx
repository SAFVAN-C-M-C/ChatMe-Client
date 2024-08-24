import { Icon } from "@iconify/react";

import { useState } from "react";

import { UserPostsPayload } from "@/redux/reducers/posts/userPosts";
import Posts from "./Posts";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CompanyJobs from "./CompanyJobs";
import Recruiters from "./Recruiters";
import { ProfilePayload } from "@/redux/reducers/profileSlice";

interface CompanyPostPartProps {
  userPosts: UserPostsPayload | null;
  userId: string;
  user: ProfilePayload | null;
}
const CompanyPostPart: React.FC<CompanyPostPartProps> = ({
  userPosts,
  userId,
  user,
}) => {
  const [postNav, setPostNav] = useState<
    string | "post" | "jobs" | "recruiter" | "recruiter_request"
  >("post");
  const handleNavPostClick = (value: string) => {
    setPostNav(value);
  };
  const { profile } = useSelector((state: RootState) => state.profile);
  return (
    <>
      <div className="nonlist navigat-part mt-10">
        <ul
          className={`nonlist flex items-center justify-around md:justify-center space-x-12  
            uppercase tracking-widest font-semibold text-xs ${
              profile?.data.theme === "dark"
                ? "text-gray-600  "
                : "text-gray-600"
            }
            border-t`}
        >
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
              postNav === "jobs"
                ? `nonlist md:border-t ${
                    profile?.data.theme === "dark"
                      ? "md:border-gray-400 md:text-gray-400"
                      : "md:border-gray-700 md:text-gray-700"
                  } md:-mt-px `
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
                ? `nonlist md:border-t ${
                    profile?.data.theme === "dark"
                      ? "md:border-gray-400 md:text-gray-400"
                      : "md:border-gray-700 md:text-gray-700"
                  } md:-mt-px `
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
        </ul>
      </div>
      {postNav === "post" ? (
        <Posts userPosts={userPosts} />
      ) : postNav === "jobs" ? (
        <CompanyJobs userId={userId} />
      ) : postNav === "recruiter" ? (
        <Recruiters user={user} />
      ) : null}
    </>
  );
};

export default CompanyPostPart;
