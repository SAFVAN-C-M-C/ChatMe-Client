/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { validateField, validateName, validatePhone } from "../../helper/validate";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {  updateBio } from "../../redux/actions/user/profileActions";
import { BioDetails } from "../../types/IProfile";

interface RecruiterBioEditModalProps {
  setOpenEditBio: Dispatch<SetStateAction<boolean>>;
}
const RecruiterBioEditModal: React.FC<RecruiterBioEditModalProps> = ({ setOpenEditBio }) => {
  const { profile, error } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => {
    setOpenEditBio(false);
  };

  const [formData, setFormData] = useState({
    email: profile?.data.email,
    name: profile?.data.name || "",
    location: profile?.data.bio?.location || "",
    phone: profile?.data.bio?.phone || "",
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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      const data: BioDetails = {
        name: formJson.name,
        bio: {
          location: formJson.location,
          phone: formJson.phone,
        },
      };


    
    dispatch(updateBio(data));
    if (!error) {
      toast.success("Profile Updated");
      handleClose();
    }
  };
  return (
    <>
      <Dialog
        open
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Edit Bio</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RecruiterBioEditModal;
