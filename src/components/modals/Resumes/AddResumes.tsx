/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { validateField} from "@/helper/validate";
import {  addResume } from "@/redux/actions/user/profileActions";
import { darkTheme, lightTheme } from "@/helper/theme";
import axios from "axios";
import { getSignedUrl } from "@/services";
import { updateError } from "@/redux/reducers/profileSlice";

interface AddResumesProps {
  setOpenAddResumes: Dispatch<SetStateAction<boolean>>;
}
const AddResumes: React.FC<AddResumesProps> = ({ setOpenAddResumes }) => {
  const { error, profile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const [file, setFile] = useState<File | null>(null);
  const handleClose = () => {
    setOpenAddResumes(false);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      dispatch(updateError(null));
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries((formData as any).entries());
      if (!validateField(formJson.name)) {
        toast.error("Enter a valid Title");
        return;
      }
      if (!file) {
        toast.error("Select a file");
        return;
      }
      const type = file.type.split("/")[0] === "application" ? "pdf" : "jpg";
      const signedUrl: { url: string; media: string } = await getSignedUrl(
        "doc",
        type
      );
      console.log(signedUrl);
      const { url, media } = signedUrl;
      const res = await axios.put(url, file, {
        headers: {
          "Content-Type":
            file.type.split("/")[0] === "application"
              ? "application/pdf"
              : "image/jpeg", // Use the file's MIME type
        },
        withCredentials: true,
      });
      if (res.status === 200) {
        console.log("file uploaded successfully");
        const data = {
          name: formJson.name,
          doc: `https://s3.ap-south-1.amazonaws.com/bucket.chatme.use/${media}`,
        };

        dispatch(addResume(data));
      }

      if (!error) {
        toast.success("Resume added");
        handleClose();
      }
    } catch (error: any) {
      console.log("Something went wrong", error.message);
    }
  };
  return (
    <>
      <ThemeProvider
        theme={profile?.data.theme === "dark" ? darkTheme : lightTheme}
      >
        <CssBaseline />
        <Dialog
          open
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle align="center">Add Resume</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add your Tailored Resume. Note that this will not show in your
              profile.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Title of Resume"
              type="text"
              fullWidth
              placeholder="eg:python developer"
              variant="standard"
            />
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Select a Resume</span>
              </div>
              <input
                onChange={handleSelectFile}
                accept=".pdf"
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              />
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default AddResumes;
