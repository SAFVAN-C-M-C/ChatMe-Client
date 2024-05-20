import NavigationBar from "../../../components/NavigationBar";
import UserBio from "../../../components/Profile/UserBio";
import About from "../../../components/Profile/About";
import UserEducation from "../../../components/Profile/UserEducation";
import UserExprerience from "../../../components/Profile/UserExprerience";
import UserSkills from "../../../components/Profile/UserSkills";
import UserPreferedJob from "../../../components/Profile/UserPreferedJob";
import UserPostPart from "../../../components/Profile/UserPostPart";

const ProfilePage = () => {
  return (
    <>
      <div className="flex ">
        <NavigationBar />
        <div className="profile-part w-full   flex flex-col items-center">
          <UserBio />
          <About />
          <UserEducation />
          <UserExprerience />
          <UserSkills />
          <UserPreferedJob />
          <UserPostPart/>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
