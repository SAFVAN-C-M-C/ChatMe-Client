
import { useEffect } from "react";

import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../../../components/Auth/ForgotPassword";

const ForgotPasswordPage = () => {
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
          <ForgotPassword/>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
