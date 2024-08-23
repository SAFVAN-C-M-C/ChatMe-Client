/* eslint-disable @typescript-eslint/no-explicit-any */
import { capitalizeString } from "@/_lib/util/capitalizeString";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { blockUser, unBlockUser } from "@/redux/actions/admin/adminUserAction";
import { AppDispatch, RootState } from "@/redux/store";
import { UserDetails } from "@/types/IProfile";
import { styled, TableCell, tableCellClasses, TableRow } from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface UserRowProps {
  slno: number;
  row: any;
}
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
const UserRow: FC<UserRowProps> = ({ row, slno }) => {
  const { error } = useSelector((state: RootState) => state.adminUser);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const dispatch = useDispatch<AppDispatch>();
  const handleBlock = (userId: string) => {
    const formData = {
      userId: userId,
      isBlocked: true,
      type: "user",
    };
    dispatch(blockUser(formData));
    if (!error) {
      toast.success("Blocked");
    }
  };
  const handleUnBlock = (userId: string) => {
    const formData = {
      userId: userId,
      isBlocked: false,
      type: "user",
    };
    dispatch(unBlockUser(formData));
    if (!error) {
      toast.success("UnBlocked");
    }
  };
  const [user, setUser] = useState<UserDetails | null>(null);
  const getUser = async (userId: string) => {
    try {
      try {
        const res = await axios.get(
          `${URL}/profile/get/user/${userId}`,
          config
        );
        if (res.status === 200) {
          setUser(res.data.data);
        }
      } catch (error: any) {
        console.log("Somthing wrong", error.message);
      }
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  };
  useEffect(() => {
    if (row.userId) {
      getUser(row.userId);
    }
  }, [row.userId]);
  return (
    <>
      <StyledTableRow>
        <StyledTableCell align="center">{slno}</StyledTableCell>
        <StyledTableCell align="left">
          <div className="flex items-center justify-start gap-2">
            <img
              src={user?.avatar ? user.avatar : "/general/ChatMe-profile.png"}
              className="rounded-full w-10"
            />
            {row?.name}
          </div>
        </StyledTableCell>
        <StyledTableCell align="center">{user?.email}</StyledTableCell>
        <StyledTableCell align="center">
          {capitalizeString(String(user?.accountType))}
        </StyledTableCell>
        <StyledTableCell align="center">
          {row.numberOfReportActions}
        </StyledTableCell>
        <StyledTableCell align="center">
          {row.isBlocked ? (
            <button
              onClick={() => handleUnBlock(String(row.userId))}
              className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-red-700"
            >
              UnBlock
            </button>
          ) : (
            <button
              onClick={() => handleBlock(String(row.userId))}
              className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
            >
              Block
            </button>
          )}
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default UserRow;
