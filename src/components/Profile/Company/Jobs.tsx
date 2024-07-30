/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import JobPost from './JobPost'
import axios from 'axios';
import { URL } from '@/common/api';
import { config } from '@/common/configurations';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { IJobs } from '@/redux/reducers/jobs/jobs';

const Jobs = () => {
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
    <div className="applied-jobs-cover w-[80%] pb-3 flex items-center flex-col h-auto ">
    {
      myJob && myJob.length>0?myJob.map((job,index)=>(<JobPost job={job} key={index}/>)):(<span>No Jobs here</span>)
    }
    </div>
  )
}

export default Jobs