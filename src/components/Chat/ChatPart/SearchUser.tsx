/* eslint-disable @typescript-eslint/no-unused-vars */
import { useChatContext } from "@/context/ChatContext";
import { IProfile } from "@/types/IProfile";
import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface SearchUserProps {
  user: IProfile;
  setSearchData: Dispatch<SetStateAction<IProfile[] | null>>;
}
const SearchUser: React.FC<SearchUserProps> = ({ user, setSearchData }) => {
  const navigate = useNavigate();

  const { chat, getChatSearch } = useChatContext();
  const handleClick = () => {
    getChatSearch(String(user.userId), navigate);
    if (chat?._id) {
      navigate(`/chat/u/${chat?._id}`);
      setSearchData([]);
    }
  };
  return (
    <>
      <div
        className="user mt-1 flex items-center w-full h-auto hover:bg-blue-300 rounded-md cursor-pointer"
        onClick={handleClick}
      >
        <div className="avatar w-[35px] h-[35px] m-3">
          <img
            src={user?.bio?.avatar || "/general/ChatMe-profile.png"}
            alt="avatar"
            className="w-full h-full"
          />
        </div>
        <div className="name">
          <span className="font-semibold ">{user.name || "Name"}</span>
        </div>
      </div>
    </>
  );
};

export default SearchUser;
