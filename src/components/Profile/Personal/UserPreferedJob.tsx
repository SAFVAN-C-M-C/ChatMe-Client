import { Icon } from "@iconify/react";
import { useState } from "react";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import AddPreferedJobs from "../../modals/AddPreferedJobs";

const UserPreferedJob = () => {
  const { profile } = useSelector((state: RootState) => state.profile);

  const [openAddPreferedJobs, setOpenAddPreferedJobs] = useState(false);
  return (
    <>
    {
      openAddPreferedJobs?<AddPreferedJobs setOpenAddPreferedJobs={setOpenAddPreferedJobs}/>:null
    }
      <div data-theme={profile?.data.theme || "light"} className="profile-prefered-job border-[.5px] border-gray-600  w-[80%] h-auto rounded-xl border-dashed mt-12">
        <div className="title w-full m-4 pr-6 flex justify-between">
          <div className="education-title">
            <span className="font-bold">Set Prefered Job</span>{" "}
            <span className="text-sm text-gray-400">
              (For job suggetion other can't see it)
            </span>
          </div>
          <div className="action-education flex ">
            <Icon
            onClick={()=>setOpenAddPreferedJobs(!openAddPreferedJobs)}
              className="mr-2 cursor-pointer"
              icon="mdi:edit"
              width={26}
              height={26}
            />
            
          </div>
        </div>
        <div className="prefered-job list w-full m-4 pr-6 flex flex-col">
        {profile?.data?.preferedJobs && profile.data.preferedJobs.length > 0 ? (
            <div className="skills flex flex-wrap ">
              {profile.data.preferedJobs.map((jobs, index) => (
                <span key={index} className="p-2 m-2 bg-gray-200 rounded-md">
                  {jobs}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-500">Add Prefered job</span>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPreferedJob;
