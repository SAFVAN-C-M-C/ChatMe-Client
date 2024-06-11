import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { validateField } from "../../helper/validate";
import { updateAbout } from "../../redux/actions/user/profileActions";

interface EditAboutProps {
  handleEditAboutclick: () => void;
}

const EditAbout: React.FC<EditAboutProps> = ({ handleEditAboutclick }) => {
  const { profile, error } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const [about, setAbout] = useState(profile?.data.bio?.about || "");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAbout(e.target.value);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateField(about)) {
      toast.error("Enter a proper about text");
      return;
    }
    const data = {
      about: about,
    };
    dispatch(updateAbout(data));
    if (!error) {
      toast.success("About Updated");
      handleEditAboutclick();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-35"></div>
      <div className="fixed inset-0 z-40 flex justify-center items-center">
        <div
          className="closeButton fixed w-auto h-auto top-5 right-5"
          onClick={handleEditAboutclick}
        >
          <span className="text-3xl text-white">x</span>
        </div>
        <div className="main-cover fixed z-50 w-[600px] h-[450px] bg-slate-50 rounded-md flex">
          <form
            onSubmit={handleEditSubmit}
            className="form-part flex flex-col w-full h-full items-center"
          >
            <div className="header w-full flex justify-center mt-3">
              <span className="text-xl font-bold">Edit About</span>
            </div>
            <div className="form-fields-container overflow-y-scroll h-[300px] mt-10 w-full flex flex-col items-center">
              <div className="form-field w-[80%] flex flex-col mt-2">
                <div className="label mb-1">
                  <label className="text-gray-500" htmlFor="about">
                    About you
                  </label>
                </div>
                <div className="input-field bg-slate-100 border-[.3px] border-gray-400 h-[200px] rounded-md justify-center flex items-center">
                  <textarea
                    onChange={handleChange}
                    value={about}
                    name="about"
                    id="about"
                    className="w-[98%] h-full bg-transparent focus:outline-none"
                    placeholder="Enter information about you"
                  />
                </div>
              </div>
            </div>
            <div className="form-footer flex justify-end w-full h-[70px]">
              <div className="actions flex items-center">
                <span
                  className="cancel mr-3 p-2 border-[.7px] border-gray-500 rounded-md w-[100px] flex justify-center"
                  onClick={handleEditAboutclick}
                >
                  Cancel
                </span>
                <button
                  type="submit"
                  className="ml-2 mr-4 p-2 bg-blue-500 w-[100px] rounded-md text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditAbout;
