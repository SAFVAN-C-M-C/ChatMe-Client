import { Icon } from "@iconify/react";
import { validateEmail } from "../../helper/validate";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { forgotPassword } from "../../redux/actions/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
// import { validateEmail } from '../../helper/validate';
// import toast from 'react-hot-toast';
// import { useState } from 'react';
// import { forgotPassword } from '../../redux/actions/user/userActions';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../../redux/store';
// import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  //event handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Invalid email");
      return;
    }
    dispatch(forgotPassword(email));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  useEffect(() => {
    if (user?.success && user?.data?.otp) {
      localStorage.removeItem("timerValue");
      localStorage.removeItem("timerEnd");
      navigate("/otp-verification", { replace: true });
    }
  }, [user]);

  return (
    <>
      <div className="forgot-container bg-white rounded-lg w-[90%] m-2 h-[300px] lg:w-[80%] md:w-[90%] sm:w-[60%] flex flex-col items-center">
        <div className="forgot-tilte mt-14 ">
          <strong className="text-xl">Reset Password</strong>
        </div>
        <form
          onSubmit={handleLoginSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className=" pl-3 email-field mt-10 bg-slate-200 w-[80%] h-[50px] rounded-md flex items-center">
            <Icon
              icon="codicon:mail"
              width={24}
              height={24}
              className="mr-2 text-gray-400"
            />
            <input
              onChange={handleChange}
              name="email"
              type="text"
              className="w-full h-full bg-transparent"
              placeholder="Enter the registered Email"
            />
          </div>

          <div className="submit-button w-[30%] h-[40px] bg-blue-600 rounded-full mt-5">
            <button
              className="w-full h-full text-white flex justify-center items-center"
              type="submit"
            >
              Send Mail
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
