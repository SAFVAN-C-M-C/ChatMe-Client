/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import CropModal from "../crop/CropModal";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { updateAvatar } from "../../redux/actions/user/profileActions";

interface AvatarViewModalProps {
  handleAvatarViewModalOpen: () => void;
  photoUrl: string;
}

const AvatarViewModal: React.FC<AvatarViewModalProps> = ({
  handleAvatarViewModalOpen,
  photoUrl,
}) => {
  const { loading, profile, error } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (profile?.message === "Avatar updated") {
      toast.success("Profile Pic updated");
      handleAvatarViewModalOpen();
    }
  }, [profile?.message, handleAvatarViewModalOpen]);

  const [avatarUrl, setAvatarUrl] = useState(photoUrl);
  const [openCrop, setOpenCrop] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setAvatarUrl(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  const handleImageUpload = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please select a picture.');
      return;
    }
    
    
    const blob = await fetch(avatarUrl).then((r) => r.blob());
    const croppedFile = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
    console.log(croppedFile);
    
    
    const formData={
      avatar:croppedFile
    }
    
    dispatch(updateAvatar(formData));
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-35"></div>

      {openCrop ? (
        <CropModal {...{ avatarUrl, setOpenCrop, setAvatarUrl, setFile }} />
      ) : (
        <div className="fixed inset-0 z-40 flex justify-center items-center">
          <div
            className="closeButton fixed w-auto h-auto top-5 right-5"
            onClick={handleAvatarViewModalOpen}
          >
            <span className="text-3xl text-white">x</span>
          </div>
          <div className="main-cover fixed z-50 w-[600px] h-[400px] bg-slate-50 rounded-md flex justify-center items-center">
            <form onSubmit={handleImageUpload} className="content-cover w-[80%] h-[80%] flex flex-col justify-center items-center">
              <div className="avatar">
                <label htmlFor="avatar">
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="w-[200px] h-[200px]"
                  />
                </label>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  className="hidden"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
              <div className="controllers flex m-6">
                <span
                  className="cancel mr-3 p-2 border-[.7px] border-gray-500 rounded-md w-[100px] flex justify-center"
                  onClick={handleAvatarViewModalOpen}
                >
                  Cancel
                </span>
                <button
                  type="submit"
                  className="ml-2 mr-4 p-2 bg-blue-500 w-[100px] rounded-md text-white"
                  disabled={loading}
                >
                  {loading ? "Changing..." : "Change"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AvatarViewModal;
