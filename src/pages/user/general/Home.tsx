/* eslint-disable @typescript-eslint/no-unused-vars */
import NavigationBar from "../../../components/general/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";

import HomePost from "../../../components/Post/HomePost";

import UseListenMessages from "@/hooks/UseListenMessages";
import UseListenNotification from "@/hooks/UseListenNotification";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";
import { addMorePosts } from "@/redux/reducers/posts/homePosts";
import { CircularProgress } from "@mui/material";
const Home = () => {
  
  UseListenMessages()
  UseListenNotification()
  const { profile } = useSelector((state: RootState) => state.profile);
  const { homePosts } = useSelector((state: RootState) => state.homePosts);

  const dispatch = useDispatch<AppDispatch>();
  console.log("before",homePosts);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${URL}/post/?page=${page}&limit=5`, config);
      
        
        if(response.status===200){
          dispatch(addMorePosts(response.data));
        }
    
        if (page >= response.data.totalPages) {
          setHasMore(false);
        }
        
        
      } catch (err) {
        console.error(err);
      }
    };

    if(page>1){
      
      
      fetchPosts();
      console.log(homePosts);
      
    }
}, [page,dispatch]);
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
          setTimeout(() => {
            setPage(prevPage => prevPage + 1);
          }, 1000);
      }
  }, { threshold: 1.0 });

  if (loader.current) {
      observer.observe(loader.current);
  }

  return () => {
      if (loader.current) {
          observer.unobserve(loader.current);
      }
  };
}, [hasMore]);

const loadMore = () => {
    setPage(prevPage => prevPage + 1);
};
  return (
    <>
      <div data-theme={profile?.data.theme || "light"} className="flex">
        <NavigationBar />
        <div className="home-container w-full flex h-auto lg:pl-[42px]">
          <div className="post-list-cover pb-3 w-[70%] overflow-auto  h-full flex items-center flex-col">
            <div className="greeting w-full h-[50px]  flex items-center pl-4">
              <span>Hello there, </span>
              <span className="font-bold text-lg ml-1">
                {profile?.data?.name}
              </span>
            </div>

            
            {homePosts?.data && homePosts.data.length !== 0
              ? homePosts.data.map((post, index) => (
                  <HomePost post={post} key={index} />
                ))
              : "No data"}
              {hasMore && <div className="mt-2" ref={loader}><CircularProgress /></div>}
              {/* {hasMore && <div onClick={loadMore}>Load More</div>} */}
            
          </div>
          {/* <div className="sugetion-cover w-[30%] h-full">
            <div className="suggetion-fixed flex flex-col fixed w-[400px] right-0 top-20 h-auto ">
              <div className="header flex w-[400px] justify-between p-5">
                <div className="title">
                  <span>Suggested For you</span>
                </div>
                <div className="shuffle">
                  <Icon icon="ph:shuffle" width={26} height={26} />
                </div>
              </div>
              <SugestedUser />
              <SugestedUser />
              <SugestedUser />
              <SugestedUser />
              <SugestedUser />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
