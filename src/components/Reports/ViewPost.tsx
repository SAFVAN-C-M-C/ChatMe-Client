/* eslint-disable @typescript-eslint/no-explicit-any */

import { getFileExtension } from "@/helper/getExtention";
import { Dialog } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Comments from "../modals/post/Comments";

import { IPosts } from "@/types/IPosts";


interface ViewPostProps {
  setOpenViewPost: Dispatch<SetStateAction<boolean>>;
  post: IPosts|null;
}
export const ViewPost: React.FC<ViewPostProps> = ({
  setOpenViewPost,
  post,
}) => {
  const handleClose = () => {
    setOpenViewPost(false);
  };
  

  const [isVideo, setIsVideo] = useState(false);
  useEffect(() => {
    setIsVideo(false);
    console.log(getFileExtension(String(post?.media)),"extention");
    
    if (getFileExtension(String(post?.media)) !== "jpeg") {
      setIsVideo(true);
    }
  }, []);

  return (
    <>
      <Dialog open fullWidth={true} maxWidth={"lg"} onClose={handleClose}>
        <div className="main-cover flex">
          <div className="media-part w-[700px] h-[700px] flex justify-center bg-slate-300">
            {!isVideo ? (
              <img
                src={post?.media}
                alt="media"
                className="w-[700px] h-[700px] object-cover"
              />
            ) : (
              <video src={post?.media} muted controls preload="auto" />
            )}
          </div>
          <div className="second-part flex flex-col">
            <div className="header flex items-center justify-between border-b-[.5px] border-gray-500 w-[500px] h-[60px]">
              <div className="user flex ml-3">
                <div className="avatars flex items-center">
                  <img
                    src={post?.userAvatar}
                    alt="avatar"
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </div>
                <div className="name ml-3 flex items-center">
                  <span>{post?.name}</span>
                </div>
              </div>
            </div>
            <div className="comment-list-section border-b-[.5px] border-gray-500 overflow-y-scroll h-[510px] w-[500px]">
              {post?.comments?.map((comment, index) => (
                <Comments
                  key={index}
                  postId={String(post._id)}
                  postUser={String(post.userId)}
                  comment={comment}
                />
              ))}
            </div>
            <div className="first-row pl-4">
              <span className="username font-bold ">{post?.name}</span>{" "}
              <span>{post?.content} </span>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
