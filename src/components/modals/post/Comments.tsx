/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { getMyPosts } from "@/redux/actions/posts/userPostsAction";
import { addComment, deleteComment } from "@/redux/reducers/posts/homePosts";
import { AppDispatch, RootState } from "@/redux/store";
import { IComments } from "@/types/IPosts";
import { Icon } from "@iconify/react";
import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import NothingHere from "@/components/general/NothingHere";
interface CommentProps {
  comment: IComments;
  postId: string;
  postUser: string;
  getComments: (postId: string, page: number) => Promise<void>;
  isReply: boolean;
  comments: IComments[];
  setComments: React.Dispatch<React.SetStateAction<IComments[]>>;
}
const Comments: React.FC<CommentProps> = ({
  comment,
  postId,
  postUser,
  getComments,
  isReply,
  comments,
  setComments,
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { profile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [showReply, setShowReply] = useState<boolean>(false);
  const [reply, setReply] = useState("");
  const [replys, setReplys] = useState<IComments[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setReply((prevMessage) => prevMessage + emojiObject.emoji);
  };
  const handleCommentDelete = async (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `${URL}/post/comment/delete/${String(comment._id)}`,
        config
      );

      if (response.status === 200) {
        dispatch(
          deleteComment({
            commentId: String(comment._id),
            postId: String(postId),
          })
        );

        setComments((oldCmnts) => [
          ...oldCmnts.filter((cmnt) => cmnt._id !== comment._id),
        ]);
        if (postUser === user?.data._id) {
          dispatch(getMyPosts());
        }
      }
    } catch (error: any) {
      console.error("Seomething went wrong", error.message);
      toast.error("Something went wrong,please try again!");
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setReply(e.target.value);
  };
  const getReplyComment = async (commentId: string) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${URL}/post/get/comment/reply/${commentId}?page=${page}&limit=3`
      );
      if (res.status === 200) {
        setReplys((prev) => [
          ...prev,
          ...res.data.data.filter(
            (newComment: { _id: string }) =>
              !prev.some(
                (existingComment) => existingComment._id === newComment._id
              )
          ),
        ]);
        if (page >= res.data.totalPages) {
          setHasMore(false);
        }
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Seomething went wrong", error.message);
    }
  };
  const handleShowReply = () => {
    try {
      getReplyComment(comment._id);
      setShowReply(true);
    } catch (error: any) {
      console.error("Seomething went wrong", error.message);
    }
  };

  const handleCommentPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setShowReply(false);
      const formData = new FormData();
      formData.append("comment", reply);
      formData.append("name", String(profile?.data.name));
      formData.append("userAvatar", String(profile?.data.bio.avatar));
      formData.append("postId", postId);
      formData.append("replyId", comment._id);

      const response = await axios.post(
        `${URL}/post/comment`,
        formData,
        config
      );
      if (response.status === 200) {
        dispatch(
          addComment({
            postId,
            comment: response.data.data._id,
          })
        );
        // getComments(postId);
        setComments((prevComments) =>
          prevComments.map((cmnt) =>
            cmnt._id === comment._id
              ? { ...cmnt, replys: cmnt.replys + 1 }
              : cmnt
          )
        );
        if (page >= response.data.totalPages) {
          setHasMore(false);
        }
        setReply("");
        setReplyInput(false);
        if (postUser === user?.data._id) {
          dispatch(getMyPosts());
        }
      }
    } catch (error: any) {
      console.error("Seomething went wrong", error.message);
      toast.error("Something went wrong,please try again!");
    }
  };
  const [replyInput, setReplyInput] = useState(false);
  const handleReplyClick = () => {
    setReplyInput(!replyInput);
  };
  useEffect(() => {
    getReplyComment(comment._id);
  }, [comment._id, page]);
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      <div className="container w-full  h-auto mt-2 flex justify-between">
        <div className="content-part flex">
          <div className="avatar w-[30px] h-[30px] aspect-square rounded-full m-2">
            <img
              src={comment.userAvatar}
              alt="avatar"
              className="w-full h-full  object-cover rounded-full"
            />
          </div>

          <div className="content w-[90%]   h-full">
            <div className="username flex  items-center ">
              <span className="text-gray-900 font-semibold break-all whitespace-pre-wrap">
                {comment.name}
              </span>
            </div>
            <div className="comment ">
              <span className="text-gray-500 font-normal break-all whitespace-pre-wrap">
                {comment.comment}
              </span>
            </div>
            <div className="reply flex items-center gap-3 ">
              {!isReply ? (
                <div
                  className="reply flex gap-1 text-gray-400 hover:text-gray-500 hover:font-medium"
                  onClick={handleReplyClick}
                >
                  <span className="text-sm ">Reply</span>{" "}
                  <Icon
                    className="cursor-pointer "
                    icon={"material-symbols:reply"}
                    width={20}
                    height={20}
                  />
                </div>
              ) : null}
              {comment.replys > 0 ? (
                <div className="text-gray-400 hover:text-gray-500 hover:font-medium">
                  {showReply ? (
                    <span onClick={() => setShowReply(false)}>Hide reply</span>
                  ) : (
                    <span onClick={handleShowReply}>Show reply</span>
                  )}
                </div>
              ) : null}
            </div>
            {replyInput && (
              <form
                onSubmit={handleCommentPost}
                className="relative comment-section flex items-center mt-2"
              >
                {showEmojiPicker && (
                  <div className="emoji-picker-container">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
                <div
                  className="emoji w-[40px] flex justify-center"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Icon icon="mingcute:emoji-line" width={20} height={20} />
                </div>

                <div className="input-section   flex items-center">
                  {" "}
                  <TextField
                    value={reply}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    type="text"
                    placeholder="Add comment..."
                    className="flex items-center focus:outline-none w-full "
                  />
                </div>
                <div className="post-section">
                  <button type="submit" className="text-blue-600">
                    Post
                  </button>
                </div>
              </form>
            )}
            {showReply ? (
              <div className="relative show-reply ">
                {loading ? (
                  "loading"
                ) : replys ? (
                  replys.map((comment, index) => (
                    <Comments
                      comments={comments}
                      setComments={setComments}
                      isReply={true}
                      comment={comment}
                      getComments={getComments}
                      postId={postId}
                      postUser={postUser}
                      key={index}
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
            ) : null}
          </div>
        </div>
        {comment.userId === user?.data._id || postUser === user?.data._id ? (
          <div className="action m-2">
            <Icon
              className="cursor-pointer text-gray-400 hover:text-gray-500"
              icon={"mdi:delete"}
              width={20}
              height={20}
              onClick={handleCommentDelete}
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Comments;
