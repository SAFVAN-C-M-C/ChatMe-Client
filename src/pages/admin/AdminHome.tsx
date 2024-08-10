import { useSelector } from "react-redux";
import NavBar from "../../components/admin/NavBar";
import { RootState } from "../../redux/store";

import UserChart from "@/components/admin/Graphs/UserChart";
import PostChart from "@/components/admin/Graphs/PostChart";
import JobChart from "@/components/admin/Graphs/JobChart";
const AdminHome = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <>
      <div className="flex" data-theme={"dark"}>
        <NavBar />
        <div className="main-cover w-full   flex flex-col ">
          <div className="greeting ml-14 mt-2 felx">
            <span>Hello Admin,</span>
            <span className="font-bold text-lg">{user?.data?.name}</span>
          </div>
          <div className="graph w-full flex flex-col gap-8 mt-4 mb-4  items-center">
            <UserChart />
            <PostChart />
            <JobChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
