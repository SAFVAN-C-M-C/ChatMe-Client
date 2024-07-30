/* eslint-disable @typescript-eslint/no-explicit-any */
import { verifyCompany } from "@/redux/actions/admin/adminCompanyRequestAction";
import { verifyRecruiter } from "@/redux/actions/admin/adminRecruiterRequestAction";
import { AppDispatch, RootState } from "@/redux/store";
import { styled, TableCell, tableCellClasses, TableRow } from "@mui/material";
import React, { FC, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface CompanyRequestRowProps {
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
const CompanyRequestRow: FC<CompanyRequestRowProps> = ({ row, slno }) => {
  const { error } = useSelector(
    (state: RootState) => state.adminRecruiterRequest
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const dispatch = useDispatch<AppDispatch>();
  const handleVerify = (email?: string) => {
    const formData = {
      email: email,
      isVerified: true,
      type: "company",
    };
    dispatch(verifyCompany(formData));
    if (!error) {
      toast.success("Verified");
    }
  };
  return (
    <>
      <StyledTableRow>
        <StyledTableCell align="center">{slno}</StyledTableCell>
        <StyledTableCell align="center">{row?.name}</StyledTableCell>
        <StyledTableCell align="center">{row?.email}</StyledTableCell>
        <StyledTableCell align="center">{""}</StyledTableCell>
        <StyledTableCell align="center">
          <button
            onClick={() => handleVerify(row?.email)}
            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-red-700"
          >
            Verify
          </button>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default CompanyRequestRow;
