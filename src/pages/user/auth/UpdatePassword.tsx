import ResetPassword from "../../../components/Auth/ResetPassword";

const UpdatePassword = () => {
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
        <div className="login-part w-full md:w-[40%]  flex items-center justify-center">
          <ResetPassword />
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
