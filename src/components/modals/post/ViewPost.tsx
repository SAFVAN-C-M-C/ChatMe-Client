/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
import { Button, Dialog, Menu, MenuItem, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { getFileExtension } from "../../../helper/getExtention";
import { IPosts } from "../../../types/IPosts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import toast from "react-hot-toast";
import {
  deletePost,
  getMyPosts,
} from "../../../redux/actions/posts/userPostsAction";
import axios from "axios";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";

import {
  addComment,
  likePost,
  unlikePost,
} from "@/redux/reducers/posts/homePosts";
import { likeMyPost, unlikeMyPost } from "@/redux/reducers/posts/userPosts";
import { getSavedPost } from "@/redux/actions/posts/savedPostAction";
import Comments from "./Comments";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface ViewPostProps {
  setOpenViewPost: Dispatch<SetStateAction<boolean>>;
  setOpenEditPost: Dispatch<SetStateAction<boolean>>;
  post: IPosts;
  myPost: boolean;
}
export const ViewPost: React.FC<ViewPostProps> = ({
  setOpenViewPost,
  post,
  setOpenEditPost,
  myPost,
}) => {
  const { error } = useSelector((state: RootState) => state.userPosts);
  const { user } = useSelector((state: RootState) => state.user);
  const { profile } = useSelector((state: RootState) => state.profile);
  const { savedPosts } = useSelector((state: RootState) => state.savedPost);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setComment((prevMessage) => prevMessage + emojiObject.emoji);
  };
  useEffect(() => {
    if (post.likes?.find((val) => val === user?.data._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post.likes]);
  useEffect(() => {
    if (savedPosts?.data?.saved?.find((postId) => postId === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [savedPosts?.data?.saved?.length]);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
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
  const handleClose = () => {
    setOpenViewPost(false);
  };
  const handleDelete = () => {
    setOpenEditPost(false);
    setOpenViewPost(false);
    dispatch(deletePost({ _id: String(post._id) }));
    toast.success("Post deleted");
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEditClick = () => {
    setOpenEditPost(true);
    setOpenViewPost(false);
  };
  const [isVideo, setIsVideo] = useState(false);
  useEffect(() => {
    setIsVideo(false);
    if (getFileExtension(String(post.media)) !== "jpeg") {
      setIsVideo(true);
    }
  }, []);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };
  const handleCommentPost = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("comment", comment);
      formData.append("name", String(profile?.data.name));
      formData.append("userAvatar", String(profile?.data.bio.avatar));
      formData.append("postId", String(post._id));
      const response = await axios.post(
        `${URL}/post/comment`,
        formData,
        config
      );
      if (response.status === 200) {
        dispatch(
          addComment({
            postId: String(post._id),
            comment: {
              _id: String(response.data.data),
              comment: String(formData.get("comment")),
              likes: [],
              name: String(profile?.data.name),
              userAvatar: String(profile?.data.bio.avatar),
              userId: String(user?.data._id),
            },
          })
        );
        if (post.userId === user?.data._id) {
          dispatch(getMyPosts());
        }
      }
    } catch (error: any) {
      console.log("Seomething went wrong", error.message);
      toast.error("Something went wrong,please try again!");
    }
  };
  return (
    <>
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
        {myPost ? <MenuItem onClick={handleEditClick}>Edit</MenuItem> : null}
        {myPost ? <MenuItem onClick={handleDelete}>Delete</MenuItem> : null}

        {!myPost ? <MenuItem onClick={handleEditClick}>Report</MenuItem> : null}
      </Menu>
      <Dialog open fullWidth={true} maxWidth={"lg"} onClose={handleClose}>
        <div className="main-cover flex">
          <div className="media-part w-[700px] h-[700px] flex justify-center bg-slate-300">
            {!isVideo ? (
              <img
                src={post.media}
                alt="media"
                className="w-[700px] h-[700px] object-cover"
              />
            ) : (
              <video src={post.media} muted controls preload="auto" />
            )}
          </div>
          <div className="second-part flex flex-col">
            <div className="header flex items-center justify-between border-b-[.5px] border-gray-500 w-[500px] h-[60px]">
              <div className=" user flex ml-3">
                <div className="flex items-center">
                  <img
                    src={post.userAvatar}
                    alt="avatar"
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </div>
                <div className="name ml-3 flex items-center">
                  <span>{post.name}</span>
                </div>
              </div>
              <div className="option mr-3">
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
            <div className="comment-list-section border-b-[.5px] border-gray-500 overflow-y-scroll h-[510px] w-[500px]">
              {post.comments?.map((comment, index) => (
                <Comments
                  key={index}
                  postId={String(post._id)}
                  postUser={String(post.userId)}
                  comment={comment}
                />
              ))}
            </div>
            <div className="first-row pl-4">
              <span className="username font-bold ">{post.name}</span>{" "}
              <span>{post.content} </span>
            </div>
            <div className="actions flex justify-around mt-2 ">
              <div className="like flex items-center">
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
              <div className="comment flex items-center">
                <span className="mr-1">{post.comments?.length}</span>
                <Icon icon="iconamoon:comment" width={26} height={26} />
                <span>Comment</span>
              </div>
              <div className="save flex items-center">
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
            <div className="relative comment-section flex items-center border-t-[.5px] w-[500px] h-[58px] mt-2 border-gray-500">
              {showEmojiPicker && (
                <div className="emoji-picker-container">
                  <EmojiPicker  onEmojiClick={onEmojiClick} />
                </div>
              )}
              <div
                className="emoji w-[50px] flex justify-center"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Icon icon="mingcute:emoji-line" width={26} height={26} />
              </div>
              <div className="input-section w-[390px]  flex items-center">
                {" "}
                <TextField
                  fullWidth
                  value={comment}
                  onChange={handleCommentChange}
                  variant="filled"
                  type="text"
                  placeholder="Add comment..."
                  className="flex items-center focus:outline-none w-full h-full"
                />
              </div>
              <div className="post-section">
                <span onClick={handleCommentPost} className="text-blue-600">
                  Post
                </span>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
