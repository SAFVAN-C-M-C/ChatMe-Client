import { RootState } from "@/redux/store";
import { IProfile } from "@/types/IProfile";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface SearchUserProps{
    user:IProfile
}
const SearchUser:React.FC<SearchUserProps> = ({user}) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();
  const handleClick=()=>{
    if(user.userId===profile?.data.userId){
      navigate(`/profile`)
      return
    }
    navigate(`/u/profile/${user.userId}`)
  }
  return (
    <>
      <div className="user mt-1 flex items-center w-full h-auto hover:bg-slate-200 rounded-md" onClick={handleClick}>
        <div className="avatar w-[35px] h-[35px] m-3">
          <img src={user?.bio?.avatar ||  "/general/ChatMe-profile.png"} alt="avatar"  className="w-full h-full"/>
        </div>
        <div className="name">
            <span className="font-semibold ">{user.name||"Name"}</span>
        </div>
      </div>
    </>
  );
};

export default SearchUser;
