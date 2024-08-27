/* eslint-disable react-hooks/exhaustive-deps */
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import NavigationBar from "@/components/general/NavigationBar";
import NothingHere from "@/components/general/NothingHere";
import MyApplicationCard from "@/components/Jobs/Applications/MyApplicationCard";
import { RootState } from "@/redux/store";
import { IJobApplicationFromBackend } from "@/types/IJob";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MyJobApplication = () => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const [page, setPage] = useState("all");
  const [applications, setApplications] = useState<
    IJobApplicationFromBackend[] | null
  >(null);
  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        `${URL}/job/myapplications?status=${page}`,
        config
      );
      if (response.status === 200) {
        setApplications(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };
  useEffect(() => {
      fetchApplications();
  }, [page]);
  return (
    <>
      <div data-theme={profile?.data.theme || "light"} className="flex">
        <NavigationBar />
        <div className="application-list-main  w-full h-screen">
          <div className="header m-3 p-2">
            <div className="job-title flex flex-col gap-1">
              <span className="font-bold text-sm lg:text-2xl">
                My Applications
              </span>
              <span>Applications :</span>
            </div>
            <div className="fiter-controller flex gap-3 mt-3">
              <span
                onClick={() => setPage("all")}
                className={`px-4 py-2 ${
                  page === "all"
                    ? profile?.data.theme === "dark"
                      ? "bg-slate-900"
                      : "bg-slate-400"
                    : profile?.data.theme === "dark"
                    ? "bg-slate-600"
                    : "bg-slate-200"
                }  rounded-md cursor-pointer`}
              >
                All
              </span>
              <span
                onClick={() => setPage("applied")}
                className={`px-4 py-2 ${
                  page === "applied"
                    ? profile?.data.theme === "dark"
                      ? "bg-slate-900"
                      : "bg-slate-400"
                    : profile?.data.theme === "dark"
                    ? "bg-slate-600"
                    : "bg-slate-200"
                } rounded-md cursor-pointer`}
              >
                New
              </span>
              <span
                onClick={() => setPage("reviewed")}
                className={`px-4 py-2 ${
                  page === "reviewed"
                    ? profile?.data.theme === "dark"
                      ? "bg-slate-900"
                      : "bg-slate-400"
                    : profile?.data.theme === "dark"
                    ? "bg-slate-600"
                    : "bg-slate-200"
                } rounded-md cursor-pointer`}
              >
                Reviewed
              </span>
              <span
                onClick={() => setPage("accepted")}
                className={`px-4 py-2 ${
                  page === "accepted"
                    ? profile?.data.theme === "dark"
                      ? "bg-slate-900"
                      : "bg-slate-400"
                    : profile?.data.theme === "dark"
                    ? "bg-slate-600"
                    : "bg-slate-200"
                } rounded-md cursor-pointer`}
              >
                Accepted
              </span>
              <span
                onClick={() => setPage("rejected")}
                className={`px-4 py-2 ${
                  page === "rejected"
                    ? profile?.data.theme === "dark"
                      ? "bg-slate-900"
                      : "bg-slate-400"
                    : profile?.data.theme === "dark"
                    ? "bg-slate-600"
                    : "bg-slate-200"
                } rounded-md cursor-pointer`}
              >
                Rejected
              </span>
            </div>
          </div>
          <div className="w-full flex justify-center mt-10">
            <div className="application-list flex flex-wrap gap-5 pl-2 h-auto justify-start lg:w-[950px] md:w-[650px] w-[300px]">
              {applications && applications.length > 0 ? (
                applications.map((application, index) => (
                  <MyApplicationCard application={application} key={index} />
                ))
              ) : (
                <NothingHere />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyJobApplication;
