import { RootState } from '@/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';
import PostinGrid from '../General/PostinGrid';

export default function Saved() {
    const { savedPosts } = useSelector(
        (state: RootState) => state.savedPost
      );
      console.log(savedPosts);
      
      return (
        <>
          <div className="post-cover flex justify-start flex-wrap w-[250px] lg:w-[780px] md:w-[630px] h-auto  rounded-xl  mt-12">
            {savedPosts?.data?.savedPost?.length !== 0
              ? savedPosts?.data?.savedPost?.map((post, index) => <PostinGrid  key={index} post={post}/>)
              : "No data"}
          </div>
        </>
      );
}
