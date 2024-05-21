import React from "react";

const SugestedUser = () => {
  return (
    <>
      <div className="suggested-user flex justify-between w-[400px] pl-4 pr-4 mt-5">
        <div className="user flex">
          <div className="avatar flex items-center">
            <img
              src="/tests/sample_user_logo.jpg"
              alt=""
              className="w-[40px] h-[40px] rounded-full"
            />
          </div>
          <div className="name ml-3 flex items-center">
            <span>user name</span>
          </div>
        </div>
        <div className="action flex items-center">
          <span className="text-blue-600">Follow</span>
        </div>
      </div>
    </>
  );
};

export default SugestedUser;
