import { Icon } from "@iconify/react";
import { useState } from "react";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import AddExperience from "../../modals/AddExperience";
import Experience from "./Experience";


const UserExprerience = () => {
  const { profile } = useSelector((state: RootState) => state.profile);

  const [openAddExperience, setOpenAddExperience] = useState(false);
  return (
    <>
    {
      openAddExperience?<AddExperience setOpenAddExperience={setOpenAddExperience}/>:null
    }
      <div className="profile-experience border-[.5px] border-gray-600  w-[80%] h-auto rounded-xl bg-slate-100 mt-12">
        <div className="title w-full m-4 pr-6 flex justify-between">
          <div className="education-title">
            <span className="font-bold">Experience</span>
          </div>
          <div className="action-education flex ">
            {/* <Icon
              className="mr-2 cursor-pointer"
              icon="mdi:edit"
              width={26}
              height={26}
            /> */}
            <Icon
            onClick={()=>setOpenAddExperience(!openAddExperience)}
              icon="mdi:add"
              width={26}
              height={26}
              className="mr-2 cursor-pointer"
            />
          </div>
        </div>
        <div className="experience list w-full m-4 pr-6 flex flex-col">
          {
            profile?.data.experience?.length!==0?
            profile?.data?.experience?.map((data, index) => (
              <Experience
                key={index}
                position={data.position}
                endYear={data.endYear}
                nameOfinstitue={data.nameOfinstitue}
                startYear={data.startYear}
              />
            ))
            :<span className="text-gray-500">Add Experience</span>
          }
        </div>
      </div>
    </>
  );
};

export default UserExprerience;
