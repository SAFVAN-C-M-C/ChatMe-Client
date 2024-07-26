/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { validateField } from "@/helper/validate";

interface AddNotificationModalProps {
    setOpenAddNotificationModal: Dispatch<SetStateAction<boolean>>;
    getNotification:()=>Promise<void>
  }
const AddNotificationModal:FC<AddNotificationModalProps> = ({setOpenAddNotificationModal,getNotification}) => {
    const { error,profile } = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch<AppDispatch>();
    const handleClose = () => {
        setOpenAddNotificationModal(false);
    };
    useEffect(() => {
      if (error) {
        toast.error(error);
      }
    }, [error]);
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        
        
        
        
        if(!validateField(formJson.title)){
          toast.error("Enter a proper Title");
          return;
        }
        if(!validateField(formJson.content)){
          toast.error("Enter a proper description");
          return;
        }
        
        
            const res= await axios.post(`${URL}/notification/send`,formJson,config)
        if(res.status===200){
          toast.success("Job Created")
          getNotification()
          handleClose()
        }
      } catch (error:any) {
        console.log(error.message);
        toast.error("Something went wrong")
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
        <DialogTitle align="center">Create New Notification</DialogTitle>
        <DialogContent>
          <DialogContentText>Add System Notification Details</DialogContentText>
          <TextField
          placeholder="Enter a proper Notification Title"
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Notification title"
            type="text"
            fullWidth
          />

          <TextField
            placeholder="Enter a detailed content"
            required
            autoFocus
            multiline
            maxRows={4}
            rows={4}
            margin="dense"
            id="content"
            name="content"
            label="Notification Message"
            type="text"
            fullWidth
          />
         

          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddNotificationModal