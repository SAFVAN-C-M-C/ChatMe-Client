import { useSelector } from "react-redux";
import RecruiterRequestPost from "./RecruiterRequestPost";
import { RootState } from "../../../redux/store";
import NothingHere from "@/components/general/NothingHere";

const RecruiterRequest = () => {
  const { profile } = useSelector((state: RootState) => state.profile);
  return (
    <div className="applied-jobs-cover w-[80%] flex items-center flex-col h-auto ">
      {profile?.data.recruiterApplication?.length ? (
        profile?.data.recruiterApplication?.map((application, index) => (
          <RecruiterRequestPost key={index} value={application} />
        ))
      ) : (
        <NothingHere />
      )}
    </div>
  );
};

export default RecruiterRequest;
