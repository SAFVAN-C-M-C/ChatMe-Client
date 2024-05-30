import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/user/auth/Login";
import Register from "./pages/user/auth/Register";
import Home from "./pages/user/general/Home";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import OTPpage from "./pages/user/auth/OTPpage";
import { useEffect, useState } from "react";
import { getUserDataFirst } from "./redux/actions/user/userActions";
import UpdatePassword from "./pages/user/auth/UpdatePassword";
import ForgotPasswordPage from "./pages/user/auth/ForgotPasswordPage";
import ProfilePage from "./pages/user/profile/ProfilePage";
import PrivetRoutes from "./Routes/PrivetRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import ProtectSpecialRoutes from "./Routes/ProtectSpecialRoutes";
// import RolebaseRoutes from "./Routes/RolebaseRoutes";
import AdminHome from "./pages/admin/AdminHome";
import Error404 from "./pages/general/Error404";
import LoadingBar from "react-top-loading-bar";
import SplashScreen from "./components/general/SplashScreen";
function App() {
  const { user } = useSelector((state: RootState) => state.user);
  console.log(user);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Start loading bar on route change
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

  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      dispatch(getUserDataFirst());
    }
    // Check if the splash screen has already been shown
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem("hasVisited", "true");
      }, 3000); // Simulate loading for 3 seconds
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  }, [dispatch, user?.data?._id]);
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
