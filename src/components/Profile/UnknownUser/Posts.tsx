import { UserPostsPayload } from "@/redux/reducers/posts/userPosts";
import PostinGrid from "../General/PostinGrid";
import { IPosts } from "@/types/IPosts";

interface PostProps {
  userPosts: UserPostsPayload | null;
}
const Posts: React.FC<PostProps> = ({ userPosts }) => {
  return (
    <>
      <div className="post-cover flex justify-start flex-wrap w-[250px] lg:w-[780px] md:w-[630px] h-auto  rounded-xl  mt-12">
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
