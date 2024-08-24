/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";

import { IJobs } from "@/redux/reducers/jobs/jobs";
import axios from "axios";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import RecruiterJobPost from "../Recruiter/RecruiterJobPost";

interface RecruiterJobsProps {
  userId: string;
}
const RecruiterJobs: FC<RecruiterJobsProps> = ({ userId }) => {
  const [myJob, setMyjob] = useState<IJobs[] | null>(null);

  useEffect(() => {
    const getMyjob = async () => {
      try {
        const res = await axios.get(
          `${URL}/job/get/user/${String(userId)}`,
          config
        );
        if (res.status === 200) {
          setMyjob(res.data.data);
        }
      } catch (error: any) {
        console.error("somthing went wrong", error.message);
      }
    };
    if (!myJob) {
      getMyjob();
    }
  }, [myJob, myJob?.length, userId]);
  return (
    <div className="applied-jobs-cover w-[80%] flex items-center flex-col h-auto pb-3">
      {myJob && myJob.length > 0 ? (
        myJob.map((job, index) => <RecruiterJobPost job={job} key={index} />)
      ) : (
        <span>No Jobs here</span>
      )}
    </div>
  );
};

export default RecruiterJobs;
