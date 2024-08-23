import NavBar from "@/components/admin/NavBar";
import ReportsRow from "@/components/Reports/ReportsRow";
import { getReports } from "@/redux/actions/admin/adminReportAction";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Pagination,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const Reports = () => {
  const { adminReport } = useSelector((state: RootState) => state.adminReport);
  const dispatch = useDispatch<AppDispatch>();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setCurrentPage(value);
  };
  useEffect(() => {
    dispatch(getReports({ page: currentPage }));
    if (adminReport?.totalPages) {
      setTotalPages(adminReport.totalPages);
    }
    if (adminReport?.currentPage) {
      setCurrentPage(adminReport.currentPage);
    }
  }, [
    adminReport?.currentPage,
    adminReport?.totalPages,
    currentPage,
    dispatch,
  ]);
  return (
    <>
      <div className="flex" data-theme={"dark"}>
        <NavBar />
        <div className="main-cover w-full   flex flex-col  ml-5 mr-10">
          <div className="greeting ml-14 mt-10 mb-10 felx">
            <span className="text-3xl font-bold underline">Reports</span>
          </div>
          {adminReport?.data ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Sl.no</StyledTableCell>
                      <StyledTableCell align="center">Post</StyledTableCell>
                      <StyledTableCell align="center">Suspect</StyledTableCell>
                      <StyledTableCell align="center">Reason</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adminReport?.data.map((row, index) => (
                      <ReportsRow key={index} slno={index + 1} report={row} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="w-full flex justify-end m-3">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  sx={{ "& .MuiPaginationItem-root": { color: "white" } }} // Custom styling for pagination
                />
              </div>
            </>
          ) : (
            <span>No data</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Reports;

{
  /* <table className="w-full overflow-x-scroll ms-5 bg-white border my-4 border-gray-300">
<thead>
  <tr className="bg-gray-100">
    <th className="py-2 px-0 border-b">slno</th>
    <th className="py-2 px-0 border-b">PostId</th>
    <th className="py-2 px-0 border-b">UserId</th>
    <th className="py-2 px-0 border-b">SuspectedUserID</th>
    <th className="py-2 px-0 border-b">Reason</th>
    <th className="py-2 px-0 border-b">Actions</th>
  </tr>
</thead>
<tbody>
  {adminReport?.data.map((report, id) => (
    <ReportsRow key={id} slno={id+1} report={report}/>
  ))}
</tbody>
</table> */
}
