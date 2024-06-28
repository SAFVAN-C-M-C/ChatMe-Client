import { Icon } from "@iconify/react";
import { Button, Dialog, Menu, MenuItem } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { getFileExtension } from "../../../helper/getExtention";
import { IPosts } from "../../../types/IPosts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import toast from "react-hot-toast";
import { deletePost } from "../../../redux/actions/posts/userPostsAction";

interface ViewPostProps {
  setOpenViewPost: Dispatch<SetStateAction<boolean>>;
  setOpenEditPost: Dispatch<SetStateAction<boolean>>;
  post: IPosts;
}
export const ViewPost: React.FC<ViewPostProps> = ({
  setOpenViewPost,
  post,
  setOpenEditPost
}) => {
  const { error } = useSelector((state: RootState) => state.userPosts);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  const handleClose = () => {
    setOpenViewPost(false);
  };
  const handleDelete=()=>{
    setOpenEditPost(false)
    setOpenViewPost(false);
    dispatch(deletePost({_id:String(post._id)}))
    toast.success("Post deleted")
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEditClick = () => {
    setOpenEditPost(true)
    setOpenViewPost(false)
  };
  const [isVideo, setIsVideo] = useState(false);
  useEffect(() => {
    setIsVideo(false);
    if (getFileExtension(String(post.media)) !== "jpeg") {
      setIsVideo(true);
    }
  }, []);
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
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
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
              <div className="user flex ml-3">
                <div className="avatar flex items-center">
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
            <div className="comment-list-section border-b-[.5px] border-gray-500 overflow-y-scroll h-[510px] w-[500px]"></div>
            <div className="first-row pl-4">
              <span className="username font-bold ">{post.name}</span>{" "}
              <span>{post.content} </span>
            </div>
            <div className="actions flex justify-around mt-2 ">
              <div className="like flex items-center">
                <span className="mr-1">{post.likes?.length}</span>
                <Icon icon="solar:like-bold" width={26} height={26} />
                <span>Like</span>
              </div>
              <div className="comment flex items-center">
                <span className="mr-1">{post.comments?.length}</span>
                <Icon icon="iconamoon:comment" width={26} height={26} />
                <span>Comment</span>
              </div>
              <div className="save flex items-center">
                <Icon icon="lucide:bookmark" width={26} height={26} />
                <span>Save</span>
              </div>
            </div>
            <div className="comment-section flex items-center border-t-[.5px] w-[500px] h-[58px] mt-2 border-gray-500">
              <div className="emoji w-[50px] flex justify-center">
                <Icon icon="fluent:emoji-32-filled" width={26} height={26} />
              </div>
              <div className="input-section w-[390px]  flex items-center">
                {" "}
                <input
                  type="text"
                  placeholder="Add comment..."
                  className="flex items-center focus:outline-none w-full h-full"
                />
              </div>
              <div className="post-section">
                <span className="text-blue-600">Post</span>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
