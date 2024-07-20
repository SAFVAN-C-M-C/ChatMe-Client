/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Textarea from "@mui/joy/Textarea";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { validateField } from "@/helper/validate";


interface CreateJobModalProps {
  setOpenCreateJobModal: Dispatch<SetStateAction<boolean>>;
}
const CreateJobModal: React.FC<CreateJobModalProps> = ({
  setOpenCreateJobModal,
}) => {
  const { error,profile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => {
    setOpenCreateJobModal(false);
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
      
      
      
      
      if(!validateField(formJson.jobTitle)){
        toast.error("Enter a proper Job Title");
        return;
      }
      if(!validateField(formJson.description)){
        toast.error("Enter a proper description");
        return;
      }
      if(!validateField(formJson.mode)){
        toast.error("Select a mode");
        return;
      }
      if(!validateField(formJson.skills)){
        toast.error("Skill can't be empty string");
        return;
      }
      if(!validateField(formJson.type)){
        toast.error("Select a type");
        return;
      }


        // companyId: string;
        // ?: string;

      
      formJson.companyId=profile?.data.companyDetails?.companyId
      formJson.skills=formJson?.skills.split(',')
      
      const res= await axios.post(`${URL}/job/`,formJson,config)
      if(res.status===200){
        toast.success("Job Created")
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
        <DialogTitle align="center">Create New Job</DialogTitle>
        <DialogContent>
          <DialogContentText>Add job details.</DialogContentText>
          <TextField
          placeholder="Enter a proper Job Title"
            autoFocus
            required
            margin="dense"
            id="jobTitle"
            name="jobTitle"
            label="Job title"
            type="text"
            fullWidth
          />

          <TextField
            placeholder="Enter a detailed description"
            required
            autoFocus
            multiline
            maxRows={4}
            rows={4}
            margin="dense"
            id="description"
            name="description"
            label="Job Description"
            type="text"
            fullWidth
          />
          <TextField
            placeholder="Enter all needed skills seperated by coma (,)"
            required
            autoFocus
            margin="dense"
            id="skills"
            name="skills"
            label="Skills"
            type="text"
            fullWidth
          />
      <FormControl fullWidth sx={{mt:1}}>
        <InputLabel id="mode-of-work-label">Mode of Work</InputLabel>
        <Select
          labelId="mode-of-work-label"
          id="mode"
          fullWidth
required
          label="Mode of Work"
name="mode"
        >

          <MenuItem value={"On-site"}>On-site</MenuItem>
          <MenuItem value={"remote"}>Remote</MenuItem>
          <MenuItem value={"hybrid"}>Hybrid</MenuItem>
        </Select>
        
      </FormControl>
      <FormControl fullWidth sx={{mt:1}} >
        <InputLabel id="demo-simple-select-helper-label">Job Type</InputLabel>
        <Select
        required
          labelId="job-type-label"
          id="type"
          label="Job Type"
          name="type"
        >
          
          <MenuItem value={"full-time"}>Full-time</MenuItem>
          <MenuItem value={"part-time"}>Part-time</MenuItem>
        </Select>
        
      </FormControl>

          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateJobModal;
