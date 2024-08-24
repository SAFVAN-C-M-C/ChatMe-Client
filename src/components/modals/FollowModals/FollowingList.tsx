/* eslint-disable @typescript-eslint/no-explicit-any */
import { darkTheme, lightTheme } from "@/helper/theme";
import { RootState } from "@/redux/store";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { useSelector } from "react-redux";
import User from "./User";

interface FollowingListProps {
  setOpenFollowingList: Dispatch<SetStateAction<boolean>>;
}
const FollowingList: FC<FollowingListProps> = ({ setOpenFollowingList }) => {
  const { profile } = useSelector((state: RootState) => state.profile);

  const handleClose = () => {
    setOpenFollowingList(false);
  };

  return (
    <>
      <ThemeProvider
        theme={profile?.data.theme === "dark" ? darkTheme : lightTheme}
      >
        <CssBaseline />
        <Dialog open onClose={handleClose}>
          <DialogTitle align="center">Following</DialogTitle>
          <DialogContent>
            <div className="w-[300px] lg:w-[400px] h-[75vh] overflow-y-auto overflow-x-hidden  flex flex-col">
              {profile?.data.following &&
              profile?.data.following?.length > 0 ? (
                profile.data.following.map((userId, id) => (
                  <User userId={userId} key={id} />
                ))
              ) : (
                <div className="flex justify-center items-center h-full">
                  <span>You are not following anyone yet</span>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default FollowingList;
