import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/admin/NavBar";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { blockCompany, unBlockCompany } from "../../redux/actions/admin/adminCompanyAction";
// import { verifyCompany } from "../../redux/actions/admin/adminCompanyAction";

const Company = () => {
  const { adminCompanies,error } = useSelector(
    (state: RootState) => state.adminCompany
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const dispatch = useDispatch<AppDispatch>();
  const handleBlock = (email?:string) => {
    const formData = {
      email: email,
      isBlocked: true,
      type: "company",
    };
    dispatch(blockCompany(formData));
    if (!error) {
      toast.success("Blocked");
    }
  };
  const handleUnBlock = (email?:string) => {
    const formData = {
      email: email,
      isBlocked: false,
      type: "company",
    };
    dispatch(unBlockCompany(formData));
    if (!error) {
      toast.success("UnBlocked");
    }
  };
  return (
    <>
      <div className="flex" data-theme={"dark"}>
        <NavBar />
        <div className="main-cover w-full   flex flex-col  ml-5 mr-10">
          <div className="greeting ml-14 mt-10 mb-10 felx">
            <span className="text-3xl font-bold underline">Companies</span>
          </div>
          {
            adminCompanies?.data?(<><table className="w-full overflow-x-scroll ms-5 bg-white border my-4 border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-0 border-b">Slno</th>
                  <th className="py-2 px-0 border-b">Name</th>
                  <th className="py-2 px-0 border-b">Email</th>
                  <th className="py-2 px-0 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminCompanies?.data.map((user, id) => (
                  <tr key={id} className="border-b">
                    <td className="py-2 px-4 text-center">{id+1}</td>
                    <td className="py-2 px-4 text-center">{user?.name}</td>
                    <td className="py-2 px-4 text-center">{user?.email}</td>
  
                    <td className="py-2 px-4 text-center">
                      {/* {user.isVerified === false ? (
                        <button
                          // onClick={()=>handleVerify(user.email)}
                          className="bg-blue-500 mr-2 text-white py-1 px-2 rounded hover:bg-red-700"
                        >
                          Verify
                        </button>
                      ) : null} */}
                      {user.isBlocked ? (
                        <button
                          onClick={() => handleUnBlock(user.email)}
                          className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-red-700"
                        >
                          UnBlock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlock(user.email)}
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                        >
                          Block
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table></>):(<><span>No data</span></>)
          }
        </div>
      </div>
    </>
  );
};

export default Company;
