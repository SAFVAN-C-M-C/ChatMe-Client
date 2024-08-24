import { FC } from "react";
import { ProfilePayload } from "@/redux/reducers/profileSlice";
import RecruiterPost from "../Company/RecruiterPost";
import NothingHere from "@/components/general/NothingHere";

interface RecruiterProps {
  user: ProfilePayload | null;
}
const Recruiters: FC<RecruiterProps> = ({ user }) => {
  return (
    <div className="applied-jobs-cover w-[80%] flex items-center pb-3 flex-col h-auto  ">
      {user?.data.companyDetails?.recruiters?.length ? (
        user?.data.companyDetails.recruiters.map((recruiter, index) => (
          <RecruiterPost key={index} recruiterId={String(recruiter.userId)} />
        ))
      ) : (
        <NothingHere />
      )}
    </div>
  );
};

export default Recruiters;
