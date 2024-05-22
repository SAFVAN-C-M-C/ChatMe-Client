import NavigationBar from "../../../components/NavigationBar";
import UserBio from "../../../components/Profile/Personal/UserBio";
import About from "../../../components/Profile/General/About";
import UserEducation from "../../../components/Profile/Personal/UserEducation";
import UserExprerience from "../../../components/Profile/Personal/UserExprerience";
import UserSkills from "../../../components/Profile/Personal/UserSkills";
import UserPreferedJob from "../../../components/Profile/Personal/UserPreferedJob";
import UserPostPart from "../../../components/Profile/Personal/UserPostPart";
import CompanyPostPart from "../../../components/Profile/Company/CompanyPostPart";
import RecruiterPostpart from "../../../components/Profile/Recruiter/RecruiterPostpart";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import CompanyBio from "../../../components/Profile/Company/CompanyBio";
import RecruiterBio from "../../../components/Profile/Recruiter/RecruiterBio";

const ProfilePage = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <>
      <div className="flex ">
        <NavigationBar />
        <div className="profile-part w-full   flex flex-col items-center">
          {
            user?.data?.accountType === "personal" ?<UserBio/>:user?.data?.accountType === "company" ? <CompanyBio/>:null
          }
          <About />
          {user?.data?.accountType === "personal" ? (
            <>
              <UserEducation />
              <UserExprerience />
              <UserSkills />
              <UserPreferedJob />
            </>
          ) : null}
          {user?.data?.accountType === "personal" ? (
            <UserPostPart />
          ) : user?.data?.accountType === "company" ? (
            <CompanyPostPart />
          ) : user?.data?.accountType === "recruiter" ? (
            <RecruiterPostpart />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
