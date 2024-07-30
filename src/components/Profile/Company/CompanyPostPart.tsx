import { Icon } from "@iconify/react";
import Posts from "../General/Posts";
import { useState } from "react";
import Jobs from "./Jobs";
import Recruiters from "./Recruiters";
import RecruiterRequest from "./RecruiterRequest";
import Saved from "../Saved/Saved";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


const CompanyPostPart = () => {
    const [postNav, setPostNav] = useState<string | "post" | "jobs" | "recruiter" | "recruiter_request">("post");
    const handleNavPostClick = (value: string) => {
      setPostNav(value);
    };
    const { profile } = useSelector((state: RootState) => state.profile);
  return (
    <>
      <div className="nonlist navigat-part mt-10">
        <ul
          className={`nonlist flex items-center justify-around md:justify-center space-x-12  
                    uppercase tracking-widest font-semibold text-xs ${profile?.data.theme==="dark"?"text-gray-600  ":"text-gray-600"}
                    border-t`}
        >
          
          <li
            className={
              postNav === "post"
                ? `nonlist md:border-t ${profile?.data.theme==="dark"?"md:border-gray-400 md:text-gray-400":"md:border-gray-700 md:text-gray-700"} md:-mt-px `
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
                ? `nonlist md:border-t ${profile?.data.theme==="dark"?"md:border-gray-400 md:text-gray-400":"md:border-gray-700 md:text-gray-700"} md:-mt-px `
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
                ? `nonlist md:border-t ${profile?.data.theme==="dark"?"md:border-gray-400 md:text-gray-400":"md:border-gray-700 md:text-gray-700"} md:-mt-px `
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
                ? `nonlist md:border-t ${profile?.data.theme==="dark"?"md:border-gray-400 md:text-gray-400":"md:border-gray-700 md:text-gray-700"} md:-mt-px `
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
                ? `nonlist md:border-t ${profile?.data.theme==="dark"?"md:border-gray-400 md:text-gray-400":"md:border-gray-700 md:text-gray-700"} md:-mt-px `
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
      {postNav === "post" ? <Posts /> : postNav==="jobs"?<Jobs/>:postNav==="recruiter"?<Recruiters/>:postNav==="recruiter_request"?<RecruiterRequest/>:postNav === "saved"? <Saved />:null}
    </>
  )
}

export default CompanyPostPart