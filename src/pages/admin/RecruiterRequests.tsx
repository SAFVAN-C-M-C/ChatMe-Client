import React, { useEffect } from 'react'
import NavBar from '../../components/admin/NavBar';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { verifyRecruiter } from '../../redux/actions/admin/adminRecruiterRequestAction';
import toast from 'react-hot-toast';

function RecruiterRequests() {
  const { adminRecruiterRequests,error } = useSelector(
    (state: RootState) => state.adminRecruiterRequest
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const dispatch = useDispatch<AppDispatch>();
  const handleVerify = (email?: string) => {
    const formData = {
      email: email,
      isVerified: true,
      type: "user",
    };
    dispatch(verifyRecruiter(formData));
    if (!error) {
      toast.success("Verified");
    }
  };
  return (
    <>
    <div className="flex" data-theme={"dark"}>
        <NavBar />
        <div className="main-cover w-full   flex flex-col  ml-5 mr-10">
        <div className="greeting ml-14 mt-10 mb-10 felx">
        <span className="text-3xl font-bold underline">Recruiter Requests</span>
      </div>
          <table className="w-full overflow-x-scroll ms-5 bg-white border my-4 border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-0 border-b">Name</th>
                <th className="py-2 px-0 border-b">Email</th>
                <th className="py-2 px-0 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminRecruiterRequests?.data.map((user, id) => (
                <tr key={id} className="border-b">
                  <td className="py-2 px-4 text-center">{user?.name}</td>
                  <td className="py-2 px-4 text-center">{user?.email}</td>

                  <td className="py-2 px-4 text-center">
                    
                      <button
                        onClick={() => handleVerify(user.email)}
                        className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-red-700"
                      >
                        Verify
                      </button>
                    
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default RecruiterRequests