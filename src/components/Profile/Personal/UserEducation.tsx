import { Icon } from "@iconify/react";
import Education from "./Education";
import { useState } from "react";
import AddEducation from "../../modals/AddEducation";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const UserEducation = () => {
  const { profile } = useSelector((state: RootState) => state.profile);

  const [openAddEducation, setOpenAddEducation] = useState(false);
  return (
    <>
      {openAddEducation ? (
        <AddEducation setOpenAddEducation={setOpenAddEducation} />
      ) : null}

      <div data-theme={profile?.data.theme || "light"} className="profile-education border-[.5px] border-dashed border-gray-600  w-[80%] h-auto rounded-xl  mt-12">
        <div className="title w-full m-4 pr-6 flex justify-between">
          <div className="education-title">
            <span className="font-bold">Education</span>
          </div>
          <div className="action-education flex ">
            {/* <Icon
              className="mr-2 cursor-pointer"
              icon="mdi:edit"
              width={26}
              height={26}
            /> */}
            <Icon
              onClick={() => setOpenAddEducation(true)}
              icon="mdi:add"
              width={26}
              height={26}
              className="mr-2 cursor-pointer"
            />
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
            :<span className="text-gray-500">Add Education</span>
          }
        </div>
      </div>
    </>
  );
};

export default UserEducation;
