
import ForgotPassword from "../../components/Auth/ForgotPassword";
import LoginForm from "../../components/Auth/LoginForm";
import OtpVerification from "../../components/Auth/OtpVerification";
import ResetPassword from "../../components/Auth/ResetPassword";

const Login = () => {
  return (
    <>
      <div className="main-container w-full h-[100vh] flex">
        <div className="hero-image w-[60%] flex justify-center items-center hidden md:flex">
          <img
            src="/login-hero-bg.jpg"
            alt="login"
            className="bg-blend-color-burn"
          />
        </div>
        <div className="login-part w-full md:w-[40%]  flex items-center justify-center">
          <LoginForm/>
          
        </div>
      </div>
    </>
  );
};

export default Login;
