import React from "react";
import NavBar from "../../components/admin/NavBar";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const Users = () => {
  const { adminUser } = useSelector((state: RootState) => state.adminUser);
    
  return (
    <>
      <div className="flex">
        <NavBar />
        <div className="main-cover w-full   flex flex-col  ml-5 mr-10">
          <table className="w-full overflow-x-scroll ms-5 bg-white border my-4 border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                
                <th className="py-2 px-0 border-b">Name</th>
                <th className="py-2 px-0 border-b">Email</th>
                <th className="py-2 px-0 border-b">No.of Actions</th>
                <th className="py-2 px-0 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>

{ adminUser?.data.map((user, id) => (
                    <tr key={id} className="border-b">
                      <td className="py-2 px-4 text-center">
                        {user?.name}
                      </td>
                      <td className="py-2 px-4 text-center">{user?.email}</td>
                      <td className="py-2 px-4 text-center">{user?.numberOfReportActions}</td>
                      <td className="py-2 px-4 text-center">
                        {
                          user.IsBlocked?(<button
                            // onClick={() => deleteClick(user._id)}
                            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-red-700"
                          >
                            UnBlock
                          </button>):(<button
                          // onClick={() => deleteClick(user._id)}
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                        >
                          Block
                        </button>)
                        }
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;
