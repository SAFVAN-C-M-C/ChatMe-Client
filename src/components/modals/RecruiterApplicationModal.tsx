/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  validateEmail,
  validateField,
  validateName,
} from "../../helper/validate";
import axios from "axios";
import { config } from "../../common/configurations";
import { URL } from "../../common/api";

interface RecruiterApplicationModalProps {
  handleRecruiterRequestModalOpen: () => void;
}
const RecruiterApplicationModal: React.FC<RecruiterApplicationModalProps> = ({
  handleRecruiterRequestModalOpen,
}) => {
  const { profile, error } = useSelector((state: RootState) => state.profile);
  // const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const [formData, setFormData] = useState({
    companyEmail: "",
    name: profile?.data.name || "",
    content: "",
  });

  //event listere
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!validateEmail(formData?.companyEmail)) {
        toast.error("Enter valid email");
        return;
      }
      if (!validateField(formData?.content)) {
        toast.error("Message required");
        return;
      }
      if (!validateName(formData?.name)) {
        toast.error("Enter a valid name");
        return;
      }
      const { data } = await axios.post(
        `${URL}/profile/apply-recruiter`,
        formData,
        config
      );
      if (data) {
        toast.success("Application send successfully");
        handleRecruiterRequestModalOpen();
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-35"></div>
      <div data-theme={profile?.data.theme || "light"} className="fixed inset-0 z-40  flex justify-center items-center">
        <div
          className="closeButton fixed w-auto h-auto top-5 right-5 "
          onClick={handleRecruiterRequestModalOpen}
        >
          <span className="text-3xl text-white">x</span>
        </div>
        <div className="main-cover fixed  z-50 w-[600px] h-[450px] bg-slate-50 rounded-md flex">
          <form
            onSubmit={handleEditSubmit}
            className="form-part flex flex-col w-full h-full items-center-center"
          >
            <div className="heder w-full flex justify-center mt-3">
              <span className="text-xl font-bold">
                Send a Request to Company
              </span>
            </div>
            <div className="form-fields-container overflow-y-scroll h-[450px] mt-10 w-full flex flex-col items-center">
              <div className="form-field w-[80%] flex flex-col mt-2">
                <div className="lablel mb-1">
                  <label className="text-gray-500" htmlFor="">
                    Full Name
                  </label>
                </div>
                <div className="input-field border-[.3px] border-gray-500 bg-slate-100  h-[50px] rounded-md justify-center flex items-center">
                  <input
                    onChange={handleChange}
                    value={formData.name}
                    name="name"
                    id="name"
                    type="text"
                    className="w-[98%] h-full bg-transparent focus:outline-none"
                    placeholder="Enter Full Name"
                  />
                </div>
              </div>
              <div className="form-field w-[80%] flex flex-col mt-2">
                <div className="lablel mb-1">
                  <label htmlFor="" className="text-gray-500">
                    Company Email
                  </label>
                </div>
                <div className="input-field bg-slate-100  h-[50px] rounded-md justify-center flex items-center">
                  <input
                    onChange={handleChange}
                    placeholder="Enter company Name"
                    id="companyEmail"
                    name="companyEmail"
                    type="text"
                    className="w-[98%]  h-full bg-transparent focus:outline-none"
                  />
                </div>
              </div>
              <div className="form-field w-[80%] flex flex-col mt-2">
                <div className="lablel mb-1">
                  <label htmlFor="" className="text-gray-500">
                    Message
                  </label>
                </div>
                <div className="input-field bg-slate-100  h-[50px] rounded-md justify-center flex items-center">
                  <input
                    onChange={handleChange}
                    id="content"
                    name="content"
                    type="text"
                    className="w-[98%] h-full bg-transparent focus:outline-none"
                    placeholder="Write a request to company"
                  />
                </div>
              </div>
            </div>
            <div className="form-footer flex justify-end  w-full h-[70px]">
              <div className="actions flex items-center">
                <span className="cancel mr-3 p-2 border-[.7px] border-gray-500 rounded-md w-[100px] flex justify-center">
                  Cancel
                </span>
                <button
                  type="submit"
                  className="ml-2 mr-4 p-2 bg-blue-500 w-[100px] rounded-md text-white"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecruiterApplicationModal;
