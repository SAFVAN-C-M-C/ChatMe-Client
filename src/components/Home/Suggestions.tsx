/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
import SugestedUser from "./SugestedUser";
import { useEffect, useState } from "react";
import { SuggestedUsers } from "@/types/IProfile";
import axios from "axios";
import { URL } from "@/common/api";
import { config } from "@/common/configurations";

const Suggestions = () => {
  const [users, setUsers] = useState<SuggestedUsers[] | null>(null);
  const getSuggestedUsers = async () => {
    try {
      const res = await axios.get(`${URL}/profile/get/suggestions`, config);
      if (res.status === 200) {
        setUsers(res.data.data);
      }
    } catch (error: any) {
      console.log("Something wrong", error.message);
    }
  };
  const handleShuffleClick = () => {
    console.log("clicked");
    getSuggestedUsers();
  };
  useEffect(() => {
    if (!users) {
      getSuggestedUsers();
    }
  }, [users]);
  return (
    <>
      <div className="suggetion-fixed flex flex-col  w-[400px]  h-auto ">
        <div className="header flex w-[400px] justify-between p-5">
          <div className="title">
            <span>Suggested For you</span>
          </div>
          <div className="shuffle">
            <Icon
              icon="ph:shuffle"
              width={26}
              height={26}
              className="cursor-pointer"
              onClick={handleShuffleClick}
            />
          </div>
        </div>
        {users &&
          users.map((user, index) => <SugestedUser user={user} key={index} />)}
      </div>
    </>
  );
};

export default Suggestions;
