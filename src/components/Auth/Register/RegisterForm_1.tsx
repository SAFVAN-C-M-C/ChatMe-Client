/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import {
  RegisterUser,
  googleLoginOrSignUp,
} from "../../../redux/actions/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { validateEmail, validatePassword } from "../../../helper/validate";
import { GoogleLogin } from "@react-oauth/google";
import ReactLoading from "react-loading";

const RegisterForm_1 = () => {
  //redux
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  //local states
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [confirmPass, setConfirmPass] = useState("");
  const [inputError, setInputError] = useState("");

  //event handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPass(e.target.value);
    if (confirmPass === formData.password) {
      setInputError("");
    } else {
      setInputError("Password dont match");
    }
  };
  const checkingPass = (e: React.FocusEvent<HTMLInputElement>) => {
    setConfirmPass(e.target.value);
    if (confirmPass === formData.password) {
      setInputError("");
    } else {
      setInputError("Password dont match");
    }
  };
  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(formData?.email)) {
      toast.error("Invalid email");
      return;
    }
    if (!validatePassword(formData?.password)) {
      toast.error("Password must contain 8 characters");
      return;
    }
    if (confirmPass.length < 8) {
      toast.error("Password don't match up");
      return;
    }
    const newData = {
      data: formData,
    };
    dispatch(RegisterUser(newData));
  };
  const loginWithGoogle = async (data: any) => {
    dispatch(googleLoginOrSignUp(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  useEffect(() => {
    if (user && user?.success && user?.data?.otp) {
      localStorage.removeItem("timerValue");
      localStorage.removeItem("timerEnd");
      navigate("/otp-verification", { replace: true });
    }
  }, [navigate, user]);
  return (
    <>
      <div className="register-container bg-white border-[.5px] border-gray-700 rounded-lg w-[90%] m-2 h-[550px] lg:w-[80%] md:w-[90%] sm:w-[60%] flex flex-col items-center">
        <div className="login-tilte mt-14 mb-4">
          <strong className="text-xl">Welcome to ChatMe😊</strong>
        </div>
        {error ? (
          <>
            <span>{error.message}</span>
          </>
        ) : null}
        <form
          onSubmit={handleRegisterSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className=" pl-3 register-field mt-10 bg-slate-200 w-[80%] h-[50px] rounded-md flex items-center">
            <Icon
              icon="codicon:mail"
              width={24}
              height={24}
              className="mr-2 text-gray-400"
            />
            <input
              name="email"
              onChange={handleChange}
              id="email"
              type="text"
              className="w-full h-full bg-transparent"
              placeholder="Enter the registered Email"
            />
          </div>
          <div className=" pl-3 register-field mt-5  bg-slate-200 w-[80%] h-[50px] rounded-md  flex items-center">
            <Icon
              icon="bx:bxs-lock-alt"
              width={24}
              height={24}
              className="mr-2 text-gray-400"
            />
            <input
              onChange={handleChange}
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full h-full bg-transparent"
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
          <div className=" pl-3 register-field mt-5 mb-2 bg-slate-200 w-[80%] h-[50px] rounded-md  flex items-center">
            <Icon
              icon="bx:bxs-lock-alt"
              width={24}
              height={24}
              className="mr-2 text-gray-400"
            />
            <input
              onBlur={checkingPass}
              onChange={checkPassword}
              type="password"
              className="w-full h-full bg-transparent"
              placeholder="Re-enter Password"
            />
          </div>
          {inputError && (
            <div className="line w-[90%] flex justify-center mt-2 ">
              {" "}
              <p className="text-red-700 text-sm">{inputError}</p>
            </div>
          )}
          <div className="login-button w-[30%] h-[40px] rounded-full">
            <button
              className="w-full outline-none rounded-full hover:outline-none bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 focus:outline-none h-full text-white flex justify-center items-center transition-colors duration-500 delay-200"
              type="submit"
            >
              {loading ? (
                <ReactLoading
                  type={"bubbles"}
                  color={"#fff"}
                  height={"20%"}
                  width={"20%"}
                />
              ) : (
                "Verify"
              )}
            </button>
          </div>
        </form>

        <div className="line w-[90%] h-[.5px] mt-4 bg-gray-700"></div>
        <div className="mt-4">
          <GoogleLogin
            text="signup_with"
            onSuccess={(credentialResponse) => {
              loginWithGoogle(credentialResponse);
            }}
            onError={() => {
              toast.error("Login Failed");
            }}
          />
        </div>
        <div className="new-user mt-3">
          Already registered?<Link to="/">Login</Link>
        </div>
      </div>
    </>
  );
};

export default RegisterForm_1;
