import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { formatDate } from "@/helper/formateDate";
import { darkTheme, lightTheme } from "@/helper/theme";
import { RootState } from "@/redux/store";
import { IJobApplicationFromBackend } from "@/types/IJob";
import { UserDetails } from "@/types/IProfile";
import {
  Box,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";


interface ViewApplicationModalProp {
  application: IJobApplicationFromBackend;
  setOpenViewApplicationModal: Dispatch<SetStateAction<boolean>>;
  user: UserDetails;
  fetchApplications: () => Promise<void>;
}
const ViewApplicationModal: FC<ViewApplicationModalProp> = ({
  setOpenViewApplicationModal,
  application,
  user,
  fetchApplications,
}) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const [status, setStatus] = useState(application.status || "applied");
  const handleClose = () => {
    setOpenViewApplicationModal(false);
  };
  const handleChangeStatus = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
  };
  useEffect(() => {
    const updateStatus = async (applicationId: string) => {
      try {
        const formData = new FormData();
        formData.append("jobId", String(application.jobId));
        formData.append("status", status);
        const response = await axios.put(
          `${URL}/job/applications/update/${applicationId}`,
          formData,
          config
        );
        if (response.status === 200) {
          fetchApplications();
        }
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };
    updateStatus(String(application._id));
  }, [status]);
  return (
    <>
      <ThemeProvider
        theme={profile?.data.theme === "dark" ? darkTheme : lightTheme}
      >
        <CssBaseline />
        <Dialog fullWidth={true} maxWidth={"md"} open onClose={handleClose}>
          <DialogTitle align="center">{user.name}</DialogTitle>
          <DialogContent>
            <div className="w-full h-[300px] lg:h-[500px]">
              <div className="name">
                Name: <span className="font-semibold">{application.name}</span>
              </div>
              <div className="email">
                Email:{" "}
                <span className="font-semibold">{application.email}</span>
              </div>
              <div className="phone">
                Phone:{" "}
                <span className="font-semibold">{application.phone}</span>
              </div>
              <div className="applied-at">
                Applied on:{" "}
                <span className="font-semibold">
                  {formatDate(application.createdAt)}
                </span>
              </div>
              <div className="w-full border-dashed border-[1px] rounded-md">
                <Box>
                  <span className="font-semibold">Cover Letter:</span>
                  <Typography
                    variant="body1"
                    component="div"
                    dangerouslySetInnerHTML={{
                      __html: application.coverLetter,
                    }}
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                </Box>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <a href={application.resume} target="_blank">
              View Resume
            </a>
            <Select value={status} onChange={handleChangeStatus}>
              <MenuItem selected value={"applied"}>
                Applied
              </MenuItem>
              <MenuItem value={"reviewed"}>Reviewed</MenuItem>
              <MenuItem value={"rejected"}>Rejected</MenuItem>
              <MenuItem value={"accepted"}>Accepted</MenuItem>
            </Select>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default ViewApplicationModal;
