import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react"
import { getUserDataFirst } from "@/redux/actions/user/userActions";
import { getProfileDataFirst } from "@/redux/actions/user/profileActions";
import { getAdminUsersDetails } from "@/redux/actions/admin/adminUserAction";
import UpdatePassword from "@/pages/user/auth/UpdatePassword";
import ForgotPasswordPage from "@/pages/user/auth/ForgotPasswordPage";
import ProfilePage from "@/pages/user/profile/ProfilePage";
import PrivetRoutes from "@/Routes/PrivetRoutes";
import AuthRoutes from "@/Routes/AuthRoutes";
import ProtectSpecialRoutes from "@/Routes/ProtectSpecialRoutes";
import AdminHome from "@/pages/admin/AdminHome";
import Error404 from "@/pages/general/Error404";
import LoadingBar from "react-top-loading-bar";
import SplashScreen from "@/components/general/SplashScreen";
import Login from "@/pages/user/auth/Login";
import Register from "@/pages/user/auth/Register";
import Home from "@/pages/user/general/Home";
import OTPpage from "@/pages/user/auth/OTPpage";
import Users from "@/pages/admin/Users";
import Company from "@/pages/admin/Company";
import CompanyRequests from "@/pages/admin/CompanyRequests";
import RecruiterRequests from "@/pages/admin/RecruiterRequests";
import { getAdminCompanyDetails } from "@/redux/actions/admin/adminCompanyAction";
import { getAdminCompanyRequestsDetails } from "@/redux/actions/admin/adminCompanyRequestAction";
import { getAdminRecruiterRequestDetails } from "@/redux/actions/admin/adminRecruiterRequestAction";
import { getHomePosts } from "@/redux/actions/posts/homePostsActions";
import { getMyPosts } from "@/redux/actions/posts/userPostsAction";
import { getSavedPost } from "./redux/actions/posts/savedPostAction";
import ChatPage from "./pages/user/Chat/ChatPage";
import UserProfilePage from "./pages/user/profile/UserProfilePage";
import Reports from "./pages/admin/Reports";
import { getReports } from "./redux/actions/admin/adminReportAction";
import { getNotification } from "./redux/actions/notification/notificationAction";
import JobPage from "./pages/user/Jobs/JobPage";
import NotificationPage from "./pages/admin/NotificationPage";
import { getJobs } from "./redux/actions/jobs/jobAction";
import JobViewPage from "./pages/user/Jobs/JobViewPage";

function App() {
  //redux
  const { user } = useSelector((state: RootState) => state.user);
  const { profile } = useSelector((state: RootState) => state.profile);
  const { adminUser } = useSelector((state: RootState) => state.adminUser);
  const { adminCompanies } = useSelector((state: RootState) => state.adminCompany);
  const { adminCompanyRequests } = useSelector((state: RootState) => state.adminCompanyRequest);
  const { adminRecruiterRequests } = useSelector((state: RootState) => state.adminRecruiterRequest);
  const { homePosts } = useSelector((state: RootState) => state.homePosts);
  const { userPosts } = useSelector((state: RootState) => state.userPosts);
  
  const dispatch = useDispatch<AppDispatch>();
  //local states
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const [loading, setLoading] = useState(true);


  //useeffects
  useEffect(() => {
    setProgress(20);
    setTimeout(() => {
      setProgress(50);
    }, 300);
    setTimeout(() => {
      setProgress(80);
    }, 600);
    setTimeout(() => {
      setProgress(100);
    }, 900);
    return () => {
      setProgress(0);
    };
  }, [location]);

  useEffect(() => {
    console.log("On loading the app user=",user);
    console.log("On loading the app profile=",profile);
    console.log("On loading the app profile=",adminUser);
    console.log("On loading the app profile=",);
    
    if (!user) {
      dispatch(getUserDataFirst());
    }
    if(user?.data?._id && user.data.role==="admin"){
      dispatch(getAdminUsersDetails())
      dispatch(getAdminCompanyDetails())
      dispatch(getAdminCompanyRequestsDetails())
      dispatch(getAdminRecruiterRequestDetails())
      dispatch(getReports())
    }
    if(user?.data?._id && user.data.role==="user"){
      dispatch(getHomePosts());
      dispatch(getJobs());
      dispatch(getProfileDataFirst());
      dispatch(getMyPosts());
      dispatch(getSavedPost());
      dispatch(getNotification());
    }
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem("hasVisited", "true");
      }, 6000); // Simulate loading for 6 seconds
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch,user?.data?._id,profile?.success,adminUser?.success,adminCompanies?.success,adminCompanyRequests?.success,adminRecruiterRequests?.success,homePosts?.data.length,userPosts?.data.length]);
  // useEffect(()=>{
  //   if(user?.data._id){    
  //     dispatch(getProfileDataFirst())
  //   }
  // },[user?.data._id])
  
  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          <LoadingBar
            color="#003476"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route path="*" element={<Error404 />} />

            <Route element={<PrivetRoutes />}>
              {user?.data?.role === "user" && !user.data.isBlocked ? (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/u/profile/:userId" element={<UserProfilePage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/chat/u/:chatId" element={<ChatPage />} />
                  <Route path="/jobs" element={<JobPage />} />
                  <Route path="/jobs/job/:jobId" element={<JobViewPage />} />
                  
                </>
              ) : user?.data?.role === "admin" ? (
                <>
                  <Route path="/" element={<AdminHome />} />
                  <Route path="/admin/users" element={<Users />} />
                  <Route path="/admin/company" element={<Company />} />
                  <Route path="/admin/company/requests" element={<CompanyRequests />} />
                  <Route path="/admin/recruiter/requests" element={<RecruiterRequests />} />
                  <Route path="/admin/reports" element={<Reports />} />
                  <Route path="/admin/notification" element={<NotificationPage />} />
                </>
              ) : (
                <Route path="/" element={<Navigate to="/login" />} />
              )}
            </Route>

            <Route element={<AuthRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/otp-verification"
                element={
                  <ProtectSpecialRoutes type="otp">
                    <OTPpage />
                  </ProtectSpecialRoutes>
                }
              />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="/update-password"
                element={
                  <ProtectSpecialRoutes type="reset">
                    <UpdatePassword />
                  </ProtectSpecialRoutes>
                }
              />
            </Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
