  import { AppDispatch, RootState } from "../../redux/store";
  import { useDispatch, useSelector } from "react-redux";
  import { useEffect, useState } from "react";
  import toast from "react-hot-toast";
  import { validateField, validateName, validatePhone } from "../../helper/validate";
import { updateBio } from "../../redux/actions/user/profileActions";
import { BioDetails } from "../../types/IProfile";

  interface UserBioEditModalProps {
    handleUserBioEditModalOpen: () => void;
  }
  const UserBioEditModal: React.FC<UserBioEditModalProps> = ({
    handleUserBioEditModalOpen,
  }) => {
    const { profile, error } = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      if (error) {
        toast.error(error);
      }
    }, [error]);


    const [formData, setFormData] = useState({
      email: profile?.data.email,
      name: profile?.data.name || "",
      location: profile?.data.bio?.location || "",
      phone: profile?.data.bio?.phone || "",
      title: profile?.data.title || "",
    });

    //event listere
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === "phone") {
        if (!/^\d*$/.test(value)) {
          return;
        }
        if (value.length > 10) {
          return;
        }
      }
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validatePhone(formData?.phone)) {
        toast.error("Enter proper phone number");
        return;
      }
      if (!validateName(formData?.name)) {
        toast.error("Enter proper Name");
        return;
      }if (!validateField(formData?.location)) {
        toast.error("Enter a valid location ");
        return;
      }if (!validateField(formData?.title)) {
        toast.error("Enter title can't be blank");
        return;
      }
      const data:BioDetails={
        name:formData.name,
        title:formData.title,
        bio:{
            location:formData.location,
            phone:formData.phone
        }
      }
      dispatch(updateBio(data))
      if(!error){
        toast.success("Profile Updated");
        handleUserBioEditModalOpen()
      }
    };
    return (
      <>
        <div className="fixed inset-0 z-40 bg-black opacity-35"></div>
        <div className="fixed inset-0 z-40  flex justify-center items-center">
          <div
            className="closeButton fixed w-auto h-auto top-5 right-5 "
            onClick={handleUserBioEditModalOpen}
          >
            <span className="text-3xl text-white">x</span>
          </div>
          <div className="main-cover fixed  z-50 w-[600px] h-[600px] bg-slate-50 rounded-md flex">
            <form
              onSubmit={handleEditSubmit}
              className="form-part flex flex-col w-full h-full items-center-center"
            >
              <div className="heder w-full flex justify-center mt-3">
                <span className="text-xl font-bold">Edit Bio</span>
              </div>
              <div className="form-fields-container overflow-y-scroll h-[450px] mt-10 w-full flex flex-col items-center">
                <div className="form-field w-[80%] flex flex-col mt-2">
                  <div className="lablel mb-1">
                    <label className="text-gray-500" htmlFor="">
                      Full Name
                    </label>
                  </div>
                  <div className="input-field bg-slate-100  h-[50px] rounded-md justify-center flex items-center">
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
                      Email
                    </label>
                  </div>
                  <div className="input-field bg-slate-100  h-[50px] rounded-md justify-center flex items-center">
                    <input
                      disabled
                      value={profile?.data.email}
                      id="email"
                      name="email"
                      type="text"
                      className="w-[98%] text-gray-500 h-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
                <div className="form-field w-[80%] flex flex-col mt-2">
                  <div className="lablel mb-1">
                    <label htmlFor="" className="text-gray-500">
                      Phone
                    </label>
                  </div>
                  <div className="input-field bg-slate-100  h-[50px] rounded-md justify-center flex items-center">
                    <input
                      onChange={handleChange}
                      value={formData.phone}
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-[98%] h-full bg-transparent focus:outline-none"
                      placeholder="Enter Phone number"
                    />
                  </div>
                </div>
                <div className="form-field w-[80%] flex flex-col mt-2">
                  <div className="lablel mb-1">
                    <label htmlFor="" className="text-gray-500">
                      Title (Field of expertise)
                    </label>
                  </div>
                  <div className="input-field bg-slate-100  h-[50px] rounded-md justify-center flex items-center">
                    <input
                      onChange={handleChange}
                      value={formData.title}
                      id="title"
                      name="title"
                      type="text"
                      className="w-[98%] h-full bg-transparent focus:outline-none"
                      placeholder="Eg:- Web Developer"
                    />
                  </div>
                </div>
                <div className="form-field w-[80%] flex flex-col mt-2">
                  <div className="lablel mb-1">
                    <label htmlFor="" className="text-gray-500">
                      Location
                    </label>
                  </div>
                  <div className="input-field bg-slate-100  h-[50px] rounded-md justify-center flex items-center">
                    <input
                      onChange={handleChange}
                      value={formData.location}
                      id="location"
                      name="location"
                      type="text"
                      className="w-[98%] h-full bg-transparent focus:outline-none"
                      placeholder="Enter Location"
                    />
                  </div>
                </div>
              </div>
              <div className="form-footer flex justify-end  w-full h-[70px]">
                <div className="actions flex items-center cursor-pointer" onClick={handleUserBioEditModalOpen}>
                  <span className="cancel mr-3 p-2 border-[.7px] border-gray-500 rounded-md w-[100px] flex justify-center">
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

  export default UserBioEditModal;
