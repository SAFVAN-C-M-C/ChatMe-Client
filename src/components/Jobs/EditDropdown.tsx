/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
import React, { FC, useState } from "react";
import EditJobModal from "../modals/CreateJobModals/EditJobModal";
import { IJobs } from "@/redux/reducers/jobs/jobs";
import axios from "axios";
import { URL } from "@/common/api";
import { config } from "process";
import toast from "react-hot-toast";
import { getJobs } from "@/redux/actions/jobs/jobAction";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
interface EditDropdownProps{
  job:IJobs|null
  getJob:(jobId: string) => Promise<void>
}
const EditDropdown:FC<EditDropdownProps> = ({job,getJob}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate=useNavigate()
  const [openEditJobModal,setOpenEditJobModal]=useState<boolean>(false)
  const handleOpenEdit=()=>{
    setOpenEditJobModal(true)
  }
  const handleDelete=async()=>{
    try {
        const res = await axios.post(`${URL}/job/delete/${job?._id}`, config);
        if (res.status === 200) {
          toast.success("Job deleted");
          dispatch(getJobs());
          navigate('/jobs')
        }
    } catch (error:any) {
        console.log("Something went wrong",error.message);
        
    }
  }
  const handleViewApplication=()=>{
    navigate(`/jobs/applications/${job?._id}`)
  }
  return (
    <>
    {
      openEditJobModal?<EditJobModal getJob={getJob} setOpenEditJobModal={setOpenEditJobModal} job={job}/>:null
    }
      <div className="dropdown dropdown-end absolute right-2">
        <div tabIndex={0} role="button" className=" m-1">
          <Icon className="" icon="cil:options" width={26} height={26} />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-xl"
        >
          <li onClick={handleViewApplication}>
            <span>
              <Icon icon="tdesign:view-list" width={26} height={26} />
              View Applications
            </span>
          </li>
          <li onClick={handleOpenEdit}>
            <span>
              <Icon icon="ic:outline-edit" width={26} height={26} />
              Edit
            </span>
          </li>
          <li onClick={handleDelete}>
            <span>
              <Icon icon="material-symbols:delete" width={26} height={26} />
              Delete{" "}
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default EditDropdown;
