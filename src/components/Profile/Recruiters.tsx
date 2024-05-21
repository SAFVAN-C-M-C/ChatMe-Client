import RecruiterPost from "./RecruiterPost";

const Recruiters = () => {
  return (
    <div className="applied-jobs-cover w-[80%] flex items-center flex-col h-auto bg-slate-50">
      <RecruiterPost />
      <RecruiterPost />
      <RecruiterPost />
    </div>
  );
};

export default Recruiters;
