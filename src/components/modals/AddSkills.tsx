/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { validateField } from "../../helper/validate";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addSkills } from "../../redux/actions/user/profileActions";
import { darkTheme, lightTheme } from "@/helper/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

interface AddSkillsProps {
  setOpenAddSkills: Dispatch<SetStateAction<boolean>>;
}
const AddSkills: React.FC<AddSkillsProps> = ({ setOpenAddSkills }) => {
  const { profile, error } = useSelector((state: RootState) => state.profile);
  const [skills, setSkills] = useState(
    String(profile?.data.skills?.join(",")) || ""
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => {
    setOpenAddSkills(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkills(e.target.value);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());

    if (!validateField(formJson.skills)) {
      toast.error("Skill can't be empty string");
      return;
    }
    const data = {
      skills: formJson.skills,
    };
    dispatch(addSkills(data));
    if (!error) {
      toast.success("Skills added");
      handleClose();
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
          <DialogTitle>Add Education</DialogTitle>
          <DialogContent>
            <DialogContentText>
              List all your Top skills. Note that skill should be seperated by
              comma ',' .
            </DialogContentText>
            <TextField
              onChange={handleChange}
              value={skills}
              autoFocus
              required
              margin="dense"
              id="skills"
              name="skills"
              label="Skills"
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
      </ThemeProvider>
    </>
  );
};

export default AddSkills;
