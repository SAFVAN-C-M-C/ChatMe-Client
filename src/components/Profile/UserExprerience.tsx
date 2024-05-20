import { Icon } from "@iconify/react";


const UserExprerience = () => {
  return (
    <>
      <div className="profile-experience border-[.5px] border-gray-600  w-[80%] h-auto rounded-xl bg-slate-100 mt-12">
        <div className="title w-full m-4 pr-6 flex justify-between">
          <div className="education-title">
            <span className="font-bold">Experience</span>
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
        <div className="experience list w-full m-4 pr-6 flex flex-col">
          <span className="text-gray-500">Add Experience</span>
        </div>
      </div>
    </>
  );
};

export default UserExprerience;
