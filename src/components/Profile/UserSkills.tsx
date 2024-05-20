import { Icon } from "@iconify/react";


const UserSkills = () => {
  return (
    <>
      <div className="profile-skill border-[.5px] border-gray-600  w-[80%] h-auto rounded-xl bg-slate-100 mt-12">
        <div className="title w-full m-4 pr-6 flex justify-between">
          <div className="education-title">
            <span className="font-bold">Top Skills</span>
          </div>
          <div className="action-education flex ">
            <Icon
              className="mr-2 cursor-pointer"
              icon="mdi:edit"
              width={26}
              height={26}
            />
            <Icon
              icon="mdi:add"
              width={26}
              height={26}
              className="mr-2 cursor-pointer"
            />
          </div>
        </div>
        <div className="prefered-job list w-full m-4 pr-6 flex flex-col">
          <span className="text-gray-500">Add skills</span>
        </div>
      </div>
    </>
  );
};

export default UserSkills;
