/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC, useEffect, useState } from "react";

import axios from "axios";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";

import { IJobs } from "@/redux/reducers/jobs/jobs";
import JobPost from "../Company/JobPost";

interface CompanyJobsProps {
  userId: string;
}
const CompanyJobs: FC<CompanyJobsProps> = ({ userId }) => {
  const [userJob, setUserJob] = useState<IJobs[] | null>(null);

  useEffect(() => {
    const getUserjob = async () => {
      try {
        const res = await axios.get(
          `${URL}/job/get/user/${String(userId)}`,
          config
        );
        if (res.status === 200) {
          setUserJob(res.data.data);
        }
      } catch (error: any) {
        console.error("somthing went wrong", error.message);
      }
    };
    if (!userJob) {
      getUserjob();
    }
  }, [userId, userJob, userJob?.length]);
  return (
    <div className="applied-jobs-cover w-[80%] pb-3 flex items-center flex-col h-auto ">
      {userJob && userJob.length > 0 ? (
        userJob.map((job, index) => <JobPost job={job} key={index} />)
      ) : (
        <span>No Jobs here</span>
      )}
    </div>
  );
};

export default CompanyJobs;
