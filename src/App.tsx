import { Route, Routes } from "react-router-dom";
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
function App() {
  const { user } = useSelector((state: RootState) => state.user);
  console.log(user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!user) {
      dispatch(getUserDataFirst());
    }
  }, [dispatch, user]);
  return (

    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/otp-verification" element={<OTPpage/>}/>
      <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
      <Route path="/update-password" element={<UpdatePassword/>}/>
    </Routes>
    </>
  );
}

export default App;





