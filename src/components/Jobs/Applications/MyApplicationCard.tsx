/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { capitalizeString } from "@/_lib/util/capitalizeString";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { formatDate } from "@/helper/formateDate";
import { IJobs } from "@/redux/reducers/jobs/jobs";
import { RootState } from "@/redux/store";
import { IJobApplicationFromBackend } from "@/types/IJob";
import { UserDetails } from "@/types/IProfile";
import { Icon } from "@iconify/react";

import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface MyApplicationCardProps {
  application: IJobApplicationFromBackend;
}
const MyApplicationCard: FC<MyApplicationCardProps> = ({ application }) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();
  const [job, setJob] = useState<IJobs | null>(null);
  const [company, setCompany] = useState<UserDetails | null>(null);
  const getCompanyDetails = async (userId: string) => {
    try {
      const res = await axios.get(`${URL}/profile/get/user/${userId}`, config);
      if (res.status === 200) {
        setCompany(res.data.data);
      }
    } catch (error: any) {
      setCompany(null);
    }
  };
  const getJob = async (jobId: string) => {
    try {
      const res = await axios.get(`${URL}/job/get/${jobId}`, config);
      if (res.status === 200) {
        setJob(res.data.data);
      }
    } catch (error: any) {
      setJob(null);
    }
  };
  useEffect(() => {
    if (!job) {
      getJob(application.jobId);
    }
    if (job && !company) {
      getCompanyDetails(String(job.companyId));
    }
  }, [application.jobId, company, job]);
  const handleJobClick = () => {
    if (job && job._id) {
      navigate(`/jobs/job/${job._id}`);
    }
  };
  return (
    <>
      <div
        onClick={handleJobClick}
        data-theme={profile?.data.theme || "light"}
        className="card job_card bg-slate-100 overflow-hidden cursor-pointer  border-blue-900 border-[.5px] h w-[400px] "
      >
        <div
          data-theme={profile?.data.theme || "light"}
          className="card-body rounded-b-lg gap-1 relative"
        >
          <div className="main flex w-full gap-2">
            <div className="avatar-part  w-[50px]   flex justify-center items-center">
              <img
                src={
                  company?.avatar
                    ? company.avatar
                    : "/general/ChatMe-profile.png"
                }
                alt=""
                className="w-[50px] rounded-full"
              />
            </div>
            <div className="content-part w-[80%] flex flex-col gap-3">
              <div className="name flex gap-1">
                <span className=" flex font-bold">{job?.jobTitle}</span>
              </div>
              <div className="name flex gap-1 items-center">
                <span className=" flex  text-sm">{company?.name}</span>
                {company?.isVerified ? (
                  <Icon
                    className="text-blue-500"
                    icon="mdi:verified-user"
                    height={16}
                    width={16}
                  />
                ) : null}
              </div>
              <span>Applied on: {formatDate(application.createdAt)}</span>
              <span
                className={`absolute right-2 top-2 ${
                  application.status === "applied"
                    ? "text-blue-600"
                    : application.status === "reviewed"
                    ? "text-blue-900"
                    : application.status === "rejected"
                    ? "text-red-600"
                    : application.status === "accepted"
                    ? "text-green-600"
                    : ""
                }`}
              >
                {" "}
                {capitalizeString(application.status)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyApplicationCard;
