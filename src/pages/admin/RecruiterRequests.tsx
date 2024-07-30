import  { useEffect } from "react";
import NavBar from "../../components/admin/NavBar";
import {  RootState } from "../../redux/store";
import {  useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
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
import RecruiterRequestRow from "@/components/admin/UserTable/RecruiterRequestRow";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
function RecruiterRequests() {
  const { adminRecruiterRequests, error } = useSelector(
    (state: RootState) => state.adminRecruiterRequest
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <div className="flex" data-theme={"dark"}>
        <NavBar />
        <div className="main-cover w-full   flex flex-col  ml-5 mr-10">
          <div className="greeting ml-14 mt-10 mb-10 felx">
            <span className="text-3xl font-bold underline">
              Recruiter Requests
            </span>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Sl.no</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminRecruiterRequests?.data.map((row, id) => (
                  <RecruiterRequestRow key={id} slno={id + 1} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default RecruiterRequests;

// <tr key={id} className="border-b">
//                   <td className="py-2 px-4 text-center">{user?.name}</td>
//                   <td className="py-2 px-4 text-center">{user?.email}</td>

//                   <td className="py-2 px-4 text-center">

                      // <button
                      //   onClick={() => handleVerify(user.email)}
                      //   className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-red-700"
                      // >
                      //   Verify
                      // </button>

//                   </td>
//                 </tr>
