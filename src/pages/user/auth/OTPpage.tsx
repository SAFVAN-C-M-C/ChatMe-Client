
import { useEffect } from "react";
import ForgotPassword from "../../../components/Auth/ForgotPassword";
import LoginForm from "../../../components/Auth/LoginForm";
import OtpVerification from "../../../components/Auth/OtpVerification";
import ResetPassword from "../../../components/Auth/ResetPassword";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OTPpage = () => {
    const { user, loading, error } = useSelector(
        (state: RootState) => state.user
    );
    const navigate = useNavigate();

  return (
    <>
      <div className="main-container w-full h-[100vh] flex">
        <div className="hero-image w-[60%] flex justify-center items-center hidden md:flex">
          <img
            src="/general/login-hero-bg.jpg"
            alt="login"
            className="bg-blend-color-burn"
          />
        </div>
        <div className="login-part w-full md:w-[40%]  flex items-center justify-center">       
          <OtpVerification/>
        </div>
      </div>
    </>
  );
};

export default OTPpage;
