import { Icon } from '@iconify/react'
import { useState } from 'react';


const RegisterForm_1 = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
    <div className="register-container bg-white rounded-lg w-[90%] m-2 h-[550px] lg:w-[80%] md:w-[90%] sm:w-[60%] flex flex-col items-center">
        <div className="login-tilte mt-14 mb-4">
          <strong className="text-xl">Welcome to ChatMe😊</strong>
        </div>

        <div className=" pl-3 register-field mt-10 bg-slate-200 w-[80%] h-[50px] rounded-md flex items-center">
          <Icon
            icon="codicon:mail"
            width={24}
            height={24}
            className="mr-2 text-gray-400"
          />
          <input
            type="text"
            className="w-full h-full bg-transparent"
            placeholder="Enter the registered Email"
          />
        </div>
        <div className=" pl-3 register-field mt-5  bg-slate-200 w-[80%] h-[50px] rounded-md  flex items-center">
          <Icon
            icon="bx:bxs-lock-alt"
            width={24}
            height={24}
            className="mr-2 text-gray-400"
          />
          <input
            type={showPassword ? "text" : "password"}
            className="w-full h-full bg-transparent"
            placeholder="Enter new password"
          />
          <Icon
            icon={showPassword ? `mdi:eye-off` : `mdi:eye`}
            width={24}
            height={24}
            className="mr-2 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className=" pl-3 register-field mt-5 mb-5 bg-slate-200 w-[80%] h-[50px] rounded-md  flex items-center">
          <Icon
            icon="bx:bxs-lock-alt"
            width={24}
            height={24}
            className="mr-2 text-gray-400"
          />
          <input
            type="password"
            className="w-full h-full bg-transparent"
            placeholder="Re-enter Password"
          />
          
        </div>
        <div className="login-button w-[30%] h-[40px] bg-blue-600 rounded-full">
          <button
            className="w-full h-full text-white flex justify-center items-center"
            type="submit"
          >
            Next
          </button>
        </div>

        <div className="line w-[90%] h-[.5px] mt-4 bg-gray-700"></div>
        <div className="sign-up-with-google w-3/4 h-[40px] border-[.5px] border-gray-600 rounded-lg mt-4 flex justify-center items-center">
          <p className="font-medium text-gray-500 mr-3">Sign up with </p>
          <Icon icon="devicon:google" width="1.2rem" height="1.2rem" />
        </div>
        <div className="new-user mt-3">
          Already registered?<a href="/">Login</a>
        </div>
      </div>
    </>
  )
}

export default RegisterForm_1