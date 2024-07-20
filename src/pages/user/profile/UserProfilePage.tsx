/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import NavigationBar from "@/components/general/NavigationBar";
import About from "@/components/Profile/UnknownUser/About";
import CompanyBio from "@/components/Profile/UnknownUser/CompanyBio";
import CompanyPostPart from "@/components/Profile/UnknownUser/CompanyPostPart";
import RecruiterBio from "@/components/Profile/UnknownUser/RecruiterBio";
import RecruiterPostpart from "@/components/Profile/UnknownUser/RecruiterPostpart";
import UserBio from "@/components/Profile/UnknownUser/UserBio";
import UserEducation from "@/components/Profile/UnknownUser/UserEducation";
import UserExprerience from "@/components/Profile/UnknownUser/UserExprerience";
import UserPostPart from "@/components/Profile/UnknownUser/UserPostPart";
import UserSkills from "@/components/Profile/UnknownUser/UserSkills";
import UseListenNotification from "@/hooks/UseListenNotification";
import { UserPostsPayload } from "@/redux/reducers/posts/userPosts";
import { ProfilePayload } from "@/redux/reducers/profileSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";







const UserProfilePage = () => {
  UseListenNotification()
  const { profile  } = useSelector((state: RootState) => state.profile);
  const { userId } = useParams();
  const [Userprofile, setUserProfile] = useState<ProfilePayload | null>(null);
  const [userPosts, setUserPosts] = useState<UserPostsPayload | null>(null);
  const getProfile = async (userId: string) => {
    try {
      const response = await axios.get(
        `${URL}/profile/users/${userId}`,
        config
      );
      
      if (response.status === 200) {
        setUserProfile(response.data);
        getPosts(String(userId));
      }
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  };
  const getPosts = async (userId: string) => {
    try {
      const response = await axios.get(`${URL}/post/user/${userId}`, config);
      if (response.status === 200) {
        setUserPosts(response.data);
      }
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  };
  useEffect(() => {
    getProfile(String(userId));
    console.log(Userprofile);
    
  }, [userId,profile?.data.following?.length]);
  return (
    <>
      <div className="flex " data-theme={profile?.data.theme || "light"}>
        <NavigationBar />
        <div className="profile-part w-full   flex flex-col items-center">
          {
            Userprofile?.data?.accountType === "personal" ?<UserBio Userprofile={Userprofile} postLength={userPosts?.data.length}/>:Userprofile?.data?.accountType === "company" ? <CompanyBio Userprofile={Userprofile} postLength={userPosts?.data.length}/>:Userprofile?.data?.accountType === "recruiter" ? <RecruiterBio Userprofile={Userprofile} postLength={userPosts?.data.length}/>:null
          }
          

          <About profile={Userprofile} />
          {Userprofile?.data?.accountType === "personal" ? (
            <>
              {Userprofile.data.education?.length !== 0 ? (
                <UserEducation profile={Userprofile} />
              ) : null}
              {Userprofile.data.experience?.length !== 0 ? (
                <UserExprerience profile={Userprofile} />
              ) : null}
              {Userprofile.data.skills?.length !== 0 ? (
                <UserSkills profile={Userprofile} />
              ) : null}
            </>
          ) : null}
          {Userprofile?.data?.accountType === "personal" ? (
            <UserPostPart userPosts={userPosts} />
          ) : Userprofile?.data?.accountType === "company" ? (
            <CompanyPostPart userPosts={userPosts} />
          ) : Userprofile?.data?.accountType === "recruiter" ? (
            <RecruiterPostpart userPosts={userPosts} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
