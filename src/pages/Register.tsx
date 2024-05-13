import React from 'react'
import RegisterForm_1 from '../components/Auth/Register/RegisterForm_1'
import RegisterForm_2 from '../components/Auth/Register/RegisterForm_2'

const Register = () => {
  return (
    <>
        <div className="main-container w-full h-[100vh] flex">
        <div className="hero-image w-[60%] flex justify-center items-center hidden md:flex">
          <img
            src="/login-hero-bg.jpg"
            alt="login"
            className="bg-blend-color-burn"
          />
        </div>
        <div className="register-part w-full md:w-[40%] bg-gray-00 flex items-center justify-center ">
          <RegisterForm_2/>
        </div>
      </div>
    </>
  )
}

export default Register

