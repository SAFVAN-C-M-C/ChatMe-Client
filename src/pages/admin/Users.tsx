import React, { useEffect, useState } from "react";
import NavBar from "../../components/admin/NavBar";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAdminUsersDetails } from "../../redux/actions/admin/adminUserAction";
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
import UserRow from "@/components/admin/UserTable/UserRow";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Users = () => {
  const { adminUser, error } = useSelector(
    (state: RootState) => state.adminUser
  );
  const dispatch = useDispatch<AppDispatch>();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setCurrentPage(value);
  };
  useEffect(() => {
    dispatch(getAdminUsersDetails({ page: currentPage }));
    if (adminUser?.totalPages) {
      setTotalPages(adminUser.totalPages);
    }
    if (adminUser?.currentPage) {
      setCurrentPage(adminUser.currentPage);
    }
  }, [adminUser?.currentPage, adminUser?.totalPages, currentPage, dispatch]);
  return (
    <>
      <div className="flex" data-theme={"dark"}>
        <NavBar />
        <div className="main-cover w-full   flex flex-col  ml-5 mr-10">
          <div className="greeting ml-14 mt-10 mb-10 felx">
            <span className="text-3xl font-bold underline">Users</span>
          </div>
          {adminUser?.data ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Sl.no</StyledTableCell>
                      <StyledTableCell align="center">Name</StyledTableCell>
                      <StyledTableCell align="center">Email</StyledTableCell>
                      <StyledTableCell align="center">Type</StyledTableCell>
                      <StyledTableCell align="center">
                        No.of Action
                      </StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adminUser.data.map((row, index) => (
                      <UserRow slno={index + 1} row={row} key={index} />
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

export default Users;
{
  /* <table className="w-full overflow-x-scroll ms-5 bg-white border my-4 border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-0 border-b">Slno</th>
                  <th className="py-2 px-0 border-b">Name</th>
                  <th className="py-2 px-0 border-b">Email</th>
                  <th className="py-2 px-0 border-b">No.of Actions</th>
                  <th className="py-2 px-0 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminUser?.data.map((user, id) => (
                  <tr key={id} className="border-b">
                    <td className="py-2 px-4 text-center">{id+1}</td>
                    <td className="py-2 px-4 text-center">{user?.name}</td>
                    <td className="py-2 px-4 text-center">{user?.email}</td>
                    <td className="py-2 px-4 text-center">
                      {user?.numberOfReportActions}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {user.isBlocked ? (
                        <button
                          onClick={() => handleUnBlock(String(user.userId))}
                          className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-red-700"
                        >
                          UnBlock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlock(String(user.userId))}
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                        >
                          Block
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */
}
