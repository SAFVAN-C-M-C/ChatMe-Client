import { Icon } from "@iconify/react";
import React from "react";
import { IPosts } from "../../../redux/reducers/posts/userPosts";
import { Button, Menu, MenuItem } from "@mui/material";
interface ViewPostProps {
  handlePostViewOpen: () => void;
  post: IPosts;
}
//deprecated

const ViewPost: React.FC<ViewPostProps> = ({ handlePostViewOpen, post }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
      <div className="fixed inset-0 z-40 bg-black opacity-35"></div>
      <div className="fixed inset-0 z-40  flex justify-center items-center">
        <div
          className="closeButton fixed w-auto h-auto top-5 right-5 "
          onClick={handlePostViewOpen}
        >
          <span className="text-3xl text-white">x</span>
        </div>
        <div className="main-cover fixed  z-50 w-[1200px] h-[700px] bg-slate-50 rounded-md flex">
          <div className="media-part w-[700px] h-[700px]">
            <img
              src={post.media}
              alt="media"
              className="w-[700px] h-[700px] object-cover rounded-l-md"
            />
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
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Icon icon="mi:options-vertical" width={26} height={26} />
                </Button>
              </div>
            </div>
            <div className="comment-list-section border-b-[.5px] border-gray-500 overflow-y-scroll h-[510px] w-[500px]"></div>
            <div className="actions flex justify-around mt-4 mb-4">
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
            <div className="comment-section flex items-center border-t-[.5px] w-[500px] h-[58px] mt-4 border-gray-500">
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
      </div>
    </>
  );
};

export default ViewPost;
