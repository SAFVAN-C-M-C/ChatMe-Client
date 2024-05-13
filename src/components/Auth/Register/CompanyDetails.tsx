import { Icon } from "@iconify/react";


const CompanyDetails = () => {
  return (
    <>
      <div className=" pl-3 register-field mt-10 bg-slate-200 w-[80%] h-[50px] rounded-md flex items-center">
        <Icon
          icon="mdi:company"
          width={24}
          height={24}
          className="mr-2 text-gray-400"
        />

        <input
          type="text"
          className="w-full h-full bg-transparent"
          placeholder="Enter Company Name "
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

export default CompanyDetails;
