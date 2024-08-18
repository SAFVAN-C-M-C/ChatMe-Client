import Resumes from "./Resumes";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Icon } from "@iconify/react";
import AddResumes from "@/components/modals/Resumes/AddResumes";

const ResumePart = () => {
  const { profile } = useSelector((state: RootState) => state.profile);

  const [openAddResumes, setOpenAddResumes] = useState(false);
  return (
    <>
    {
      openAddResumes?<AddResumes setOpenAddResumes={setOpenAddResumes}/>:null
    }
      <div data-theme={profile?.data.theme || "light"} className="profile-experience border-[.5px] border-gray-600  w-[80%] h-auto rounded-xl border-dashed mt-12">
        <div className="title w-full m-4 pr-6 flex justify-between">
          <div className="education-title">
            <span className="font-bold">Resumes</span>
          </div>
          <div className="action-education flex ">
            <Icon
            onClick={()=>setOpenAddResumes(!openAddResumes)}
              icon="mdi:add"
              width={26}
              height={26}
              className="mr-2 cursor-pointer"
            />
          </div>
        </div>
        <div className="experience list w-full m-4 pr-6 flex flex-wrap gap-3">
          {
            profile?.data.bio?.resume && profile?.data.bio?.resume?.length>0?
            profile?.data.bio?.resume?.map((data, index) => (
              <Resumes
                key={index}
                data={data}
              />
            ))
            :<span className="text-gray-500">Add Resumes</span>
          }
        </div>
      </div>
    </>
  );
};

export default ResumePart;
