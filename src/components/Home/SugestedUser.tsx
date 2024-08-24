/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { followUser, unFollowUser } from "@/redux/actions/user/profileActions";
import { AppDispatch, RootState } from "@/redux/store";
import { SuggestedUsers } from "@/types/IProfile";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface SuggestedUsersProps {
  user: SuggestedUsers;
}
const SugestedUser: FC<SuggestedUsersProps> = ({ user }) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [follow, setFollow] = useState(false);
  useEffect(() => {
    if (profile?.data.following?.find((val) => val === user.userId)) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }, [profile?.data.following, user.userId]);
  const handleUserClick = () => {
    navigate(`/u/profile/${user.userId}`);
  };
  const handleUnfollow = () => {
    dispatch(unFollowUser({ userId: String(user?.userId) }));
  };
  const handlefollow = () => {
    dispatch(followUser({ userId: String(user?.userId) }));
  };
  return (
    <>
      <div className="suggested-user flex justify-between w-[400px] pl-4 pr-4 mt-5">
        <div onClick={handleUserClick} className="user flex">
          <div className="avatars flex items-center">
            <img
              src={
                user?.bio?.avatar
                  ? String(user.bio.avatar)
                  : "/general/ChatMe-profile.png"
              }
              alt=""
              className="w-[40px] h-[40px] rounded-full"
            />
          </div>
          <div className="name ml-3 flex items-center">
            <span>{user.name}</span>
          </div>
        </div>
        <div className="action flex items-center">
          {follow ? (
            <span
              className="text-blue-600 cursor-pointer"
              onClick={handleUnfollow}
            >
              Following
            </span>
          ) : (
            <span
              className="text-blue-600 cursor-pointer"
              onClick={handlefollow}
            >
              Follow
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default SugestedUser;
