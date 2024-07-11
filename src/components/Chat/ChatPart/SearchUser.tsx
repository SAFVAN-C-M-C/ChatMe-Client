/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatContext } from "@/context/ChatContext";
import { RootState } from "@/redux/store";
import { IProfile } from "@/types/IProfile";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface SearchUserProps{
    user:IProfile
    setSearchData: Dispatch<SetStateAction<IProfile[] | null>>;
}
const SearchUser:React.FC<SearchUserProps> = ({user,setSearchData}) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();
  const appContext = useContext(ChatContext);

  if (!appContext) {
    throw new Error('useContext must be used within an AppProvider');
  }

  const { chat,getChatSearch} = appContext;
  const handleClick=()=>{
    
    
    getChatSearch(String(user.userId),navigate)
    console.log(chat?._id,"after click");
    
    if(chat?._id){
        navigate(`/chat/u/${chat?._id}`)
        setSearchData([])
        
    }
  }
  return (
    <>
      <div className="user mt-1 flex items-center w-full h-auto hover:bg-slate-300 rounded-md cursor-pointer" onClick={handleClick}>
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
