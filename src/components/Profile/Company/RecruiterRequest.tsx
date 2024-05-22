import RecruiterRequestPost from "./RecruiterRequestPost";

const RecruiterRequest = () => {
  return (
    <div className="applied-jobs-cover w-[80%] flex items-center flex-col h-auto bg-slate-50">
      <RecruiterRequestPost />
      <RecruiterRequestPost />
      <RecruiterRequestPost />
      <RecruiterRequestPost />
    </div>
  );
};

export default RecruiterRequest;
