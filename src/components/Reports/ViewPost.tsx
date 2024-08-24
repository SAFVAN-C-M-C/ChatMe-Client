/* eslint-disable @typescript-eslint/no-explicit-any */

import { getFileExtension } from "@/helper/getExtention";
import { Dialog } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Comments from "../modals/post/Comments";

import { IComments, IPosts } from "@/types/IPosts";
import NothingHere from "../general/NothingHere";
import axios from "axios";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";

interface ViewPostProps {
  setOpenViewPost: Dispatch<SetStateAction<boolean>>;
  post: IPosts | null;
}
export const ViewPost: React.FC<ViewPostProps> = ({
  setOpenViewPost,
  post,
}) => {
  const handleClose = () => {
    setOpenViewPost(false);
  };

  const [isVideo, setIsVideo] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [comments, setComments] = useState<IComments[]>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setIsVideo(false);
    if (getFileExtension(String(post?.media)) !== "jpeg") {
      setIsVideo(true);
    }
  }, [post?.media]);
  const getComments = async (postId: string, page: number) => {
    try {
      const res = await axios.get(
        `${URL}/post/get/comment/${postId}?page=${page}&limit=9`,
        config
      );

      if (res.status === 200) {
        setComments((prev) => [
          ...prev,
          ...res.data.data.filter(
            (newComment: { _id: string }) =>
              !prev.some(
                (existingComment) => existingComment._id === newComment._id
              )
          ),
        ]);
      }
      if (page >= res.data.totalPages) {
        setHasMore(false);
      }
    } catch (error: any) {
      console.error("something went wrong", error.message);
    }
  };
  useEffect(() => {
    if (post && post._id) {
      getComments(post._id, page);
    }
  }, [post?._id, page, post]);
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
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
              {comments && comments.length > 0 ? (
                comments?.map((comment, index) => (
                  <Comments
                    comments={comments}
                    setComments={setComments}
                    isReply={false}
                    getComments={getComments}
                    key={index}
                    postId={String(post?._id)}
                    postUser={String(post?.userId)}
                    comment={comment}
                  />
                ))
              ) : (
                <NothingHere />
              )}
              {hasMore && (
                <div
                  onClick={loadMore}
                  className="w-full  flex justify-center "
                >
                  Load More
                </div>
              )}
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
