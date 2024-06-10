import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { verifyOTP } from "../../redux/actions/user/userActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../common/api";

axios.defaults.withCredentials = true;

const OtpVerification = () => {
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate=useNavigate();

  //local states
  const [resendButton,setResendButton]=useState<boolean>(false)
  const [timer, setTimer] = useState<number | null>(null);
  const [timerValue, setTimerValue] = useState<string>("01:59");
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);



  //event handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (index < 6 - 1 && value !== "") {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(otp.length<6){
      toast.error("enter otp")
      return
    }
    
    const newOtp=otp.join('')
    const newData={
      data:{
        otp:newOtp,
        type:user?.data?.otpType
      },
    }
    
    dispatch(verifyOTP(newData))
  }
  
  const resendOTP = async () => {
    try {
      await axios.get(`${URL}/notification/email-verification`,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setTimer(null);
      startTimer(119000);
      toast.success("OTP resent successfully");
    } catch (error:any) {
      
      toast.error("Failed to resend OTP");
    }
  };
  const startTimer = (time: number) => {
    const endTime = Date.now() + time;
    const interval = setInterval(() => {
      const timeRemaining = endTime - Date.now();
      if (timeRemaining <= 0) {
        clearInterval(interval);
        setTimer(null);
        setTimerValue("00:00");
        localStorage.removeItem("timerValue");
        localStorage.removeItem("timerEnd");
        // You can also show the resend button here
        setResendButton(true)
      } else {
        if(resendButton){
            setResendButton(false)
        }
        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        setTimerValue(`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`);
        localStorage.setItem("timerValue", `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`);
        localStorage.setItem("timerEnd", String(endTime));
      }
    }, 1000);
    setTimer(interval);
  };



  //useefects
  useEffect(() => {
    
    const storedTimerValue = localStorage.getItem("timerValue");
    const storedTimerEnd = localStorage.getItem("timerEnd");
    if (storedTimerValue && storedTimerEnd) {
      const storedTimerEndMs = parseInt(storedTimerEnd);
      const timeRemaining = storedTimerEndMs - Date.now();

    //   if (timeRemaining > 0) {
        startTimer(timeRemaining);
    //   }
    } else {

      startTimer(119000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (user?.success && user?.data?.reset ) {
      console.log("here");
      
      navigate('/update-password' ,{replace:true })
    }
    if (user?.success && user?.data?.details) {
      console.log("there");
      navigate('/register' ,{replace:true })
    }
  }, [user]);
  return (
    <>
      <div className="otp-container bg-white rounded-lg w-[90%] m-2 h-[300px] lg:w-[80%] md:w-[90%] sm:w-[60%] flex flex-col items-center">
        <div className="otp-tilte mt-14 ">
          <strong className="text-xl">Enter the OTP</strong>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="otp-input flex items-center justify-center mt-8">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="w-10 h-10 sm:w-12 sm:h-12   mx-2 border-b-2 border-gray-300 bg-slate-200 rounded-md text-center focus:outline-none focus:border-blue-500"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(ref) =>
                (inputRefs.current[index] = ref as HTMLInputElement)
              }
            />
          ))}
        </div>
          <div className="time-container w-full h-[50px] flex justify-between">
            <div className="time-remaining m-4">
                Time Remaining : <span className="font-semibold">
                    {/* {minutes<10?`0${minutes}`:minutes}: {seconds<10?`0${seconds}`:seconds} */}
                    {timerValue}
                </span>
            </div>
            <div className="resend m-4">
                {
                     !resendButton ?<p className="opacity-40">Resend OTP</p>:<a className="" onClick={resendOTP}>Resend OTP</a>
                }
                
            </div>
          </div>
        <div className="submit-button w-[30%] h-[40px] bg-blue-600 rounded-full mt-5">
          <button
            className="w-full h-full text-white flex justify-center items-center"
            type="submit"
          >
            Submit
          </button>
        </div>
        </form>
        {/* <div className="new-user mt-3">
          New user?<a href="/">Resend</a>
        </div> */}
      </div>
    </>
  );
};

export default OtpVerification;
