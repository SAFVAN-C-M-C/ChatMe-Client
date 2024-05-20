import  { useEffect } from 'react'
import RegisterForm_1 from '../../../components/Auth/Register/RegisterForm_1'
import RegisterForm_2 from '../../../components/Auth/Register/RegisterForm_2'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../redux/store';

const Register = () => {
  const { user } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <>
        <div className="main-container w-full h-[100vh] flex">
        <div className="hero-image w-[60%] flex justify-center items-center hidden md:flex">
          <img
            src="/general/login-hero-bg.jpg"
            alt="login"
            className="bg-blend-color-burn"
          />
        </div>
        <div className="register-part w-full md:w-[40%] bg-gray-00 flex items-center justify-center ">
          {
            user && !user.isDetailsComplete?  <RegisterForm_2/>:<RegisterForm_1/>
          }
        </div>
      </div>
    </>
  )
}

export default Register

