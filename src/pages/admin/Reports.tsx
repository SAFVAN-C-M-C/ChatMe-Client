import NavBar from "@/components/admin/NavBar";
import ReportsRow from "@/components/Reports/ReportsRow";
import { RootState } from "@/redux/store";
import { MenuItem, Select } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Reports = () => {
  const { adminReport } = useSelector((state: RootState) => state.adminReport);
  return (
    <>
      <div className="flex">
        <NavBar />
        <div className="main-cover w-full   flex flex-col  ml-5 mr-10">
          <div className="greeting ml-14 mt-10 mb-10 felx">
            <span className="text-3xl font-bold underline">Reports</span>
          </div>
          {adminReport?.data ? (
            <table className="w-full overflow-x-scroll ms-5 bg-white border my-4 border-gray-300">
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
            </table>
          ) : (
            <span>No data</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Reports;
