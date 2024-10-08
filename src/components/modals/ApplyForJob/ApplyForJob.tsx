/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { darkTheme, lightTheme } from "@/helper/theme";
import { RootState } from "@/redux/store";

import {
  Button,
  CircularProgress,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import {
  validateEmail,
  validateField,
  validateName,
  validatePhone,
} from "@/helper/validate";
import axios from "axios";
import { IJobApplication } from "@/types/IJob";
import { IJobs } from "@/redux/reducers/jobs/jobs";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";

interface ApplyForJobProps {
  setOpenApplyforJob: Dispatch<SetStateAction<boolean>>;
  job: IJobs;
}
const StyledQuill = styled(ReactQuill)`
  .ql-toolbar {
    background-color: #333;
    color: #fff;
  }

  .ql-toolbar .ql-picker {
    color: #fff;
  }

  .ql-toolbar .ql-formats button {
    color: #fff;
  }

  .ql-toolbar .ql-formats button svg {
    fill: #fff;
  }

  .ql-toolbar .ql-formats button:hover svg,
  .ql-toolbar .ql-formats button.ql-active svg {
    fill: #000;
    background-color: #fff;
  }

  .ql-editor::before {
    color: #ccc;
    font-style: italic;
  }

  .ql-container {
    color: white;
  }
`;
const ApplyForJob: FC<ApplyForJobProps> = ({ setOpenApplyforJob, job }) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  //Local states
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: profile?.data.email,
    name: profile?.data.name || "",
    phone: profile?.data.bio?.phone || "",
  });
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

  const handleClose = () => {
    setOpenApplyforJob(false);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      const formJson = Object.fromEntries((formData as any).entries());
      const { name, phone, email, resume } = formJson;
      if (!validateName(name)) {
        toast.error("Enter a proper Full name");
        setLoading(false);
        return;
      }
      if (!validatePhone(phone)) {
        toast.error("Enter a valid Phone number");
        setLoading(false);
        return;
      }
      if (!validateEmail(email)) {
        toast.error("Enter a valid email");
        setLoading(false);
        return;
      }
      if (!validateField(coverLetter)) {
        toast.error("Enter a proper cover letter");
        setLoading(false);
        return;
      }
      if (!validateField(resume)) {
        toast.error("Select a resume");
        setLoading(false);
        return;
      }

      const data: IJobApplication = {
        name,
        email,
        coverLetter,
        jobId: job?._id,
        phone,
        resume,
      };

      const response = await axios.post(`${URL}/job/apply/job`, data, config);
      if (response.status === 201) {
        toast.success("Succefully applied");
        setLoading(false);
        handleClose();
      } else {
        toast.error("Server busy Please try again");
        setLoading(false);
        handleClose();
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error("Please try again!");
      setLoading(false);
    }
  };
  return (
    <ThemeProvider
      theme={profile?.data.theme === "dark" ? darkTheme : lightTheme}
    >
      <CssBaseline />
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle align="center">Apply for Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide requested details to Send your application
            <p className="text-xs text-blue-400">
              We recomend you to also send a personal mail to the company with
              resume.
            </p>
          </DialogContentText>
          <div className="w-[330px] mt-2 sm:w-full h-[500px] overflow-y-auto">
            <TextField
              style={{ marginBottom: "1rem" }}
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
              variant="filled"
            />
            <TextField
              style={{ marginBottom: "1rem" }}
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
              variant="filled"
            />
            <TextField
              style={{ marginBottom: "1rem" }}
              onChange={handleChange}
              value={formData.email}
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="filled"
            />
            <label htmlFor="">Cover Letter</label>
            {profile?.data.theme === "dark" ? (
              <StyledQuill
                theme="snow"
                value={coverLetter}
                onChange={setCoverLetter}
                placeholder="Write a attractive cover letter"
                style={{
                  marginBottom: "3rem",
                  height: "330px",
                  color: "white",
                }}
              />
            ) : (
              <ReactQuill
                theme="snow"
                value={coverLetter}
                onChange={setCoverLetter}
                placeholder="Write a attractive cover letter"
                style={{
                  marginBottom: "3rem",
                  height: "330px",
                  color: "white",
                }}
              />
            )}
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id="resume-label">Select a Resume</InputLabel>
              <Select
                required
                labelId="resume-label"
                id="resume"
                label="Select a Resume"
                name="resume"
              >
                {profile?.data.bio.resume &&
                profile?.data.bio.resume.length > 0 ? (
                  profile.data.bio.resume.map((resume, index) => (
                    <MenuItem key={index} value={String(resume.doc)}>
                      {resume.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">No resume found</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">
            {loading ? <CircularProgress /> : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ApplyForJob;
