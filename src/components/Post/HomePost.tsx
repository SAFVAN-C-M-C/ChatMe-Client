/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";

import React, { useEffect, useState } from "react";
import { getFileExtension } from "../../helper/getExtention";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { config } from "@/common/configurations";
import { URL } from "@/common/api";
import axios from "axios";

import { likePost, unlikePost } from "@/redux/reducers/posts/homePosts";
import { IPosts } from "@/types/IPosts";
import { likeMyPost, unlikeMyPost } from "@/redux/reducers/posts/userPosts";
import { getSavedPost } from "@/redux/actions/posts/savedPostAction";
import { ViewPost } from "../modals/post/ViewPost";
import { Button, Menu, MenuItem } from "@mui/material";
import { deletePost } from "@/redux/actions/posts/userPostsAction";
import toast from "react-hot-toast";
import { EditPost } from "../modals/post/EditPost";
import { useNavigate } from "react-router-dom";
import { followUser, unFollowUser } from "@/redux/actions/user/profileActions";
import SendReportModal from "../modals/Report/SendReportModal";
interface HomePostProps {
  post: IPosts;
}
const HomePost: React.FC<HomePostProps> = ({ post }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { profile } = useSelector((state: RootState) => state.profile);
  const { savedPosts } = useSelector((state: RootState) => state.savedPost);
  const dispatch = useDispatch<AppDispatch>();
  const [isVideo, setIsVideo] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [follow, setFollow] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  useEffect(() => {
    if (post.userId === user?.data._id) {
      setMypost(true);
    } else {
      setMypost(false);
    }
  }, []);
  useEffect(() => {
    if (profile?.data.following?.find((val) => val === post.userId)) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }, [profile?.data.following?.length]);
  useEffect(() => {
    setIsVideo(false);
    if (getFileExtension(String(post.media)) !== "jpeg") {
      setIsVideo(true);
    }
  }, []);
  const handleDelete = () => {
    setOpenEditPost(false);
    setShowPost(false);
    dispatch(deletePost({ _id: String(post._id) }));
    toast.success("Post deleted");
  };
  const handleEditClick = () => {
    setOpenEditPost(true);
    setShowPost(false);
  };
  const handleReportClick=()=>{
    setOpenReport(true)
  }
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [myPost, setMypost] = useState(false);
  useEffect(() => {
    if (savedPosts?.data?.saved?.find((postId) => postId === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [savedPosts?.data?.saved?.length]);
  useEffect(() => {
    if (post.likes?.find((val: string | undefined) => val === user?.data._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post.likes]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUnfollow=()=>{
    try {
      console.log("clicked");
      dispatch(unFollowUser({userId:String(post?.userId)}))
      
      
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  }
  const handlefollow=()=>{
    try {
      console.log("clicked");
      dispatch(followUser({userId:String(post?.userId)}))
      
      
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  }
  const handleSave = async () => {
    try {
      console.log("clicked save", `${URL}/post/save/${post._id}`);

      const response = await axios.put(`${URL}/post/save/${post._id}`, config);
      if (response.status === 200) {
        dispatch(getSavedPost());
      }
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  };
  const handleUnSave = async () => {
    try {
      console.log("clicked unsave");

      const response = await axios.put(
        `${URL}/post/unsave/${post._id}`,
        config
      );
      if (response.status === 200) {
        dispatch(getSavedPost());
      }
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  };
  const handleLike = async () => {
    try {
      console.log("clicked");

      const response = await axios.put(`${URL}/post/like/${post._id}`, config);
      if (response.status === 200) {
        dispatch(
          likePost({ postId: String(post._id), userId: String(user?.data._id) })
        );
        if (post.userId === user?.data._id) {
          dispatch(
            likeMyPost({
              postId: String(post._id),
              userId: String(user?.data._id),
            })
          );
        }
      }
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  };
  const handleUserClick = () => {
    if (myPost) {
      navigate(`/profile`);
      return;
    }
    navigate(`/u/profile/${post.userId}`);
  };
  const handleUnLike = async () => {
    try {
      console.log("clicked");

      const response = await axios.put(
        `${URL}/post/unlike/${post._id}`,
        config
      );
      if (response.status === 200) {
        dispatch(
          unlikePost({
            postId: String(post._id),
            userId: String(user?.data._id),
          })
        );
        if (post.userId === user?.data._id) {
          dispatch(
            unlikeMyPost({
              postId: String(post._id),
              userId: String(user?.data._id),
            })
          );
        }
      }
    } catch (error: any) {
      console.log("something went wrong", error.message);
    }
  };
  return (
    <>
    {
      openReport?<SendReportModal post={post} setOpenReport={setOpenReport}/>:null
    }
      {openEditPost ? (
        <EditPost post={post} setOpenEditPost={setOpenEditPost} />
      ) : showPost ? (
        <ViewPost
          myPost={myPost}
          setOpenEditPost={setOpenEditPost}
          setOpenViewPost={setShowPost}
          post={post}
        />
      ) : null}

<Menu
        id="post-options"
        aria-labelledby="post-options-button"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {myPost ? (
          [
            <MenuItem key="edit" onClick={handleEditClick}>Edit</MenuItem>,
            <MenuItem key="delete" onClick={handleDelete}>Delete</MenuItem>,
          ]
        ) : (
          [
            <MenuItem key="report" onClick={handleReportClick}>Report</MenuItem>,
          ]
        )}
      </Menu>
      <div className="post w-[500px] h-auto border-[.4px] border-gray-500  mt-14 rounded-xl flex flex-col">
        <div className="title-part h-[65px]  rounded-t-xl flex items-center justify-between">
          <div
            className="user flex items-center ml-4 cursor-pointer"
            
          >
            <div className="logo" onClick={handleUserClick}>
              <img
                src={post.userAvatar}
                className="w-[35px] h-[35px] rounded-full"
              />
            </div>
            <div className="name flex items-center ml-2" onClick={handleUserClick}>
              <span>{post.name}</span>
            </div>
            {!myPost ? (
              !follow ? (
                <div className="follow flex items-center ml-2 p-2 bg-blue-500 rounded-md" onClick={handlefollow}>
                  <span className="text-white">Follow</span>
                </div>
              ) : (
                <div className="follow flex items-center ml-2 border-[.3px] border-blue-500 p-2 rounded-md" onClick={handleUnfollow}>
                  <span>Following</span>
                </div>
              )
            ) : null}
          </div>
          <div className="option mr-4">
            <Button
              variant="text"
              id="post-options-button"
              aria-controls={open ? "post-options" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Icon icon="mi:options-vertical" width={26} height={26} />
            </Button>
          </div>
        </div>
        <div className="media-part w-[500px] h-[500px] bg-slate-500">
          {!isVideo ? (
            <img
              src={post.media}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={post.media}
              muted
              controls
              preload="auto"
              className="w-full h-full"
            />
          )}
        </div>
        <div className="bottom-section w-full h-auto rounded-b-xl ">
          <div className="first-row pl-4 mt-1 mb-1">
            <span className="username font-bold ">{post.name}</span>{" "}
            <span>{post.content} </span>
          </div>
          <div className="second-row flex justify-around mt-2 mb-4  ">
            <div className="like flex justify-center items-center">
              <span className="mr-1">{post.likes?.length}</span>
              {liked ? (
                <Icon
                  icon="solar:like-bold"
                  width={26}
                  height={26}
                  className="cursor-pointer"
                  onClick={handleUnLike}
                />
              ) : (
                <Icon
                  onClick={handleLike}
                  icon="solar:like-broken"
                  width={26}
                  className="cursor-pointer"
                  height={26}
                />
              )}
              <span>Like</span>
            </div>
            <div
              className="comment flex justify-center items-center cursor-pointer"
              onClick={() => setShowPost(!showPost)}
            >
              <span className="mr-1">{post.comments?.length}</span>
              <Icon
                className="mr-1 "
                icon="iconamoon:comment"
                width={26}
                height={26}
              />
              <span>Comment</span>
            </div>
            <div className="save flex ">
              {saved ? (
                <Icon
                  icon="mdi:bookmark"
                  width={26}
                  height={26}
                  className="cursor-pointer"
                  onClick={handleUnSave}
                />
              ) : (
                <Icon
                  icon="mdi:bookmark-outline"
                  width={26}
                  height={26}
                  className="cursor-pointer"
                  onClick={handleSave}
                />
              )}
              <span>Save</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePost;
