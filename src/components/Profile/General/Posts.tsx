import { useSelector } from "react-redux";
import PostinGrid from "./PostinGrid";
import { RootState } from "../../../redux/store";

const Posts = () => {
  const { userPosts } = useSelector(
    (state: RootState) => state.userPosts
  );
  return (
    <>
      <div className="post-cover flex justify-start flex-wrap w-[250px] lg:w-[780px] md:w-[630px] h-auto  rounded-xl  mt-12">
        {userPosts?.data.length !== 0
          ? userPosts?.data.map((post, index) => <PostinGrid  key={index} post={post}/>)
          : "No data"}
      </div>
    </>
  );
};

export default Posts;
