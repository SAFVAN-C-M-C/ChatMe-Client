import { Icon } from "@iconify/react"
import { useState } from "react"


const ResetPassword = () => {
    const [showPassword,setShowPassword]=useState<boolean>(false)
  return (
    <>
      <div className="forgot-container bg-white rounded-lg w-[90%] m-2 h-[350px] lg:w-[80%] md:w-[90%] sm:w-[60%] flex flex-col items-center">
        <div className="forgot-tilte mt-14 ">
          <strong className="text-xl">Reset Password</strong>
        </div>
        <div className=" pl-3 email-field mt-10 bg-slate-200 w-[80%] h-[50px] rounded-md flex items-center">
              <Icon icon="bx:bxs-lock-alt" width={24} height={24} className="mr-2 text-gray-400"/>
              <input
                type={showPassword?"text":"password"}
                className="w-full h-full bg-transparent"
                placeholder="Enter new password"
              />
             <Icon icon={showPassword?`mdi:eye-off`:`mdi:eye`} width={24} height={24} className="mr-2 text-gray-400" onClick={()=>setShowPassword(!showPassword)}/>
             
              
        </div>
        <div className=" pl-3 email-field mt-5 bg-slate-200 w-[80%] h-[50px] rounded-md flex items-center">
              <Icon icon="bx:bxs-lock-alt" width={24} height={24} className="mr-2 text-gray-400"/>
              <input
                type="password"
                className="w-full h-full bg-transparent"
                placeholder="Re-enter the password"
              />
        </div>
        <div className="submit-button w-[40%] h-[40px] bg-blue-600 rounded-full mt-5">
          <button
            className="w-full h-full text-white flex justify-center items-center"
            type="submit"
          >
            Reset Password
          </button>
        </div>
      </div>  
    </>
  )
}

export default ResetPassword