import NavigationBar from "../../../components/general/NavigationBar";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Icon } from "@iconify/react/dist/iconify.js";
import HomePost from "../../../components/Post/HomePost";
import SugestedUser from "../../../components/Home/SugestedUser";
const Home = () => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const { homePosts } = useSelector((state: RootState) => state.homePosts);
  return (
    <>
      <div className="flex">
        <NavigationBar />
        <div className="home-container w-full flex h-auto lg:pl-[42px]">
          <div className="post-list-cover w-[70%]  h-full flex items-center flex-col">
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
          </div>
          <div className="sugetion-cover w-[30%] h-full">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
