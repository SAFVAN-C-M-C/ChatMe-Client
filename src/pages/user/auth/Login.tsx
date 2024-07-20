import { useEffect } from "react";

import LoginForm from "../../../components/Auth/LoginForm";

import { updateError } from "@/redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(updateError(null));
  }, []);
  return (
    <>
      <div className="main-container w-full h-[100vh] flex">
        <div className="hero-image w-[60%]   justify-center items-center hidden md:flex">
          <img
            src="/general/login-hero-bg.jpg"
            alt="login"
            className="bg-blend-color-burn"
          />
        </div>
        <div className="login-part w-full md:w-[40%]  flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
