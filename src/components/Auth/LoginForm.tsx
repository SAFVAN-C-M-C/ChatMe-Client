import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Field } from "formik";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  googleLoginOrSignUp,
  loginUser,
} from "../../redux/actions/user/userActions";
import { validateEmail, validatePassword } from "../../helper/validate";
import { GoogleLogin } from "@react-oauth/google";
const LoginForm = () => {
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(formData?.email)) {
      toast.error("Invalid email");
      return;
    }
    if (!validatePassword(formData?.password)) {
      toast.error("Password must contain 8 characters");
      return;
    }
    const newData = {
      data: formData,
      navigate: navigate,
    };
    dispatch(loginUser(newData));
  };
  const loginWithGoogle = async (data: any) => {
    dispatch(googleLoginOrSignUp(data));
  };
  useEffect(() => {
    
    if (user && user?.data?.details) {
      navigate("/register", { replace: true });
    }
  }, [user]);
  return (
    <>
      <div className="login-container border-gray-300 border-[.5px]  rounded-lg w-[90%] m-2 h-[550px] lg:w-[80%] md:w-[90%] sm:w-[60%] flex flex-col items-center">
        <div className="login-tilte mt-14 mb-4">
          <strong className="text-xl">Welcome Back</strong>
        </div>
        {error ? (
          <>
            <span>{error.message}</span>
          </>
        ) : null}

        <form
          onSubmit={handleLoginSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className=" pl-3 login-field mt-10 bg-slate-100 w-[80%] h-[50px] rounded-md flex items-center">
            <Icon
              icon="codicon:mail"
              width={24}
              height={24}
              className="mr-2 text-gray-400"
            />
            <input
              onChange={handleChange}
              name="email"
              id="email"
              type="text"
              className="w-full h-full bg-transparent focus:outline-none"
              placeholder="Enter the registered Email"
            />
          </div>
          <div className=" pl-3 login-field mt-7 mb-7 bg-slate-100 w-[80%] h-[50px] rounded-md  flex items-center">
            <Icon
              icon="bx:bxs-lock-alt"
              width={24}
              height={24}
              className="mr-2 text-gray-400"
            />
            <input
              onChange={handleChange}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="w-full h-full bg-transparent focus:outline-none"
              placeholder="Enter new password"
            />
            <Icon
              icon={showPassword ? `mdi:eye-off` : `mdi:eye`}
              width={24}
              height={24}
              className="mr-2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="login-button w-[30%] h-[40px] rounded-full">
            <button
              className="w-full rounded-full  bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 focus:outline-none h-full text-white flex justify-center items-center transition-all duration-500 delay-200 ease-in-out custom-gradient-transition"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        <div className="forgot-password">
          <p className="text-blue-600 text-xs mt-3">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        </div>
        <div className="line w-[90%] h-[.5px] mt-4 bg-gray-700"></div>
        {/* <div className="sign-up-with-google w-3/4 h-[40px] border-[.5px] border-gray-600 rounded-lg mt-4 flex justify-center items-center"> */}
        {/* <p className="font-medium text-gray-500 mr-3">Sign in with </p>
          <Icon icon="devicon:google" width="1.2rem" height="1.2rem" /> */}
        <div className="mt-4">
          <GoogleLogin
            text="signin_with"
            onSuccess={(credentialResponse) => {
              loginWithGoogle(credentialResponse);
            }}
            onError={() => {
              
            }}
          />
        </div>
        {/* </div> */}
        <div className="new-user mt-3">
          New user?<Link to="/register">SignUp</Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
