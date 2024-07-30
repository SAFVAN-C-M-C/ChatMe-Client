
import { FC } from "react";
import { ProfilePayload } from "@/redux/reducers/profileSlice";
import RecruiterPost from "../Company/RecruiterPost";


interface RecruiterProps{

    user:ProfilePayload|null
}
const Recruiters:FC<RecruiterProps> = ({user}) => {
    console.log(user);
    
  return (
    <div className="applied-jobs-cover w-[80%] flex items-center pb-3 flex-col h-auto  ">
      {user?.data.companyDetails?.recruiters?.length ? (
        user?.data.companyDetails.recruiters.map((recruiter, index) => (
          <RecruiterPost key={index} recruiterId={String(recruiter.userId)} />
        ))
      ) : (
        <span>No data</span>
      )}
    </div>
  );
};

export default Recruiters;
