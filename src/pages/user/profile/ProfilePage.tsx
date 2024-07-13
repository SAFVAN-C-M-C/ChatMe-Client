/* eslint-disable react-hooks/exhaustive-deps */
import NavigationBar from "../../../components/general/NavigationBar";
import UserBio from "../../../components/Profile/Personal/UserBio";
import About from "../../../components/Profile/General/About";
import UserEducation from "../../../components/Profile/Personal/UserEducation";
import UserExprerience from "../../../components/Profile/Personal/UserExprerience";
import UserSkills from "../../../components/Profile/Personal/UserSkills";
import UserPreferedJob from "../../../components/Profile/Personal/UserPreferedJob";
import UserPostPart from "../../../components/Profile/Personal/UserPostPart";
import CompanyPostPart from "../../../components/Profile/Company/CompanyPostPart";
import RecruiterPostpart from "../../../components/Profile/Recruiter/RecruiterPostpart";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import CompanyBio from "../../../components/Profile/Company/CompanyBio";
import RecruiterBio from "../../../components/Profile/Recruiter/RecruiterBio";
import { useEffect } from "react";

import { getUserDataFirst } from "../../../redux/actions/user/userActions";
import { useNavigate } from "react-router-dom";
import UseListenMessages from "@/hooks/UseListenMessages";
import UseListenNotification from "@/hooks/UseListenNotification";

const ProfilePage = () => {
  UseListenMessages()
  UseListenNotification()
  const { user } = useSelector((state: RootState) => state.user);
  const { profile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const navigate=useNavigate()
  useEffect(()=>{
    dispatch(getUserDataFirst());
    if(!user?.data){
      navigate("/login", { replace: true });
    }
  },[user?.data._id])

  return (
    <>
      <div className="flex ">
        <NavigationBar />
        <div className="profile-part w-full   flex flex-col items-center">
          {
            profile?.data?.accountType === "personal" ?<UserBio/>:profile?.data?.accountType === "company" ? <CompanyBio/>:profile?.data?.accountType === "recruiter" ? <RecruiterBio/>:null
          }
          
          <About />
          {profile?.data?.accountType === "personal" ? (
            <>
              <UserEducation />
              <UserExprerience />
              <UserSkills />
              <UserPreferedJob />
            </>
          ) : null}
          {profile?.data?.accountType === "personal" ? (
            <UserPostPart />
          ) : profile?.data?.accountType === "company" ? (
            <CompanyPostPart />
          ) : profile?.data?.accountType === "recruiter" ? (
            <RecruiterPostpart />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
