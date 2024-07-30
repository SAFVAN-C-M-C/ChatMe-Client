/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NavigationBar from "@/components/general/NavigationBar"
import JobCard from "@/components/Jobs/JobCard";
import UseListenMessages from "@/hooks/UseListenMessages";
import UseListenNotification from "@/hooks/UseListenNotification";
import { AppDispatch, RootState } from "@/redux/store";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { getJobs, searchJobs } from "@/redux/actions/jobs/jobAction";
import { Icon } from "@iconify/react";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from "@/helper/theme";
const JobPage = () => {
  UseListenMessages()
  UseListenNotification()
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: RootState) => state.profile);
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const [serachKey,setSerachKey]=useState("")
  const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    try {
        setSerachKey(e.target.value);
    setTimeout(() => {
        dispatch(searchJobs({searchKey:serachKey}))
    }, 500);
    } catch (error:any) {
        console.log("Something went wrong",error.message);
        
    }
  }
  const handleClear=()=>{
    // dispatch(updateSerachKey(null))
    setSerachKey("")
  }
  return (
    <>
      <div data-theme={profile?.data.theme || "light"} className="flex">
        <NavigationBar/>
        <div className="job-list-part    w-full">
          <div className="header flex items-center justify-between m-8">
            <span className="font-semibold text-2xl">Jobs for you</span>
            <div className='flex w-[60%] items-center mr-3 ml-3 mb-5'>
            <ThemeProvider theme={profile?.data.theme==="dark"?darkTheme:lightTheme}>
      <CssBaseline />
            <SearchIcon   sx={{ color: `${profile?.data.theme==="dark"?"white":"action.active"}`, mr: 1, my: 0.5 }} />
            <TextField
              
              sx={{input:{color:`${profile?.data.theme==="dark"?"white":"action.active"}`},label:{color:`${profile?.data.theme==="dark"?"white":"action.active"}`}}}
              
              value={serachKey}
              onChange={handleSearch}
              id="input-with-sx"
              label="Search"
              name="search"
              variant="outlined"
              fullWidth
            />
            </ThemeProvider>
            {serachKey!==""?<Icon icon={"carbon:close-outline"} width={20} height={20} onClick={handleClear} className="cursor-pointer text-gray-400 hover:text-gray-600"/>:null}
          </div>
          </div>
            <div className="w-full flex justify-center">
            <div className=" job-container flex flex-wrap gap-5 pl-2 h-auto justify-start lg:w-[950px] md:w-[650px] w-[300px] ">
            {
              jobs?.data && jobs?.data.length>0?
              jobs?.data.map((job,index)=>(<JobCard job={job} key={index}/>))
              :(<span>No jobs here to show</span>)
            }
          </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default JobPage