import { useEffect, useState } from "react";


import { ViewPost } from "../../modals/post/ViewPost";
import { getFileExtension } from "../../../helper/getExtention";
import { IPosts } from "../../../types/IPosts";
import { EditPost } from "../../modals/post/EditPost";
interface PostinGridProps {
  post: IPosts;
}

const PostinGrid: React.FC<PostinGridProps> = ({ post }) => {
  const [showPost, setShowPost] = useState(false);
  const [openEditPost,setOpenEditPost]=useState(false)
  const handlePostViewOpen = () => {
    setShowPost(!showPost);
  };
  const [isVideo,setIsVideo]=useState(false);
  useEffect(()=>{
    setIsVideo(false)
    if(getFileExtension(String(post.media))!=="jpeg"){
      setIsVideo(true)
    }
  },[])
  return (
    <>
      {openEditPost?<EditPost post={post} setOpenEditPost={setOpenEditPost}/>:showPost ? <ViewPost setOpenEditPost={setOpenEditPost} setOpenViewPost={setShowPost} post={post} /> : null}
      <div
        onClick={handlePostViewOpen}
        className="post  w-[75px] h-[75px] md:w-[200px] bg-slate-600 md:h-[200px] lg:w-[250px] lg:h-[250px] m-1 "
      >
        {
          !isVideo?
        <img src={post.media} alt="media" className="w-full h-full" />:
        <video src={post.media} className="w-full h-full"/>

        }
      </div>
    </>
  );
};

export default PostinGrid;
