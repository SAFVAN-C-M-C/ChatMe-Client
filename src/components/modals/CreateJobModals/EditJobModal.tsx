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
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { validateField } from "@/helper/validate";
import { getJobs } from "@/redux/actions/jobs/jobAction";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IJobs } from "@/redux/reducers/jobs/jobs";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "@/helper/theme";
interface EditJobModalProps {
  setOpenEditJobModal: Dispatch<SetStateAction<boolean>>;
  job: IJobs | null;
  getJob: (jobId: string) => Promise<void>;
}

const EditJobModal: React.FC<EditJobModalProps> = ({
  setOpenEditJobModal,
  job,
  getJob,
}) => {
  const { error, profile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const [description, setDescription] = useState<string>(
    job?.description ? job.description : ""
  );
  const [jobTitle, setJobTitle] = useState<string>(
    job?.jobTitle ? job.jobTitle : ""
  );
  const [skill, setSkill] = useState<string>(
    job?.skills ? job.skills.join(",") : ""
  );
  const [mode, setMode] = useState<string>(job?.mode ? job.mode : "");
  const [type, seType] = useState<string>(job?.type ? job.type : "");

  const handleClose = () => {
    setOpenEditJobModal(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries((formData as any).entries());

      if (!validateField(formJson.jobTitle)) {
        toast.error("Enter a proper Job Title");
        return;
      }
      if (!validateField(description)) {
        toast.error("Enter a proper description");
        return;
      }
      if (!validateField(formJson.mode)) {
        toast.error("Select a mode");
        return;
      }
      if (!validateField(formJson.skills)) {
        toast.error("Skill can't be an empty string");
        return;
      }
      if (!validateField(formJson.type)) {
        toast.error("Select a type");
        return;
      }

      formJson.companyId = profile?.data.companyDetails?.companyId;
      formJson.skills = formJson?.skills.split(",");
      formJson.description = description;

      const res = await axios.post(
        `${URL}/job/edit/${job?._id}`,
        formJson,
        config
      );
      if (res.status === 200) {
        toast.success("Job updated");
        dispatch(getJobs({ filter: "all" }));
        getJob(String(job?._id));
        handleClose();
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  return (
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
        <DialogTitle align="center">Edit Job</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit job details.</DialogContentText>
          <TextField
            placeholder="Enter a proper Job Title"
            autoFocus
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
            margin="dense"
            id="jobTitle"
            name="jobTitle"
            label="Job title"
            type="text"
            fullWidth
          />
          <label htmlFor="">Description</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="Enter a detailed description"
            style={{ marginBottom: "1rem", height: "100px" }}
          />
          <TextField
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            style={{ marginTop: "3rem" }}
            placeholder="Enter all needed skills separated by commas (,)"
            required
            margin="dense"
            id="skills"
            name="skills"
            label="Skills"
            type="text"
            fullWidth
          />
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="mode-of-work-label">Mode of Work</InputLabel>
            <Select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
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
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="job-type-label">Job Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => seType(e.target.value)}
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
    </ThemeProvider>
  );
};

export default EditJobModal;
