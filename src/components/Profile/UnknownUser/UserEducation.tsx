
import { ProfilePayload } from "@/redux/reducers/profileSlice";
import Education from "../Personal/Education";
import React from "react";

interface UserEducationProps{
    profile: ProfilePayload | null;
}
const UserEducation:React.FC<UserEducationProps> = ({profile}) => {

  return (
    <>

      <div className="profile-education border-[.5px] border-gray-600  w-[80%] h-auto rounded-xl bg-slate-100 mt-12">
        <div className="title w-full m-4 pr-6 flex justify-between">
          <div className="education-title">
            <span className="font-bold">Education</span>
          </div>

        </div>
        <div className="education list w-full m-4 pr-6 flex flex-col">
        {
            profile?.data.education?.length!==0?
            profile?.data?.education?.map((data, index) => (
              <Education
                key={index}
                course={data.course}
                endYear={data.endYear}
                nameOfinstitue={data.nameOfinstitue}
                startYear={data.startYear}
              />
            ))
            :null
          }
        </div>
      </div>
    </>
  );
};

export default UserEducation;
