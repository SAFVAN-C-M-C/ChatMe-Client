import RecruiterJobPost from "./RecruiterJobPost"


const RecruiterJobs = () => {
  return (
    <div className="applied-jobs-cover w-[80%] flex items-center flex-col h-auto bg-slate-50">
    <RecruiterJobPost/>
    <RecruiterJobPost/>
    <RecruiterJobPost/>
</div>
  )
}

export default RecruiterJobs