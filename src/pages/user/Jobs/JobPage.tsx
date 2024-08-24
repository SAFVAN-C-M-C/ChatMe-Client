/* eslint-disable @typescript-eslint/no-explicit-any */

import NavigationBar from "@/components/general/NavigationBar";
import JobCard from "@/components/Jobs/JobCard";
import UseListenMessages from "@/hooks/UseListenMessages";
import UseListenNotification from "@/hooks/UseListenNotification";
import { AppDispatch, RootState } from "@/redux/store";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { getJobs, searchJobs } from "@/redux/actions/jobs/jobAction";
import { Icon } from "@iconify/react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "@/helper/theme";
import NothingHere from "@/components/general/NothingHere";
const JobPage = () => {
  UseListenMessages();
  UseListenNotification();
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: RootState) => state.profile);
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const [serachKey, setSerachKey] = useState("");
  const [page, setPage] = useState("all");
  useEffect(() => {
    if (serachKey.trim() !== "") {
      dispatch(searchJobs({ searchKey: serachKey, filter: page }));
    } else {
      dispatch(getJobs({ filter: page }));
    }
  }, [dispatch, page, serachKey]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setSerachKey(e.target.value);
      setTimeout(() => {
        setPage("all");
        dispatch(searchJobs({ searchKey: serachKey }));
      }, 500);
    } catch (error: any) {
      console.error("Something went wrong", error.message);
    }
  };
  const handleClear = () => {
    // dispatch(updateSerachKey(null))
    setSerachKey("");
  };
  return (
    <>
      <div data-theme={profile?.data.theme || "light"} className="flex">
        <NavigationBar />
        <div className="job-list-part    w-full">
          <div className="header flex items-center justify-between m-8">
            <span className="font-semibold text-2xl">Jobs for you</span>
            <div className="flex w-[70%] items-center justify-center mr-5 ml-3  mb-5">
              <ThemeProvider
                theme={profile?.data.theme === "dark" ? darkTheme : lightTheme}
              >
                <CssBaseline />
                <SearchIcon
                  sx={{
                    color: `${
                      profile?.data.theme === "dark" ? "white" : "action.active"
                    }`,
                    mr: 1,
                    my: 0.5,
                  }}
                />
                <TextField
                  sx={{
                    input: {
                      color: `${
                        profile?.data.theme === "dark"
                          ? "white"
                          : "action.active"
                      }`,
                    },
                    label: {
                      color: `${
                        profile?.data.theme === "dark"
                          ? "white"
                          : "action.active"
                      }`,
                    },
                  }}
                  value={serachKey}
                  onChange={handleSearch}
                  id="input-with-sx"
                  label="Search"
                  name="search"
                  variant="outlined"
                  fullWidth
                />
              </ThemeProvider>
              {serachKey !== "" ? (
                <Icon
                  icon={"carbon:close-outline"}
                  width={20}
                  height={20}
                  onClick={handleClear}
                  className="cursor-pointer text-gray-400 hover:text-gray-600"
                />
              ) : null}
            </div>
          </div>
          <div className="fitler-part fiter-controller flex gap-3 ml-3 mt-5 mb-5">
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
              onClick={() => setPage("full-time")}
              className={`px-4 py-2 ${
                page === "full-time"
                  ? profile?.data.theme === "dark"
                    ? "bg-slate-900"
                    : "bg-slate-400"
                  : profile?.data.theme === "dark"
                  ? "bg-slate-600"
                  : "bg-slate-200"
              } rounded-md cursor-pointer`}
            >
              Full-time
            </span>
            <span
              onClick={() => setPage("part-time")}
              className={`px-4 py-2 ${
                page === "part-time"
                  ? profile?.data.theme === "dark"
                    ? "bg-slate-900"
                    : "bg-slate-400"
                  : profile?.data.theme === "dark"
                  ? "bg-slate-600"
                  : "bg-slate-200"
              } rounded-md cursor-pointer`}
            >
              Part-time
            </span>
            <span
              onClick={() => setPage("On-site")}
              className={`px-4 py-2 ${
                page === "On-site"
                  ? profile?.data.theme === "dark"
                    ? "bg-slate-900"
                    : "bg-slate-400"
                  : profile?.data.theme === "dark"
                  ? "bg-slate-600"
                  : "bg-slate-200"
              } rounded-md cursor-pointer`}
            >
              On-site
            </span>
            <span
              onClick={() => setPage("remote")}
              className={`px-4 py-2 ${
                page === "remote"
                  ? profile?.data.theme === "dark"
                    ? "bg-slate-900"
                    : "bg-slate-400"
                  : profile?.data.theme === "dark"
                  ? "bg-slate-600"
                  : "bg-slate-200"
              } rounded-md cursor-pointer`}
            >
              Remote
            </span>
            <span
              onClick={() => setPage("hybrid")}
              className={`px-4 py-2 ${
                page === "hybrid"
                  ? profile?.data.theme === "dark"
                    ? "bg-slate-900"
                    : "bg-slate-400"
                  : profile?.data.theme === "dark"
                  ? "bg-slate-600"
                  : "bg-slate-200"
              } rounded-md cursor-pointer`}
            >
              Hybrid
            </span>
          </div>
          <div className="w-full flex justify-center">
            <div className=" job-container flex flex-wrap gap-5 pl-2 h-auto justify-start lg:w-[950px] md:w-[650px] w-[300px] ">
              {jobs?.data && jobs?.data.length > 0 ? (
                jobs?.data.map((job, index) => (
                  <JobCard job={job} key={index} />
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

export default JobPage;
