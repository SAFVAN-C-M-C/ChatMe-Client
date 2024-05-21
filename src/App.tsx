import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/user/auth/Login";
import Register from "./pages/user/auth/Register";
import Home from "./pages/user/general/Home";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import OTPpage from "./pages/user/auth/OTPpage";
import { useEffect } from "react";
import { getUserDataFirst } from "./redux/actions/user/userActions";
import UpdatePassword from "./pages/user/auth/UpdatePassword";
import ForgotPasswordPage from "./pages/user/auth/ForgotPasswordPage";
import ProfilePage from "./pages/user/profile/ProfilePage";
import PrivetRoutes from "./Routes/PrivetRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import ProtectSpecialRoutes from "./Routes/ProtectSpecialRoutes";
import RolebaseRoutes from "./Routes/RolebaseRoutes";
import AdminHome from "./pages/admin/AdminHome";
import Error404 from "./pages/general/Error404";
function App() {
  const { user } = useSelector((state: RootState) => state.user);
  console.log(user);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      dispatch(getUserDataFirst());
    }
  }, [dispatch, user?.data?._id]);
  return (
    <>
      <Routes>
        <Route path="*" element={<Error404 />} />

        <Route element={<PrivetRoutes />}>
          {user?.data?.role === "user" ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<ProfilePage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<AdminHome />} />
            </>
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
  );
}

export default App;
