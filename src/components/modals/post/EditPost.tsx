/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

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
import { getFileExtension } from "../../../helper/getExtention";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { IPosts } from "../../../types/IPosts";
import { updateError } from "../../../redux/reducers/posts/userPosts";
import { validateField } from "../../../helper/validate";
import { editPost } from "../../../redux/actions/posts/userPostsAction";
import { darkTheme, lightTheme } from "@/helper/theme";

interface EditPostProps {
  post: IPosts;
  setOpenEditPost: Dispatch<SetStateAction<boolean>>;
}
export const EditPost: React.FC<EditPostProps> = ({
  post,
  setOpenEditPost,
}) => {
  const { error } = useSelector((state: RootState) => state.userPosts);
  const { profile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const handleClose = () => {
    setOpenEditPost(false);
  };

  const [content, setContent] = useState(String(post.content));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateError(null));
    try {
      const formData = new FormData(e.currentTarget);
      const formJson = Object.fromEntries((formData as any).entries());

      if (!validateField(formJson.content)) {
        toast.error("Caption is required");
        return;
      }

      const createPostData = {
        _id: String(post._id),
        content: formJson.content,
      };
      dispatch(editPost(createPostData));
      toast.success("Post Edited");
      setOpenEditPost(false);
    } catch (error) {
      console.error("There was a problem with the upload:", error);
      toast.error("Failed to edit post");
    }
  };
  const [isVideo, setIsVideo] = useState(false);
  useEffect(() => {
    setIsVideo(false);
    if (getFileExtension(String(post.media)) !== "jpeg") {
      setIsVideo(true);
    }
  }, []);
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
          <DialogTitle align="center">Edit Post</DialogTitle>
          <DialogContent>
            <div className="w-full h-[350px] border-dashed border-[.4px] border-gray-400 rounded-lg mb-3 items-center flex flex-col justify-center">
              {!isVideo ? (
                <img
                  className="w-[300px] h-[300px] object-contain"
                  src={post.media}
                  alt="draging"
                />
              ) : (
                <video
                  controls
                  muted
                  preload="auto"
                  className="w-[300px] h-[300px] object-cover"
                  src={post.media}
                ></video>
              )}
            </div>
            <TextField
              onChange={handleChange}
              value={content}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Edit
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};
