import { useEffect } from "react";
import RegisterForm_1 from "../../../components/Auth/Register/RegisterForm_1";
import RegisterForm_2 from "../../../components/Auth/Register/RegisterForm_2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { updateError } from "@/redux/reducers/userSlice";

const Register = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(updateError(null));
  }, [dispatch]);

  return (
    <>
      <div className="main-container w-full h-[100vh] flex">
        <div className="hero-image w-[60%] justify-center items-center hidden md:flex">
          <img
            src="/general/login-hero-bg.jpg"
            alt="login"
            className="bg-blend-color-burn"
          />
        </div>
        <div className="register-part w-full md:w-[40%] bg-gray-00 flex items-center justify-center ">
          {user && user?.data?.details ? (
            <RegisterForm_2 />
          ) : (
            <RegisterForm_1 />
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
