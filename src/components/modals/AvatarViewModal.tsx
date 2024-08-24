/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import CropModal from "../crop/CropModal";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getSignedUrl } from "../../services";
import ReactLoading from "react-loading";
import axios from "axios";
import { updateAvatar } from "../../redux/actions/user/profileActions";

interface AvatarViewModalProps {
  handleAvatarViewModalOpen: () => void;
  photoUrl: string;
}

const AvatarViewModal: React.FC<AvatarViewModalProps> = ({
  handleAvatarViewModalOpen,
  photoUrl,
}) => {
  const { loading, error, profile } = useSelector(
    (state: RootState) => state.profile
  );
  const dispatch = useDispatch<AppDispatch>();
  const formData = new FormData();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(photoUrl);
  const [openCrop, setOpenCrop] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploding, setUploading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setAvatarUrl(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  const handleImageUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    if (!file) {
      toast.error("Select an image");
      return;
    }

    try {
      const signedUrl: { url: string; media: string } = await getSignedUrl(
        "avatar",
        "jpeg"
      );

      const { url, media } = signedUrl;

      // Ensure the correct Content-Type is used
      const response = await axios.put(url, file, {
        headers: {
          "Content-Type": file.type, // Use the file's MIME type
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        // Update profile with the new avatar URL
        const updatedProfileData = {
          avatar: `https://s3.ap-south-1.amazonaws.com/bucket.chatme.use/${media}`,
        };
        dispatch(updateAvatar(updatedProfileData));
        toast.success("Avatar changed");
        setUploading(false);
        handleAvatarViewModalOpen();
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("There was a problem with the upload:", error);
      toast.error("Failed to upload image");
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-35"></div>

      {openCrop ? (
        <CropModal
          {...{ avatarUrl, setOpenCrop, setAvatarUrl, setFile, formData }}
        />
      ) : (
        <div
          data-theme={profile?.data.theme || "light"}
          className="fixed inset-0 z-40 flex justify-center items-center"
        >
          <div
            className="closeButton fixed w-auto h-auto top-5 right-5"
            onClick={handleAvatarViewModalOpen}
          >
            <span className="text-3xl text-white">x</span>
          </div>
          <div className="main-cover fixed z-50 w-[600px] h-[400px] bg-slate-50 rounded-md flex justify-center items-center">
            <form
              onSubmit={handleImageUpload}
              className="content-cover w-[80%] h-[80%] flex flex-col justify-center items-center"
            >
              <div className="avatars">
                <label htmlFor="avatar">
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="w-[200px] h-[200px] rounded-full"
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
                  {loading || uploding ? (
                    <ReactLoading
                      type={"bubbles"}
                      color={"#fff"}
                      height={"20%"}
                      width={"20%"}
                    />
                  ) : (
                    "Change"
                  )}
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
