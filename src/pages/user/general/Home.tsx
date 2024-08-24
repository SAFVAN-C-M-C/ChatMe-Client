/* eslint-disable react-hooks/exhaustive-deps */
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

import Suggestions from "@/components/Home/Suggestions";
import { getHomePosts } from "@/redux/actions/posts/homePostsActions";
const Home = () => {
  UseListenMessages();
  UseListenNotification();
  const { profile } = useSelector((state: RootState) => state.profile);
  const { homePosts } = useSelector((state: RootState) => state.homePosts);

  const dispatch = useDispatch<AppDispatch>();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  useEffect(() => {
    dispatch(getHomePosts());
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${URL}/post/?page=${page}&limit=5`,
          config
        );

        if (response.status === 200) {
          dispatch(addMorePosts(response.data));
        }

        if (page >= response.data.totalPages) {
          setHasMore(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (page > 1) {
      fetchPosts();
    }
  }, [page, dispatch]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setTimeout(() => {
            setPage((prevPage) => prevPage + 1);
          }, 1000);
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [hasMore]);
  return (
    <>
      <div
        data-theme={profile?.data.theme || "light"}
        className="flex scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100  hover:scrollbar hover:scrollbar-thumb-gray-900 hover:scrollbar-track-gray-100"
      >
        <NavigationBar />
        <div className="home-container w-full flex h-auto lg:pl-[42px] ">
          <div className="post-list-cover pb-3 lg:w-[70%] w-full overflow-auto  h-full flex items-center flex-col">
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
            {hasMore && (
              <div className="mt-2" ref={loader}>
                <CircularProgress />
              </div>
            )}
            {/* {hasMore && <div onClick={loadMore}>Load More</div>} */}
          </div>
          <div className="sugetion-cover hidden lg:flex w-[40%]  h-full">
            <Suggestions />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
