import { Icon } from "@iconify/react";
import { IPosts } from "../../redux/reducers/posts/userPosts";
import { useEffect, useState } from "react";
import { getFileExtension } from "../../helper/getExtention";
interface HomePostProps {
  post: IPosts;
}
const HomePost: React.FC<HomePostProps> = ({ post }) => {
  const [isVideo,setIsVideo]=useState(false);
  useEffect(()=>{
    setIsVideo(false)
    if(getFileExtension(String(post.media))!=="jpeg"){
      setIsVideo(true)
    }
  },[])
  return (
    <>
      <div className="post w-[500px] h-auto border-[.4px] border-gray-500  mt-14 rounded-xl flex flex-col">
        <div className="title-part h-[65px]  rounded-t-xl flex items-center justify-between">
          <div className="user flex items-center ml-4">
            <div className="logo">
              <img
                src={post.userAvatar}
                className="w-[35px] h-[35px] rounded-full"
              />
            </div>
            <div className="name flex items-center ml-2">
              <span>{post.name}</span>
            </div>
          </div>
          <div className="option mr-4">
            <Icon icon="mi:options-vertical" width={26} height={26} />
          </div>
        </div>
        <div className="media-part w-[500px] h-[500px] bg-slate-500">
          {
            !isVideo?<img src={post.media} alt="" className="w-full h-full object-cover" />:<video src={post.media} muted controls preload="auto" className="w-full h-full"/>
          }
        </div>
        <div className="bottom-section w-full h-auto rounded-b-xl ">
          <div className="first-row pl-4 mt-1 mb-1">
            <span className="username font-bold ">{post.name}</span>{" "}
            <span>{post.content} </span>
          </div>
          <div className="second-row flex justify-around mt-2 mb-4  ">
            <div className="like flex justify-center items-center">
              <span className="mr-1">{post.likes?.length}</span>
              <Icon className="mr-1" icon="solar:like-bold" width={26} height={26} />
              <span>Like</span>
            </div>
            <div className="comment flex justify-center items-center">
              <span className="mr-1">{post.comments?.length}</span>
              <Icon className="mr-1" icon="iconamoon:comment" width={26} height={26} />
              <span>Comment</span>
            </div>
            <div className="save flex ">
              <Icon icon="lucide:bookmark" width={26} height={26} />
              <span>Save</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePost;
