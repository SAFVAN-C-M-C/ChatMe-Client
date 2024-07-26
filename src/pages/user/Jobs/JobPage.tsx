import NavigationBar from "@/components/general/NavigationBar"
import JobCard from "@/components/Jobs/JobCard";
import UseListenMessages from "@/hooks/UseListenMessages";
import UseListenNotification from "@/hooks/UseListenNotification";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const JobPage = () => {
  UseListenMessages()
  UseListenNotification()
  const { profile } = useSelector((state: RootState) => state.profile);

  return (
    <>
      <div data-theme={profile?.data.theme || "light"} className="flex">
        <NavigationBar/>
        <div className="job-list-part    w-full">
          <div className="header flex justify-center m-8">
            <span className="font-semibold text-2xl">Jobs for you</span>
          </div>
          <div className=" job-container flex flex-wrap gap-2 h-auto justify-center w-full ">
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
            <JobCard/>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobPage