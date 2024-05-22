import AppliedJobPost from './AppliedJobPost'

const AppliedJobs = () => {
  return (
    <>
    <div className="applied-jobs-cover w-[80%] flex items-center flex-col h-auto bg-slate-50">
        <AppliedJobPost/>
        <AppliedJobPost/>
        <AppliedJobPost/>   
    </div>
    </>
  )
}

export default AppliedJobs