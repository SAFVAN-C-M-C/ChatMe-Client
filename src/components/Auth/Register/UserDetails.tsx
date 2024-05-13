import { Icon } from "@iconify/react";
import { useRef } from "react";

const UserDetails = () => {
    const datePickerRef = useRef<HTMLInputElement>(null);
    const handleDobClick = () => {
        if (datePickerRef.current) {
            datePickerRef.current.focus(); // Focus on the input to activate the date picker
        }
    };
  return (
    <>

      <div className=" pl-3 register-field mt-10 bg-slate-200 w-[80%] h-[50px] rounded-md flex items-center">
        <Icon
          icon="ic:round-person"
          width={24}
          height={24}
          className="mr-2 text-gray-400"
        />
        <input
          type="text"
          className="w-full h-full bg-transparent"
          placeholder="Enter Full Name "
        />
      </div>
      <div className=" pl-3 register-field mt-5 bg-slate-200 w-[80%] h-[50px] rounded-md flex items-center">
        <Icon
          icon="mdi:phone"
          width={24}
          height={24}
          className="mr-2 text-gray-400"
        />
        <input
          type="tel"
          max={10}
          className="w-full h-full bg-transparent"
          placeholder="Enter Phone Number "
        />
      </div>
      <div onClick={handleDobClick} className=" pl-3 register-field mt-5 bg-slate-200 w-[80%] h-[50px] rounded-md flex items-center">
        <Icon
          icon="uis:calender"
          width={24}
          height={24}
          className="mr-2 text-gray-400"
        />
        <input
            type="date"
            ref={datePickerRef}
            onClick={handleDobClick}
            className="dob w-full h-full bg-transparent text-gray-500 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className=" pl-3 register-field mt-5 mb-5 bg-slate-200 w-[80%] h-[50px] rounded-md flex items-center">
        <Icon
          icon="mdi:location"
          width={24}
          height={24}
          className="mr-2 text-gray-400"
        />
        <input
          type="text"
          className="w-full h-full bg-transparent text-gray-500"
          placeholder="Enter the location "
        />
      </div>
    </>
  );
};

export default UserDetails;
