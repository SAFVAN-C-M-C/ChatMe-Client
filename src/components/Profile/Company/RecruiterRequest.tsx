import { useSelector } from "react-redux";
import RecruiterRequestPost from "./RecruiterRequestPost";
import { RootState } from "../../../redux/store";

const RecruiterRequest = () => {
  const { profile } = useSelector((state: RootState) => state.profile);
  return (
    <div className="applied-jobs-cover w-[80%] flex items-center flex-col h-auto bg-slate-50">
      {profile?.data.recruiterApplication?.length ? (
        profile?.data.recruiterApplication?.map((application, index) => (
          <RecruiterRequestPost key={index} value={application} />
        ))
      ) : (
        <span>No data</span>
      )}
    </div>
  );
};

export default RecruiterRequest;
