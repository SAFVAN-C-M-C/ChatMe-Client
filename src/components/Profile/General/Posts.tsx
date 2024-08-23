import { useSelector } from "react-redux";
import PostinGrid from "./PostinGrid";
import { RootState } from "../../../redux/store";
import { IPosts } from "@/types/IPosts";

const Posts = () => {
  const { userPosts } = useSelector((state: RootState) => state.userPosts);
  return (
    <>
      <div className="flex justify-start flex-wrap w-[80%] h-auto gap-2 mt-12">
        {userPosts?.data.length !== 0
          ? userPosts?.data.map((post, index) => (
              <PostinGrid key={index} post={post as IPosts} />
            ))
          : "No data"}
      </div>
    </>
  );
};

export default Posts;
