import { getFileExtension } from "@/helper/getExtention";
import { RootState } from "@/redux/store";
import { IPosts } from "@/types/IPosts";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ViewPost } from "../post/ViewPost";
import { EditPost } from "../post/EditPost";

interface SearchPostProps {
  post: IPosts;
}
const SearchPost: FC<SearchPostProps> = ({ post }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [showPost, setShowPost] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const [myPost, setMypost] = useState(false);
  useEffect(() => {
    if (post.userId === user?.data._id) {
      setMypost(true);
    } else {
      setMypost(false);
    }
  }, []);
  const handlePostViewOpen = () => {
    setShowPost(!showPost);
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
      {showPost ? (
        <>
          {openEditPost ? (
            <EditPost post={post} setOpenEditPost={setOpenEditPost} />
          ) : null}
          <ViewPost
            myPost={myPost}
            post={post}
            setOpenEditPost={setOpenEditPost}
            setOpenViewPost={setShowPost}
          />
        </>
      ) : (
        <div
          onClick={handlePostViewOpen}
          className="post  w-[75px] h-[75px] md:w-[200px] bg-slate-600 md:h-[200px] lg:w-[250px] lg:h-[250px] m-1 "
        >
          {!isVideo ? (
            <img src={post.media} alt="media" className="w-full h-full" />
          ) : (
            <video src={post.media} className="w-full h-full" />
          )}
        </div>
      )}
    </>
  );
};

export default SearchPost;
