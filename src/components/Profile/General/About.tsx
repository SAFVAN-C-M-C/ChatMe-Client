import { Icon } from "@iconify/react";
import { useState } from "react";
import EditAbout from "../../modals/EditAbout";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const About = () => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const [editAbout, setEditAbout] = useState(false);
  const handleEditAboutclick = () => {
    setEditAbout(!editAbout);
  };
  return (
    <>
      {editAbout ? (
        <EditAbout handleEditAboutclick={handleEditAboutclick} />
      ) : null}
      <div
        data-theme={profile?.data.theme || "light"}
        className="profile-about border-[.5px] border-dashed border-gray-600  w-[95%] h-auto rounded-xl  mt-12"
      >
        <div className="title w-full m-4 pr-6 flex justify-between">
          <div className="about-title">
            <span className="font-bold">About</span>
          </div>
          <div className="edit-about ">
            <Icon
              onClick={handleEditAboutclick}
              className="cursor-pointer w-[18px]  h-[18px] sm:w-[20px] sm:h-[20px] md:w-[22px] md:h-[22px] lg:w-[24px] lg:h-[24px]"
              icon="mdi:edit"
            />
          </div>
        </div>
        <div className="about-content w-full p-3 h-auto">
          <p>
            {profile?.data.bio?.about
              ? profile?.data.bio?.about
              : "Enter some about"}
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
