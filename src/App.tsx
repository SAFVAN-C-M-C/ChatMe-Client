
import { Route, Routes } from "react-router-dom";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Home from "./pages/user/Home";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import OTPpage from "./pages/user/OTPpage";
import { useEffect } from "react";
import { getUserDataFirst } from "./redux/actions/user/userActions";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UpdatePassword from "./pages/user/UpdatePassword";
import ForgotPasswordPage from "./pages/user/ForgotPasswordPage";
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





