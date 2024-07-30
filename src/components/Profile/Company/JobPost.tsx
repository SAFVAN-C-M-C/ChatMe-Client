/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { formatDate } from "@/helper/formateDate";
import { IJobs } from "@/redux/reducers/jobs/jobs";
import { UserDetails } from "@/types/IProfile";
import { Icon } from "@iconify/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface JobPostProps {
  job: IJobs;
}
const JobPost:FC<JobPostProps> = ({job}) => {
  const [company, setCompany] = useState<UserDetails | null>(null);
  const [recruiter, setRecruiter] = useState<UserDetails | null>(null);
  const navigate = useNavigate();
  const getCompany = async (companyId: string) => {
    try {
      try {
        const res = await axios.get(
          `${URL}/profile/get/user/${companyId}`,
          config
        );
        if (res.status === 200) {
          setCompany(res.data.data);
        }
      } catch (error: any) {
        console.log("Somthing wrong", error.message);
      }
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  };
  const getRecruiter = async (recruiterId: string) => {
    try {
      try {
        const res = await axios.get(
          `${URL}/profile/get/user/${recruiterId}`,
          config
        );
        if (res.status === 200) {
          setRecruiter(res.data.data);
        }
      } catch (error: any) {
        console.log("Somthing wrong", error.message);
      }
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  };
  const handleJobClick = () => {
    if (job._id) {
      navigate(`/jobs/job/${job._id}`);
    }
  };
  useEffect(() => {
    if (job.companyId) {
      getCompany(job.companyId);
    }
    if(job.recruiterId){
      getRecruiter(job.recruiterId)
    }
  }, []);
  return (
    <>
      <div onClick={handleJobClick} className="post-container  cursor-pointer mt-4 w-[90%] rounded-lg border-[.5px] border-gray-500 h-auto flex">
        <div className="logo w-[30%] md:w-[10%]  h-full flex justify-center items-center md:ml-10">
          <img
            src={recruiter?.avatar}
            alt="recruiter logo"
            className="w-[56px] h-[56px] rounded-full"
          />
        </div>
        <div className="logo w-[70%] md:w-[80%]  h-full ">
          <div className="first-row ml-2 mt-4 mb-2">
            <div className="title">
              <span className="font-bold ">{job.jobTitle}</span>
            </div>
          </div>
          <div className="second-row ml-2 mt-2">
            <div className="company flex items-center">
              <span className="text-xs text-gray-400">{company?.name}</span>{" "}
              {company?.isVerified?<Icon
                className="text-blue-500"
                icon="mdi:verified-user"
                height={15}
                width={12}
              />:null}
            </div>
          </div>
          <div className="third-row ml-2 mt-2">
            <div className="location-type flex justify-between items-center">
              <span className="text-xs text-gray-400 flex items-center">
                {company?.location} ({job.mode})
              </span>{" "}
              <span className="text-red-600  items-center text-sm mr-2 hidden md:flex">
               {formatDate(job.updatedAt)}{" "}
              </span>
            </div>
          </div>
          <div className="fourth-row ml-2 mt-2 mb-2">
            <div className="recruiter flex items-center">
                <span className="text-xs text-gray-400">{recruiter?.name}</span>{" "}
              {recruiter?.isVerified?<Icon
                className="text-green-500 ml-1"
                icon="material-symbols:verified"
                height={15}
                width={12}
              />:null}
            </div>
          </div>
          <div className="last-row ml-2 mt-2 mb-2 md:hidden">
            <div className="date">
              <span className="text-red-600 flex items-center text-sm ">
              12-03-2024
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPost;
