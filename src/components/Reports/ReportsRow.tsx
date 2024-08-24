/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import {
  deleteReport,
  reportAction,
} from "@/redux/actions/admin/adminReportAction";
import { blockUser } from "@/redux/actions/admin/adminUserAction";
import { AppDispatch } from "@/redux/store";
import { IReport } from "@/types/IReport";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ViewPost } from "./ViewPost";
import { IPosts } from "@/types/IPosts";
import { UserDetails } from "@/types/IProfile";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface ReportProps {
  report: IReport | null;
  slno: number;
}
const ReportsRow: React.FC<ReportProps> = ({ report, slno }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openViewPost, setOpenViewPost] = useState(false);
  const [action, setAction] = useState("select");
  const handleChange = (e: SelectChangeEvent) => {
    e.preventDefault();
    setAction(e.target.value as string);
  };

  const handlePostView = () => {
    setOpenViewPost(true);
  };
  const [post, setPost] = useState<IPosts | null>(null);

  const [user, setUser] = useState<UserDetails | null>(null);
  const getUser = async (userId: string) => {
    try {
      const res = await axios.get(`${URL}/profile/get/user/${userId}`, config);
      if (res.status === 200) {
        setUser(res.data.data);
      }
    } catch (error: any) {
      setUser(null);
    }
  };
  useEffect(() => {
    if (report?.suspectId) {
      getUser(report.suspectId);
    }
  }, [report?.suspectId]);
  useEffect(() => {
    const getPost = async (postId: string) => {
      try {
        const response = await axios.get(`${URL}/post/posts/${postId}`, config);

        if (response.status === 200) {
          setPost(response.data.data as IPosts);
        }
      } catch (error: any) {
        setPost(null);
      }
    };
    if (report?.postId) {
      getPost(String(report.postId));
    }
  }, [post, report?.postId]);
  useEffect(() => {
    const deletePost = async (id: string) => {
      const res = await axios.put(`${URL}/post/delete/${id}`, config);
      if (res.status === 200) {
        dispatch(
          reportAction({
            reportId: String(report?._id),
            userId: String(report?.suspectId),
          })
        );
        toast.success("User blocked succefully");
      }
    };
    if (action === "deletePost") {
      deletePost(String(report?.postId));
      return;
    } else if (action === "block") {
      dispatch(
        blockUser({
          isBlocked: true,
          type: "user",
          userId: String(report?.suspectId),
        })
      );
      dispatch(
        reportAction({
          reportId: String(report?._id),
          userId: String(report?.suspectId),
        })
      );
      toast.success("User blocked succefully");
      return;
    } else if (action === "delete") {
      dispatch(deleteReport({ id: String(report?._id) }));
      toast.success("Report succefully deleted");
      return;
    }
  }, [action, dispatch, report?._id, report?.postId, report?.suspectId]);
  return (
    <>
      {openViewPost ? (
        <ViewPost setOpenViewPost={setOpenViewPost} post={post} />
      ) : null}
      <StyledTableRow>
        <StyledTableCell align="center">{slno}</StyledTableCell>
        <StyledTableCell align="center" onClick={handlePostView}>
          <span className="cursor-pointer">View Post</span>
        </StyledTableCell>
        <StyledTableCell align="center">{user?.name}</StyledTableCell>
        <StyledTableCell align="center">{report?.reason}</StyledTableCell>
        <StyledTableCell align="center">
          <Select fullWidth value={action} onChange={handleChange}>
            <MenuItem selected value={"select"}>
              Select Action
            </MenuItem>
            <MenuItem value={"deletePost"}>Delete Post</MenuItem>
            <MenuItem value={"block"}>Block User</MenuItem>
            <MenuItem value={"delete"}>Delete Report</MenuItem>
          </Select>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default ReportsRow;
