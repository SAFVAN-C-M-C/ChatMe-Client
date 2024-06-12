import React, { useEffect } from "react";
import { RecruiterApplication } from "../../../types/IProfile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import toast from "react-hot-toast";
import { acceptRecruiterRequest, ignoreRecruiterRequest } from "../../../redux/actions/user/profileActions";

interface RecruiterRequestPostProps {
  value: RecruiterApplication;
}
const RecruiterRequestPost: React.FC<RecruiterRequestPostProps> = ({
  value,
}) => {
  const { error } = useSelector((state: RootState) => state.profile);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const dispatch = useDispatch<AppDispatch>();
  const handleAccept = () => {
    const formData = {
      requestId: value._id,
      userEmail: value.userEmail,
      userId: value.userId,
    };
    dispatch(acceptRecruiterRequest(formData))
    if(!error){
      toast.success("Accepted")
    }
  };
  const handleIgnore = () => {
    const formData = {
      requestId: value._id,
      userEmail: value.userEmail,
    };
    dispatch(ignoreRecruiterRequest(formData))
    if(!error){
      toast.success("Deleted")
    }
  };
  return (
    <div className="post-container mt-4 w-[90%] rounded-lg border-[.5px] border-gray-500 h-auto flex p-4">
      <div className="logo w-[30%] md:w-[10%]  h-full flex justify-center items-center md:ml-10">
        <img
          src={value?.avatar ? value.avatar : "/general/ChatMe-profile.png"}
          alt="company logo"
          className="w-[56px] h-[56px] rounded-full"
        />
      </div>
      <div className="main w-[70%] md:w-[80%] flex items-center  h-full ">
        <div className="main-row ml-2 mt-2 mb-2 w-full flex justify-between">
          <div className="recruiter flex items-center">
            <span className="text-base font-medium text-gray-600">
              {value.name}
            </span>{" "}
          </div>
          <div className="action flex">
            <div onClick={handleIgnore} className="cursor-pointer message mr-4  w-auto h-auto bg-slate-300 pt-1 pb-1 pl-5 pr-5 rounded-md">
              <span>ignore</span>
            </div>
            <div
              className="cursor-pointer message w-auto h-auto bg-green-500 text-white pt-1 pb-1 pl-5 pr-5 rounded-md"
              onClick={handleAccept}
            >
              <span>Accept</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterRequestPost;
