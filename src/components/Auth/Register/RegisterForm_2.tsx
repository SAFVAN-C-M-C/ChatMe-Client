import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { addRegisterDetails } from "../../../redux/actions/user/userActions";
import { validateField, validatePhone } from "../../../helper/validate";
import toast from "react-hot-toast";

const RegisterForm_2 = () => {
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  //local states
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    accountType: "personal",
  });
  const [userAccount, setUserAccount] = useState<boolean>(true);
  const [companyAccount, setCompanyAccount] = useState<boolean>(false);


  //event handler
  const handleAccountRadio = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "company") {
      setCompanyAccount(true);
      setUserAccount(false);
      setFormData((prevData) => ({ ...prevData, ["accountType"]: "company" }));
    } else if (e.target.value === "user") {
      setCompanyAccount(false);
      setFormData((prevData) => ({ ...prevData, ["accountType"]: "personal" }));
      setUserAccount(true);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateField(formData?.name)) {
      toast.error("Name is required");
      return;
    }
    if (!validateField(formData?.location)) {
      toast.error("Location is required");
      return;
    }
    if (!validatePhone(formData?.phone)) {
      toast.error("Enter proper phone number");
      return;
    }
    const newData = {
      data: formData,
    };
    dispatch(addRegisterDetails(newData));
  };

  //use effects
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  useEffect(() => {
    if (user && user?.success && user?.loggined) {
      
      
      navigate("/", { replace: true });
    }
  },[user]);
  return (
    <>
      <div className="register-container bg-white rounded-lg w-[90%] m-2 h-[550px] lg:w-[80%] md:w-[90%] sm:w-[60%] flex flex-col items-center border-[.5px] border-gray-500">
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
          <div className=" pl-3 register-field mt-3  w-[80%] h-[50px] rounded-md flex justify-normalcenter flex-col">
            {/* account selection */}
            <div className="lable">
              <label>Account Type</label>
            </div>
            <div className="radio-option ">
              <input
                type="radio"
                name="account_type"
                checked={userAccount}
                value="user"
                className="bg-transparent"
                onChange={(e) => handleAccountRadio(e)}
              />{" "}
              Personal
            </div>
            <div className="radio-option ">
              <input
                type="radio"
                name="account_type"
                checked={companyAccount}
                value="company"
                className="bg-transparent "
                onChange={(e) => handleAccountRadio(e)}
              />{" "}
              Comapany
            </div>
          </div>

          <div className=" pl-3 register-field mt-10 bg-slate-200 w-[80%] h-[50px] rounded-md flex items-center">
            <Icon
              icon="ic:round-person"
              width={24}
              height={24}
              className="mr-2 text-gray-400"
            />
            <input
            name="name"
              onChange={handleChange}
              type="text"
              className="w-full h-full bg-transparent"
              placeholder="Enter Full Name "
            />
          </div>
          <div className=" pl-3 register-field mt-5 bg-slate-200 w-[80%] h-[50px] rounded-md flex items-center">
            <Icon
              icon="mdi:phone"
              width={24}
              height={24}
              className="mr-2 text-gray-400"
            />
            <input
            name="phone"
              onChange={handleChange}
              type="tel"
              max={10}
              className="w-full h-full bg-transparent"
              placeholder="Enter Phone Number "
            />
          </div>

          <div className=" pl-3 register-field mt-5 mb-5 bg-slate-200 w-[80%] h-[50px] rounded-md flex items-center">
            <Icon
              icon="mdi:location"
              width={24}
              height={24}
              className="mr-2 text-gray-400"
            />
            <input
            name="location"
              onChange={handleChange}
              type="text"
              className="w-full h-full bg-transparent text-gray-500"
              placeholder="Enter the location "
            />
          </div>

          <div className="login-button w-[30%] h-[40px] bg-blue-600 rounded-full">
            <button
              className="w-full h-full text-white flex justify-center items-center"
              type="submit"
            >
              {loading?"loading...":"Register"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm_2;
