/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { formatDate } from "@/helper/formateDate";
import { IJobs } from "@/redux/reducers/jobs/jobs";
import { RootState } from "@/redux/store";
import { UserDetails } from "@/types/IProfile";
import { Icon } from "@iconify/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


interface JobCardProps{
  job:IJobs;
}
const JobCard:FC<JobCardProps> = ({job}) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const [company,setCompany]=useState<UserDetails | null>(null)
  const navigate=useNavigate()
  const getCompany=async(companyId:string)=>{
    try{
      try {
        const res = await axios.get(`${URL}/profile/get/user/${companyId}`, config);
        if (res.status === 200) {
          setCompany(res.data.data);
        }
      } catch (error: any) {
        console.log("Somthing wrong", error.message);
      }
    }catch(error:any){
      console.log("something went wrong",error.message);
      
    }
  }
  // const getRecruiter=async(recruiterId:string)=>{
  //   try{
  //     try {
  //       const res = await axios.get(`${URL}/profile/get/user/${recruiterId}`, config);
  //       if (res.status === 200) {
  //         setRecruiter(res.data.data);
  //       }
  //     } catch (error: any) {
  //       console.log("Somthing wrong", error.message);
  //     }
  //   }catch(error:any){
  //     console.log("something went wrong",error.message);
      
  //   }
  // }
  const handleJobClick=()=>{
    if(job._id){
      navigate(`/jobs/job/${job._id}`)
    }
  }
  useEffect(()=>{
    if(job.companyId){
      getCompany(job.companyId)
    }
    // if(job.recruiterId){
    //   getRecruiter(job.recruiterId)
    // }
  },[])
  const colors = [
    "bg-red-900",

    "bg-purple-900",

    "bg-violet-900",

    "bg-indigo-900",
  
    "bg-emerald-900",
  ];
  const [bgColor, setBgColor] = useState('lime');

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  }, []);
  return (
    <>
      <div data-theme={profile?.data.theme || "light"} className="card job_card bg-slate-100 overflow-hidden shadow-cyan-900  border-blue-900 borderv h w-[300px] shadow-lg" onClick={handleJobClick}>
        <figure className={`${bgColor} p-6`}>
          <img
            className="rounded-full h-24 w-24 border-[2px] border-black"
            src={company?.avatar}
            alt="Shoes"
          />
        </figure>
        <div data-theme={profile?.data.theme || "light"} className="card-body rounded-b-lg">
          <h2 className="card-title font-bold break-all whitespace-pre-wrap">{job.jobTitle}</h2>
          <p className="flex items-center gap-1 font-normal text-sm">{company?.name} {company?.isVerified ? (
            <Icon
              className="text-blue-500"
              icon="mdi:verified-user"
              height={16}
              width={16}
            />
          )  : null}</p>
          <span className="font-normal text-sm">{job.type}</span>
          <span className="font-normal text-sm">Job posted : {formatDate(job.createdAt)}</span>
        </div>
      </div>
    </>
  );
};

export default JobCard;
