import React from "react";
import PostinGrid from "./PostinGrid";

const Posts = () => {
  return (
    <>
      <div className="post-cover flex justify-start flex-wrap w-[250px] lg:w-[780px] md:w-[630px] h-auto  rounded-xl  mt-12">
        <PostinGrid />
        <PostinGrid />
        <PostinGrid />
        <PostinGrid />
        <PostinGrid />
        <PostinGrid />
        <PostinGrid />
        <PostinGrid />
      </div>
    </>
  );
};

export default Posts;
