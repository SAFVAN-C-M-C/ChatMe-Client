/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { followUser, unFollowUser } from "@/redux/actions/user/profileActions";
import { AppDispatch, RootState } from "@/redux/store";
import { UserDetails } from "@/types/IProfile";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
interface UserProps {
  userId: string;
}
const User: FC<UserProps> = ({ userId }) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    if (profile?.data.following?.includes(String(userId))) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [profile?.data.following, userId]);
  const getUser = async (userId: string) => {
    try {
      const res = await axios.get(`${URL}/profile/get/user/${userId}`, config);
      if (res.status === 200) {
        setUser(res.data.data);
      }
    } catch (error: any) {
      console.error("Something went wrong", error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser(userId);
    }
  }, [user, userId]);
  const handleUnfollow = () => {
    try {
      dispatch(unFollowUser({ userId: String(userId) }));
    } catch (error: any) {
      console.error("something went wrong", error.message);
    }
  };
  const handlefollow = () => {
    try {
      dispatch(followUser({ userId: String(userId) }));
    } catch (error: any) {
      console.error("something went wrong", error.message);
    }
  };
  const handleUserClick = () => {
    if (userId === profile?.data.userId) {
      navigate(`/profile`);
      return;
    }
    navigate(`/u/profile/${userId}`);
  };
  return (
    <>
      <div className="user-container relative flex items-center rounded-md  ">
        <div
          className="avatar  w-10 m-3 cursor-pointer"
          onClick={handleUserClick}
        >
          <div className="img-container rounded-full w-10">
            <img
              src={user?.avatar ? user.avatar : "/general/ChatMe-profile.png"}
              alt=""
              className="rounded-full w-full h-full"
            />
          </div>
        </div>
        <div className="data flex cursor-pointer" onClick={handleUserClick}>
          <div className="name">
            <span className="font-medium ">
              {user?.name ? user.name : "Name"}
            </span>
          </div>
        </div>

        <div className="follow-up flex justify-center absolute right-0">
          {following ? (
            <span
              onClick={handleUnfollow}
              className="btn btn-outline btn-primary hover:text-white"
            >
              Unfollow
            </span>
          ) : (
            <span onClick={handlefollow} className="btn btn-primary text-white">
              Follow
            </span>
          )}
        </div>
      </div>
      <div className="divider "></div>
    </>
  );
};

export default User;
