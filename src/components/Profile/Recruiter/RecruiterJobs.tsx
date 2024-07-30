/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import RecruiterJobPost from "./RecruiterJobPost"
import { IJobs } from "@/redux/reducers/jobs/jobs"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import axios from "axios"
import { URL } from "@/common/api"
import { config } from "@/common/configurations"


const RecruiterJobs = () => {
  const [myJob,setMyjob]=useState<IJobs[] |null >(null)
  const { profile } = useSelector((state: RootState) => state.profile);
  const getMyjob=async()=>{
    try {
      const res=await axios.get(`${URL}/job/get/user/${String(profile?.data.userId)}`,config)
      if(res.status===200){
        setMyjob(res.data.data)
      }
    } catch (error:any) {
      console.log("somthing went wrong",error.message);
      
    }
  }
  useEffect(()=>{
    if(!myJob){
      getMyjob()
    }
  },[myJob?.length])
  return (
    <div className="applied-jobs-cover w-[80%] flex items-center flex-col h-auto pb-3">
    {
      myJob && myJob.length>0?myJob.map((job,index)=>(<RecruiterJobPost job={job} key={index}/>)):(<span>No Jobs here</span>)
    }

</div>
  )
}

export default RecruiterJobs