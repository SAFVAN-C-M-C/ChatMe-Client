import { ProfilePayload } from "@/redux/reducers/profileSlice";
import Experience from "../Personal/Experience";

interface UserExprerienceProps {
  profile: ProfilePayload | null;
}
const UserExprerience: React.FC<UserExprerienceProps> = ({ profile }) => {
  return (
    <>
      <div
        data-theme={profile?.data.theme || "light"}
        className="profile-experience border-[.5px] border-gray-600  w-[95%] h-auto rounded-xl border-dashed mt-12"
      >
        <div className="title w-full m-4 pr-6 flex justify-between">
          <div className="education-title">
            <span className="font-bold">Experience</span>
          </div>
        </div>
        <div className="experience list w-full m-4 pr-6 flex flex-col">
          {profile?.data.experience?.length !== 0 ? (
            profile?.data?.experience?.map((data, index) => (
              <Experience
                key={index}
                position={data.position}
                endYear={data.endYear}
                nameOfinstitue={data.nameOfinstitue}
                startYear={data.startYear}
              />
            ))
          ) : (
            <span className="text-gray-500">Add Experience</span>
          )}
        </div>
      </div>
    </>
  );
};

export default UserExprerience;
