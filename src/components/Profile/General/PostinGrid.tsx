import { useEffect, useState } from "react";


import { ViewPost } from "../../modals/post/ViewPost";
import { getFileExtension } from "../../../helper/getExtention";
import { IPosts } from "../../../types/IPosts";
import { EditPost } from "../../modals/post/EditPost";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
interface PostinGridProps {
  post: IPosts;
}

const PostinGrid: React.FC<PostinGridProps> = ({ post }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [showPost, setShowPost] = useState(false);
  const [openEditPost,setOpenEditPost]=useState(false)
  const [myPost, setMypost] = useState(false);
  useEffect(()=>{
    
    if(post.userId===user?.data._id){
      setMypost(true)
    }else{
      setMypost(false)
    }
  },[])
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
      {openEditPost?<EditPost post={post} setOpenEditPost={setOpenEditPost}/>:showPost ? <ViewPost myPost={myPost} setOpenEditPost={setOpenEditPost} setOpenViewPost={setShowPost} post={post} /> : null}
      <div
        onClick={handlePostViewOpen}
        className="post bg-slate-600 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px]"
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
