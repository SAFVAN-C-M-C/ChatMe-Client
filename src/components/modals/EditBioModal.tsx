/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  validateField,
  validateName,
  validatePhone,
} from "../../helper/validate";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../redux/actions/user/profileActions";
import { BioDetails } from "../../types/IProfile";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "@/helper/theme";
import { getSignedUrl } from "@/services";
import axios from "axios";

interface EditBioModalProps {
  setOpenEditBio: Dispatch<SetStateAction<boolean>>;
}
const EditBioModal: React.FC<EditBioModalProps> = ({ setOpenEditBio }) => {
  const { profile, error } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => {
    setOpenEditBio(false);
  };
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    email: profile?.data.email,
    name: profile?.data.name || "",
    location: profile?.data.bio?.location || "",
    phone: profile?.data.bio?.phone || "",
    title: profile?.data.title || "",
  });
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
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
  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };
  const handleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries((formData as any).entries());
      console.log(formJson);

      if (!validatePhone(formJson?.phone)) {
        toast.error("Enter proper phone number");
        return;
      }
      if (!validateName(formJson?.name)) {
        toast.error("Enter proper Name");
        return;
      }
      if (!validateField(formJson?.location)) {
        toast.error("Enter a valid location ");
        return;
      }
      if (!validateField(formJson?.title)) {
        toast.error("Enter title can't be blank");
        return;
      }

      if (file) {
        console.log(file);
        const type=file.type.split("/")[0] === "application"?"pdf":"jpg"
        const signedUrl: { url: string; media: string } = await getSignedUrl("doc",type);
        console.log(signedUrl);
        const { url, media } = signedUrl;
        const res = await axios.put(url, file, {
          headers: {
            "Content-Type":file.type.split("/")[0] === "application"?"application/pdf":"image/jpeg", // Use the file's MIME type
          },
          withCredentials: true,
        });
        if(res.status===200){
          console.log("file uploaded successfully");
          const data: BioDetails = {
            name: formJson.name,
            title: formJson.title,
            bio: {
              location: formJson.location,
              phone: formJson.phone,
              resume:`https://s3.ap-south-1.amazonaws.com/bucket.chatme.use/${media}`
            },
          };
    
          dispatch(updateBio(data));
        }
      } else {
        const data: BioDetails = {
          name: formJson.name,
          title: formJson.title,
          bio: {
            location: formJson.location,
            phone: formJson.phone,
          },
        };
  
        dispatch(updateBio(data));
      }
      
      if (!error) {
        toast.success("Profile Updated");
        handleClose();
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error("Please try again!");
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
          <DialogTitle align="center">Edit Bio</DialogTitle>
          <DialogContent>
            <TextField
              onChange={handleChange}
              value={formData.name}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Full Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              onChange={handleChange}
              value={formData.email}
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="email"
              disabled
              fullWidth
              variant="standard"
            />
            <TextField
              onChange={handleChange}
              value={formData.title}
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              onChange={handleChange}
              value={formData.location}
              autoFocus
              required
              margin="dense"
              id="location"
              name="location"
              label="Location"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              onChange={handleChange}
              value={formData.phone}
              autoFocus
              required
              margin="dense"
              id="phone"
              name="phone"
              label="Phone"
              type="text"
              fullWidth
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

export default EditBioModal;
