import { Icon } from '@iconify/react'
import React, { useState } from 'react';
import { UserPostsPayload } from '@/redux/reducers/posts/userPosts';
import Posts from './Posts';
import RecruiterJobs from '../Recruiter/RecruiterJobs';

interface RecruiterPostpartProps{
    userPosts:UserPostsPayload|null
}
const RecruiterPostpart:React.FC<RecruiterPostpartProps> = ({userPosts}) => {
    const [postNav, setPostNav] = useState<string | "post" | "jobs" >("post");
    const handleNavPostClick = (value: string) => {
      setPostNav(value);
    };
  return (
    <>
      <div className="navigat-part mt-2">
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
          <li
            className={
              postNav === "jobs"
                ? "md:border-t md:border-gray-700 md:-mt-px md:text-gray-700"
                : ""
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={() => handleNavPostClick("jobs")}
          >
            <div className="p-3 flex items-center">
              <Icon
                icon="solar:suitcase-bold"
                className="mr-1"
                width={26}
                height={26}
              />
              <span className="hidden md:inline">Jobs</span>
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
      {postNav === "post" ? <Posts userPosts={userPosts} /> : <RecruiterJobs />}
    </>
  )
}

export default RecruiterPostpart