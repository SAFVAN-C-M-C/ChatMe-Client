/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { validateField } from "@/helper/validate";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "@/helper/theme";

interface AddNotificationModalProps {
  setOpenAddNotificationModal: Dispatch<SetStateAction<boolean>>;
  getNotification: () => Promise<void>;
}
const AddNotificationModal: FC<AddNotificationModalProps> = ({
  setOpenAddNotificationModal,
  getNotification,
}) => {
  const { error, profile } = useSelector((state: RootState) => state.profile);
  const handleClose = () => {
    setOpenAddNotificationModal(false);
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

      if (!validateField(formJson.title)) {
        toast.error("Enter a proper Title");
        return;
      }
      if (!validateField(formJson.content)) {
        toast.error("Enter a proper description");
        return;
      }

      const res = await axios.post(
        `${URL}/notification/send`,
        formJson,
        config
      );
      if (res.status === 200) {
        toast.success("Job Created");
        getNotification();
        handleClose();
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error("Something went wrong");
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
          <DialogTitle align="center">Create New Notification</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add System Notification Details
            </DialogContentText>
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
      </ThemeProvider>
    </>
  );
};

export default AddNotificationModal;
