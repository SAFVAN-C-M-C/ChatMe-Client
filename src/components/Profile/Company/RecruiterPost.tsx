/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Icon } from "@iconify/react";
import axios from "axios";
import { UserDetails } from "../../../types/IProfile";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useChatContext } from "@/context/ChatContext";

interface RecruiterPostProps {
  recruiterId: string;
}
const RecruiterPost: React.FC<RecruiterPostProps> = ({ recruiterId }) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();
  const { getChatSearch } = useChatContext();
  const handleUserClick = (userId: string) => {
    if (userId === profile?.data.userId) {
      navigate(`/profile`);
      return;
    }
    navigate(`/u/profile/${userId}`);
  };
  const handleClick = (userId: string) => {
    getChatSearch(String(userId), navigate);
  };
  const [recruiter, setRecruiter] = useState<UserDetails | null>(null);
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
  useEffect(() => {
    if (recruiterId) {
      getRecruiter(String(recruiterId));
    }
  }, []);
  return (
    <div className="post-container mt-4 w-[90%] rounded-lg border-[.5px] border-gray-500 h-auto flex p-4">
      <div className="logo w-[30%] md:w-[10%]  h-full flex justify-center items-center md:ml-10 cursor-pointer" onClick={()=>handleUserClick(recruiter?.userId as string)}>
        <img
          src={recruiter?.avatar}
          alt="company logo"
          className="w-[56px] h-[56px] rounded-full"
        />
      </div>
      <div className="main w-[70%] md:w-[80%] flex items-center  h-full ">
        <div className="main-row ml-2 mt-2 mb-2 w-full flex justify-between">
          <div className="recruiter flex items-center cursor-pointer" onClick={()=>handleUserClick(recruiter?.userId as string)}>
            <span className="text-base font-medium ">{recruiter?.name}</span>{" "}
            {recruiter?.isVerified ? (
              <Icon
                className="text-green-500 ml-1"
                icon="material-symbols:verified"
                height={15}
                width={12}
              />
            ) : null}
          </div>
          <div
            className="message btn btn-info mr-3"
            onClick={() => handleClick(recruiter?.userId as string)}
          >
            <span className="text-white">Message</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterPost;
