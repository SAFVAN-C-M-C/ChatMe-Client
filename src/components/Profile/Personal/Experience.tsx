import React from "react";

interface ExperienceProps{
        nameOfinstitue?: string;
        position?: string;
        startYear?: string;
        endYear?: string;
}
const Experience:React.FC<ExperienceProps> = ({nameOfinstitue,position,startYear,endYear}) => {
  return (
    <>
      <div  className="education w-full flex flex-col mb-3">
        <div className="education-institute">
          <span className="font-bold text-gray-700">{nameOfinstitue}</span>
        </div>
        <div className="education-course ">
          <span className="text-gray-500">
            {position}
          </span>
        </div>
        <div className="education-span ">
          <span className="text-gray-500">{startYear} - {endYear}</span>
        </div>
      </div>
    </>
  );
};

export default Experience;
