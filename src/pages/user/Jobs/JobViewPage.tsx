/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import NavigationBar from "@/components/general/NavigationBar";
import EditDropdown from "@/components/Jobs/EditDropdown";
import JobDescription from "@/components/Jobs/JobDescription";
import Skills from "@/components/Jobs/Skills";
import ApplyForJob from "@/components/modals/ApplyForJob/ApplyForJob";
import { useChatContext } from "@/context/ChatContext";
import { IJobs } from "@/redux/reducers/jobs/jobs";
import { RootState } from "@/redux/store";
import { UserDetails } from "@/types/IProfile";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const JobViewPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  console.log(jobId);
  const { profile } = useSelector((state: RootState) => state.profile);
  const [job, setJob] = useState<IJobs | null>(null);
  const [company, setCompany] = useState<UserDetails | null>(null);
  const [recruiter, setRecruiter] = useState<UserDetails | null>(null);
  const [openApplyforJob,setOpenApplyforJob]=useState<boolean>(false)
  const { getChatSearch } = useChatContext();
  const handleUserClick = (userId: string) => {
    if (userId === profile?.data.userId) {
      navigate(`/profile`);
      return;
    }
    navigate(`/u/profile/${userId}`);
  };
  
  const handleClick = (userId: string) => {
    getChatSearch(String(userId), navigate);
  };
  const copyToClipboard = async (text: string) => {
    try {
      console.log("clicker");

      await navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const getCompany = async (companyId: string) => {
    try {
      try {
        const res = await axios.get(
          `${URL}/profile/get/user/${companyId}`,
          config
        );
        if (res.status === 200) {
          setCompany(res.data.data);
        }
      } catch (error: any) {
        console.log("Somthing wrong", error.message);
      }
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  };
  const getRecruiter = async (recruiterId: string) => {
    try {
      try {
        const res = await axios.get(
          `${URL}/profile/get/user/${recruiterId}`,
          config
        );
        if (res.status === 200) {
          setRecruiter(res.data.data);
        }
      } catch (error: any) {
        console.log("Somthing wrong", error.message);
      }
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  };
  const getJob = async (jobId: string) => {
    try {
      try {
        const res = await axios.get(`${URL}/job/get/${jobId}`, config);
        if (res.status === 200) {
          setJob(res.data.data);
        }
      } catch (error: any) {
        console.log("Somthing wrong", error.message);
      }
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  };
  useEffect(() => {
    if (!job?._id) {
      getJob(String(jobId));
    }
    if (job?.companyId) {
      getCompany(job?.companyId);
    }
    if (job?.recruiterId) {
      getRecruiter(job?.recruiterId);
    }
  }, [job?._id, jobId, job?.recruiterId, job?.companyId,job?.updatedAt]);

  return (
    <div data-theme={profile?.data.theme || "light"} className="flex">
      {
        openApplyforJob && job? <ApplyForJob job={job} setOpenApplyforJob={setOpenApplyforJob}/>:null
      }
      <NavigationBar />
      <div className="job-details-container px-10 w-full">
        <div className="header mt-10 flex">
          {/* <div className="back-btn">
            <Icon
              className="mr-4 cursor-pointer"
              icon={"weui:back-filled"}
              width={30}
              height={30}
            />
          </div> */}
          <div className="job-title flex flex-col w-full  relative">
            <div className="flex  items-center w-full">
              <span className="font-semibold text-3xl text-wrap break-all">
                {job?.jobTitle}
              </span>
              {
                job?.companyId === profile?.data.userId || job?.recruiterId ===profile?.data.userId?
                <EditDropdown getJob={getJob} job={job}/>:null}
            </div>
            <span>
              <span
                className="company-name font-medium"
                onClick={() => handleUserClick(String(company?.userId))}
              >
                {company?.name}
              </span>
              <span>{company?.location ? `,${company?.location}` : ""}</span>
            </span>
            {job?.email && job.email!=="undefined" ? (
              <div className="flex items-center gap-1">
                <span className="email">{job.email}</span>
                <Icon
                  className="cursor-pointer"
                  onClick={() => copyToClipboard(String(job.email))}
                  icon="uil:copy"
                  width="1.2rem"
                  height="1.2rem"
                />
              </div>
            ) : company?.email ? (
              <div className="flex items-center gap-1">
                <span className="email">{company?.email}</span>
                <Icon
                  className="cursor-pointer"
                  onClick={() => copyToClipboard(String(company.email))}
                  icon="uil:copy"
                  width="1.2rem"
                  height="1.2rem"
                />
              </div>
            ) : null}
            <div className="subs flex gap-1 mt-3">
              <span
                className={`types p-2 rounded-md ${
                  profile?.data.theme === "dark" ? "bg-gray-600" : "bg-gray-200"
                }`}
              >
                {job?.type}
              </span>
              <span
                className={`modes p-2 rounded-md ${
                  profile?.data.theme === "dark" ? "bg-gray-600" : "bg-gray-200"
                }`}
              >
                {job?.mode}
              </span>
            </div>
          </div>
        </div>
        <div className="job-details mt-10">
          <div className="apply-btn btn btn-primary text-white cursor-pointer" onClick={()=>setOpenApplyforJob(true)}>Apply</div>
          <div className="hiring-part mt-7 w-[90%] px-2 py-2 border-dashed border-[1px] rounded-lg ">
            <div className="header">
              <span className="text-xl font-medium">Hiring for the job</span>
            </div>
            <div className="company p-4  flex items-center relative">
              <div
                className="avatar-img mr-4 cursor-pointer"
                onClick={() => handleUserClick(String(company?.userId))}
              >
                <img
                  src={company?.avatar}
                  className="w-[50px] rounded-full"
                  alt=""
                />
              </div>
              <div className="name-part flex  flex-col">
                {" "}
                <span
                  className="font-medium flex gap-1 items-center cursor-pointer"
                  onClick={() => handleUserClick(String(company?.userId))}
                >
                  {company?.name}{" "}
                  {company?.isVerified ? (
                    <Icon
                      className="text-blue-500"
                      icon="mdi:verified-user"
                      height={18}
                      width={18}
                    />
                  ) : null}
                </span>
                <span className="text-sm">Company</span>
              </div>
              <div className="message-part absolute right-4">
                <span
                  className="btn btn-info text-white "
                  onClick={() => handleClick(String(company?.userId))}
                >
                  Message
                </span>
              </div>
            </div>
            <div className="recruiter p-4  flex items-center relative">
              <div
                className="avatar-img mr-4 cursor-pointer"
                onClick={() => handleUserClick(String(recruiter?.userId))}
              >
                <img
                  src={recruiter?.avatar}
                  className="w-[50px] rounded-full"
                  alt=""
                />
              </div>
              <div className="name-part flex  flex-col">
                {" "}
                <span
                  className="font-medium flex gap-1 items-center cursor-pointer"
                  onClick={() => handleUserClick(String(recruiter?.userId))}
                >
                  {recruiter?.name}{" "}
                  {recruiter?.isVerified ? (
                    <Icon
                      className="text-green-500"
                      icon="material-symbols:verified"
                      height={18}
                      width={18}
                    />
                  ) : null}
                </span>
                <span className="text-sm">Recruiter</span>
              </div>
              <div className="message-part absolute right-4">
                <span
                  className="btn btn-info text-white "
                  onClick={() => handleClick(String(recruiter?.userId))}
                >
                  Message
                </span>
              </div>
            </div>
          </div>
          {job?.description ? <JobDescription jd={job?.description} /> : null}
          {job?.skills && job?.skills?.length > 0 ? (
            <Skills skills={job?.skills} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default JobViewPage;
