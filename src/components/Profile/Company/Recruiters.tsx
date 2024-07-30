import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import RecruiterPost from "./RecruiterPost";

const Recruiters = () => {
  const { profile } = useSelector((state: RootState) => state.profile);
  return (
    <div className="applied-jobs-cover w-[80%] flex items-center pb-3 flex-col h-auto  ">
      {profile?.data.companyDetails?.recruiters?.length ? (
        profile?.data.companyDetails.recruiters.map((recruiter, index) => (
          <RecruiterPost key={index} recruiterId={String(recruiter.userId)} />
        ))
      ) : (
        <span>No data</span>
      )}
    </div>
  );
};

export default Recruiters;
