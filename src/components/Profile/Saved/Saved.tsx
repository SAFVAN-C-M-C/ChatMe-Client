import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import PostinGrid from "../General/PostinGrid";
import NothingHere from "@/components/general/NothingHere";

export default function Saved() {
  const { savedPosts } = useSelector((state: RootState) => state.savedPost);
  return (
    <>
      <div className="flex justify-start flex-wrap w-[80%] gap-2  h-auto  mt-12">
        {savedPosts?.data?.savedPost?.length !== 0 ? (
          savedPosts?.data?.savedPost?.map((post, index) => (
            <PostinGrid key={index} post={post} />
          ))
        ) : (
          <NothingHere />
        )}
      </div>
    </>
  );
}
