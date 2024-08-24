/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { darkTheme, lightTheme } from "@/helper/theme";
import { RootState } from "@/redux/store";
import { IPosts } from "@/types/IPosts";
import {
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
interface SendReportModalProps {
  setOpenReport: Dispatch<SetStateAction<boolean>>;
  post: IPosts;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name: string, personName: string, theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const validReasons = ["spam", "hate"];

const SendReportModal: React.FC<SendReportModalProps> = ({
  setOpenReport,
  post,
}) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const theme = useTheme();

  //local state
  const [reasons, setReason] = useState("");
  const handleClose = () => {
    setOpenReport(false);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("suspectId", String(post.userId));
      formData.append("reason", reasons);
      formData.append("postId", String(post._id));
      const response = await axios.post(
        `${URL}/admin/report/`,
        formData,
        config
      );
      if (response.status === 200) {
        toast.success("Reported");
      }
    } catch (error: any) {
      console.error("something went wrong", error.message);
      toast.error("Please try again");
    }
  };
  const handleChange = (e: SelectChangeEvent<typeof reasons>) => {
    setReason(e.target.value);
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
          <DialogTitle>Report Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select a valid reason to report this post
            </DialogContentText>
            <div className="w-[400px]">
              <Select
                fullWidth
                displayEmpty
                value={reasons}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Placeholder</em>;
                  }

                  return selected;
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled value="">
                  <em>Placeholder</em>
                </MenuItem>
                {validReasons.map((val) => (
                  <MenuItem
                    key={val}
                    value={val}
                    style={getStyles(val, reasons, theme)}
                  >
                    {val}
                  </MenuItem>
                ))}
              </Select>
            </div>
            {/* <p className="text-xs text-red-500">
        Note: if your curently under the course please enter present as end year
        </p> */}
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

export default SendReportModal;
