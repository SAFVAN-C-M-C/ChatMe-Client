import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import { validatePassword } from "../../helper/validate"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { updatePassword } from "../../redux/actions/user/userActions"
import { useNavigate } from "react-router-dom"


const ResetPassword = () => {
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const navigate=useNavigate()
  const dispatch = useDispatch<AppDispatch>();



    const [showPassword,setShowPassword]=useState<boolean>(false)
    const [password,setPassword]=useState<string>("");
    const [confirmPassword,setConfirmPassword]=useState<string>("")
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.name==="password"){
          setPassword(e.target.value)
        }
        if(e.target.name==="confirmPassword"){
          setConfirmPassword(e.target.value)
        }
    }
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      if(!validatePassword(password)){
        toast.error("Password must contain 8 characters")
        return
      }
      if(confirmPassword.length<8 || confirmPassword!==password){
        toast.error("Password don't match up")
        return
      }
      dispatch(updatePassword(password))
    }
    useEffect(()=>{
      if(error){
        toast.error(error)
      }
    },[error]);
    useEffect(() => {
      if (user?.success && user?.message==="Password updated successfully" ) {
        navigate('/login' ,{replace:true })
      }
    }, [user]);
  return (
    <>
      <div className="forgot-container bg-white rounded-lg w-[90%] m-2 h-[350px] lg:w-[80%] md:w-[90%] sm:w-[60%] flex flex-col items-center">
        <div className="forgot-tilte mt-14 ">
          <strong className="text-xl">Reset Password</strong>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <div className=" pl-3 email-field mt-10 bg-slate-200 w-[80%] h-[50px] rounded-md flex items-center">
              <Icon icon="bx:bxs-lock-alt" width={24} height={24} className="mr-2 text-gray-400"/>
              <input
              onChange={handleChange}
              name="password"
                type={showPassword?"text":"password"}
                className="w-full h-full bg-transparent"
                placeholder="Enter new password"
              />
             <Icon icon={showPassword?`mdi:eye-off`:`mdi:eye`} width={24} height={24} className="mr-2 text-gray-400" onClick={()=>setShowPassword(!showPassword)}/>
             
              
        </div>
        <div className=" pl-3 email-field mt-5 bg-slate-200 w-[80%] h-[50px] rounded-md flex items-center">
              <Icon icon="bx:bxs-lock-alt" width={24} height={24} className="mr-2 text-gray-400"/>
              <input
              onChange={handleChange}
              name="confirmPassword"
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
        </form>
      </div>  
    </>
  )
}

export default ResetPassword