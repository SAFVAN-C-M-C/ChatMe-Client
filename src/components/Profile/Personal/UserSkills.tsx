import { Icon } from "@iconify/react";
import AddSkills from "../../modals/AddSkills";
import { useState } from "react";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

const UserSkills = () => {
  const { profile } = useSelector((state: RootState) => state.profile);

  const [openAddSkills, setOpenAddSkills] = useState(false);
  return (
    <>
      {openAddSkills ? <AddSkills setOpenAddSkills={setOpenAddSkills} /> : null}
      <div data-theme={profile?.data.theme || "light"} className="profile-skill border-[.5px] border-gray-600  w-[80%] h-auto rounded-xl border-dashed mt-12">
        <div className="title w-full m-4 pr-6 flex justify-between">
          <div className="education-title">
            <span className="font-bold">Top Skills</span>
          </div>
          <div className="action-education flex ">
            <Icon
            onClick={() => setOpenAddSkills(!openAddSkills)}
              className="mr-2 cursor-pointer"
              icon="mdi:edit"
              width={26}
              height={26}
            />
          </div>
        </div>
        <div className="skill-list w-full m-4 pr-6 flex flex-col">
          {profile?.data?.skills && profile.data.skills.length > 0 ? (
            <div className="skills flex flex-wrap ">
              {profile.data.skills.map((skill, index) => (
                <span key={index} className="p-2 m-2 bg-gray-200 rounded-md">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-500">Add skills</span>
          )}
        </div>
      </div>
    </>
  );
};

export default UserSkills;
