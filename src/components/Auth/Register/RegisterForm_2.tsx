import { Icon } from '@iconify/react'
import { useState } from 'react'
import UserDetails from './UserDetails';
import CompanyDetails from './CompanyDetails';


const RegisterForm_2 = () => {
    const [userAccount,setUserAccount]=useState<boolean>(true);
    const [companyAccount,setCompanyAccount]=useState<boolean>(false);
    const handleAccountRadio=(e)=>{
        if(e.target.value==='company'){
            setCompanyAccount(true);
            setUserAccount(false)
        }else if(e.target.value==='user'){
            setCompanyAccount(false);
            setUserAccount(true)
        }
    }
  return (
    <>
        <div className="register-container bg-white rounded-lg w-[90%] m-2 h-[550px] lg:w-[80%] md:w-[90%] sm:w-[60%] flex flex-col items-center border-[.5px] border-gray-500">
        <div className="login-tilte mt-14 mb-4">
          <strong className="text-xl">Welcome to ChatMe😊</strong>
        </div>
        <div className=" pl-3 register-field mt-3  w-[80%] h-[50px] rounded-md flex justify-normalcenter flex-col">
          {/* account selection */}
          <div className="lable">
            <label>Account Type</label>
          </div>
          <div className="radio-option ">
            <input type="radio" name='account_type' checked={userAccount}  value="user" className='bg-transparent' onChange={(e)=>handleAccountRadio(e)}/> Personal
          </div>
          <div className="radio-option ">
            <input type="radio" name='account_type' checked={companyAccount} value="company" className='bg-transparent ' onChange={(e)=>handleAccountRadio(e)}/> Comapany
          </div>
          
        </div>
        {
            userAccount ? <UserDetails/>:<CompanyDetails/>
        }
        <div className="login-button w-[30%] h-[40px] bg-blue-600 rounded-full">
          <button
            className="w-full h-full text-white flex justify-center items-center"
            type="submit"
          >
            Register
          </button>
        </div>

        
        
      </div>
    </>
  )
}

export default RegisterForm_2