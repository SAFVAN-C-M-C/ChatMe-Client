import { useState } from "react";
import ViewPost from "./ViewPost";

const PostinGrid = () => {
  const [showPost, setShowPost] = useState(false); 
  const handlePostViewOpen=()=>{
    setShowPost(!showPost)
  }
  return (
    <>
        {
      showPost?<ViewPost handlePostViewOpen={handlePostViewOpen}/>:null
    }
      <div onClick={handlePostViewOpen} className="post bg-blue-500 w-[75px] h-[75px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] m-1 "></div>
    </>
  );
};

export default PostinGrid;
