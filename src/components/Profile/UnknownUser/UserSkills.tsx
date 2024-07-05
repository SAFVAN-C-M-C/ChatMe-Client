
import { ProfilePayload } from "@/redux/reducers/profileSlice";
interface UserSkillsProps{
    profile: ProfilePayload | null;
}
const UserSkills:React.FC<UserSkillsProps> = ({profile}) => {

  return (
    <>
     
      <div className="profile-skill border-[.5px] border-gray-600  w-[80%] h-auto rounded-xl bg-slate-100 mt-12">
        <div className="title w-full m-4 pr-6 flex justify-between">
          <div className="education-title">
            <span className="font-bold">Top Skills</span>
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
