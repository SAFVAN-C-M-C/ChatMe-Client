import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useEffect, useState } from "react";
import { getUserDataFirst } from "./redux/actions/user/userActions";
import { getProfileDataFirst } from "./redux/actions/user/profileActions";
import { getAdminUsersDetails } from "./redux/actions/admin/adminUserAction";
import UpdatePassword from "./pages/user/auth/UpdatePassword";
import ForgotPasswordPage from "./pages/user/auth/ForgotPasswordPage";
import ProfilePage from "./pages/user/profile/ProfilePage";
import PrivetRoutes from "./Routes/PrivetRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import ProtectSpecialRoutes from "./Routes/ProtectSpecialRoutes";
import AdminHome from "./pages/admin/AdminHome";
import Error404 from "./pages/general/Error404";
import LoadingBar from "react-top-loading-bar";
import SplashScreen from "./components/general/SplashScreen";
import Login from "./pages/user/auth/Login";
import Register from "./pages/user/auth/Register";
import Home from "./pages/user/general/Home";
import OTPpage from "./pages/user/auth/OTPpage";
import Users from "./pages/admin/Users";
function App() {
  //redux
  const { user } = useSelector((state: RootState) => state.user);
  const { profile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const { adminUser } = useSelector((state: RootState) => state.adminUser);

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
    
    if (!user) {
      dispatch(getUserDataFirst());
    }
    if(user?.data?._id && user.data.role==="admin"){
      dispatch(getAdminUsersDetails())
    }
    if(user?.data?._id && user.data.role==="user"){
      dispatch(getProfileDataFirst())
    }
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem("hasVisited", "true");
      }, 6000); // Simulate loading for 3 seconds
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch,user?.data?._id,profile?.success,adminUser?.success]);
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
              {user?.data?.role === "user" ? (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </>
              ) : user?.data?.role === "admin" ? (
                <>
                  <Route path="/" element={<AdminHome />} />
                  <Route path="/admin/users" element={<Users />} />
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
