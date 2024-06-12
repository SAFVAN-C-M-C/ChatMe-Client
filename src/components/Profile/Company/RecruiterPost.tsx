// import { Icon } from "@iconify/react";
import { Recruiters } from "../../../types/IProfile";

interface RecruiterPostProps {
  value: Recruiters;
}
const RecruiterPost:React.FC<RecruiterPostProps> = ({value}) => {
  return (
    <div className="post-container mt-4 w-[90%] rounded-lg border-[.5px] border-gray-500 h-auto flex p-4">
      <div className="logo w-[30%] md:w-[10%]  h-full flex justify-center items-center md:ml-10">
        <img
          src="/tests/sample_user_logo.jpg"
          alt="company logo"
          className="w-[56px] h-[56px] rounded-full"
        />
      </div>
      <div className="main w-[70%] md:w-[80%] flex items-center  h-full ">
        <div className="main-row ml-2 mt-2 mb-2 w-full flex justify-between">
          <div className="recruiter flex items-center">
            <span className="text-base font-medium text-gray-600">{value.name}</span>{" "}
            {/* <Icon
              className="text-green-500 ml-1"
              icon="material-symbols:verified"
              height={15}
              width={12}
            /> */}
          </div>
          <div className="message w-auto h-auto bg-slate-300 pt-1 pb-1 pl-5 pr-5 rounded-md">
            <span>Message</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterPost;
