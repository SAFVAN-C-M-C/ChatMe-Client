/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { validateField  } from "../../helper/validate";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {  addPreferedJobs } from "../../redux/actions/user/profileActions";

interface AddPreferedJobsProps{
    setOpenAddPreferedJobs: Dispatch<SetStateAction<boolean>>;
}
const AddPreferedJobs:React.FC<AddPreferedJobsProps> = ({setOpenAddPreferedJobs}) => {
    const { profile,error } = useSelector((state: RootState) => state.profile);
    const [preferedJobs,setpreferedJobs]=useState(String(profile?.data.preferedJobs?.join(",")) || "")
  const dispatch = useDispatch<AppDispatch>();
      const handleClose = () => {
        setOpenAddPreferedJobs(false);
      };
      const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setpreferedJobs(e.target.value);
      }
      useEffect(() => {
        if (error) {
          toast.error(error);
        }
      }, [error]);
      const handleSubmit=(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        
        if(!validateField(formJson.preferedJobs)){
            toast.error("Skill can't be empty string");
            return;
        }
        const data={
            preferedJobs:formJson.preferedJobs
        }
        dispatch(addPreferedJobs(data))
        if(!error){
            toast.success("Skills added")
            handleClose();
        }
      }
  return (
    <>
      <Dialog
        open
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit

        }}
      >
        <DialogTitle>Add Education</DialogTitle>
        <DialogContent>
          <DialogContentText>
            List all your Top skills. Note that skill should be seperated by comma ',' .
          </DialogContentText>
          <TextField
          onChange={handleChange}
            value={preferedJobs}
            autoFocus
            required
            margin="dense"
            id="preferedJobs"
            name="preferedJobs"
            label="Prefered Jobs"
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

export default AddPreferedJobs;
