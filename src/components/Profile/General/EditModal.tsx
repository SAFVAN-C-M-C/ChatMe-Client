import { Icon } from "@iconify/react";
import React from "react";
interface EditModalProps{
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditModal:React.FC<EditModalProps> = ({setShowModal}) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Edit Bio</h3>
              <button
                className="p-1 ml-auto  border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className=" text-gray-400  h-6 w-6 text-2xl block outline-none focus:outline-none">
                  X
                </span>
              </button>
            </div>
            {/*body*/}
            
            <div className="p-6 bg-slate-200 flex-auto">
                <label htmlFor="">Name</label>
            <div className=" pl-3 login-field mt-10 bg-white w-[100%] h-[50px] rounded-md flex items-center">
              <Icon
                icon="codicon:mail"
                width={24}
                height={24}
                className="mr-2 text-gray-400"
              />
              <input
            //   onChange={handleChange}
                name="email"
                id="email"
                type="text"
                className="w-full h-full bg-transparent focus:outline-none"
                placeholder="Enter the registered Email"
              />
            </div> 
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default EditModal;
