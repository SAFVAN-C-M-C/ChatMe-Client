import React, { useEffect } from "react";
import NavBar from "../../components/admin/NavBar";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { blockUser, unBlockUser } from "../../redux/actions/admin/adminUserAction";

const Users = () => {
  const { adminUser,error } = useSelector((state: RootState) => state.adminUser);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const dispatch = useDispatch<AppDispatch>();
  const handleBlock = (userId: string) => {
    const formData = {
      userId: userId,
      isBlocked: true,
      type: "user",
    };
    dispatch(blockUser(formData));
    if (!error) {
      toast.success("Blocked");
    }
  };
  const handleUnBlock = (userId: string) => {
    const formData = {
      userId: userId,
      isBlocked: false,
      type: "user",
    };
    dispatch(unBlockUser(formData));
    if (!error) {
      toast.success("UnBlocked");
    }
  };
  return (
    <>
      <div className="flex">
        <NavBar />
        <div className="main-cover w-full   flex flex-col  ml-5 mr-10">
          <div className="greeting ml-14 mt-10 mb-10 felx">
            <span className="text-3xl font-bold underline">Users</span>
          </div>
          {adminUser?.data ? (
            <table className="w-full overflow-x-scroll ms-5 bg-white border my-4 border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-0 border-b">Slno</th>
                  <th className="py-2 px-0 border-b">Name</th>
                  <th className="py-2 px-0 border-b">Email</th>
                  <th className="py-2 px-0 border-b">No.of Actions</th>
                  <th className="py-2 px-0 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminUser?.data.map((user, id) => (
                  <tr key={id} className="border-b">
                    <td className="py-2 px-4 text-center">{id+1}</td>
                    <td className="py-2 px-4 text-center">{user?.name}</td>
                    <td className="py-2 px-4 text-center">{user?.email}</td>
                    <td className="py-2 px-4 text-center">
                      {user?.numberOfReportActions}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {user.isBlocked ? (
                        <button
                          onClick={() => handleUnBlock(String(user.userId))}
                          className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-red-700"
                        >
                          UnBlock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBlock(String(user.userId))}
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                        >
                          Block
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span>No data</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Users;
