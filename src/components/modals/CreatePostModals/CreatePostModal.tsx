/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import toast from "react-hot-toast";
import { getSignedUrl } from "../../../services";
import axios from "axios";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { CreatePostCredentials } from "../../../types/IPosts";
import { updateError } from "../../../redux/reducers/posts/userPosts";
import { createPosts } from "../../../redux/actions/posts/userPostsAction";
import { validateField } from "../../../helper/validate";
import { getHomePosts } from "@/redux/actions/posts/homePostsActions";
import { darkTheme, lightTheme } from "@/helper/theme";

interface CreatePostModalProps {
  file: File;
  setPreview: Dispatch<SetStateAction<string | undefined>>;
  setFile: Dispatch<SetStateAction<File | null>>;
  setOpenSelectFileModal: Dispatch<SetStateAction<boolean>>;
  preview?: string;
  setOpenCreatePostModal: Dispatch<SetStateAction<boolean>>;
}
export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  file,
  setFile,
  setPreview,
  setOpenCreatePostModal,
  setOpenSelectFileModal,
  preview,
}) => {
  const { profile, error } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const handleClose = () => {
    setOpenCreatePostModal(false);
  };
  const [uploding, setUploading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateError(null));
    setUploading(true);
    if (!file) {
      toast.error("Select an image");
      return;
    }
    const type = file.type.split("/")[0] !== "video" ? "jpeg" : "mp4";
    try {
      const formData = new FormData(e.currentTarget);
      const formJson = Object.fromEntries((formData as any).entries());
      if (!validateField(formJson.content)) {
        toast.error("Caption is required");
        return;
      }
      let tags: string[] = [];
      if (validateField(formJson.tags)) {
        tags = formJson.tags.split("#");
      }
      const signedUrl: { url: string; media: string } = await getSignedUrl(
        "post",
        type
      );

      const { url, media } = signedUrl;

      // Ensure the correct Content-Type is used
      const response = await axios.put(url, file, {
        headers: {
          "Content-Type":
            file.type.split("/")[0] !== "video" ? "image/jpeg" : "video/mp4", // Use the file's MIME type
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        // Update profile with the new avatar URL
        const createPostData: CreatePostCredentials = {
          name: profile?.data.name,
          media: `https://s3.ap-south-1.amazonaws.com/bucket.chatme.use/${media}`,
          content: formJson.content,
          userAvatar: String(profile?.data.bio.avatar),
          tags,
        };
        dispatch(createPosts(createPostData));
        dispatch(getHomePosts());
        toast.success("Post Created");
        setUploading(false);
        setOpenSelectFileModal(false);
        setOpenCreatePostModal(false);
        setFile(null);
        setPreview("/general/drag_img.png");
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
      <ThemeProvider
        theme={profile?.data.theme === "dark" ? darkTheme : lightTheme}
      >
        <CssBaseline />
        <Dialog
          fullWidth={true}
          open
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle align="center">Create New Post</DialogTitle>
          <DialogContent>
            <div className="w-full h-[350px] border-dashed border-[.4px] border-gray-400 rounded-lg mb-3 items-center flex flex-col justify-center">
              {file.type.split("/")[0] !== "video" ? (
                <img
                  className="w-[300px] h-[300px] object-contain"
                  src={preview}
                  alt="draging"
                />
              ) : (
                <video
                  controls
                  muted
                  preload="auto"
                  className="w-[300px] h-[300px] object-cover"
                  src={preview}
                ></video>
              )}
            </div>
            <TextField
              autoFocus
              required
              margin="dense"
              id="content"
              name="content"
              placeholder="Enter a good caption"
              label="Enter a Caption"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="tags"
              name="tags"
              placeholder="Enter a good tags"
              label="Enter a tags"
              type="text"
              fullWidth
              variant="standard"
            />
            <p className="text-sm text-blue-600">
              Enter new tag with a '#' without space.It will help to find your
              post more easly
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {!uploding ? (
              <Button
                type="submit"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
            ) : (
              "Uploading..."
            )}
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};
