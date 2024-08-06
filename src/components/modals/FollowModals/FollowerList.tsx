/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { darkTheme, lightTheme } from "@/helper/theme";
import { AppDispatch, RootState } from "@/redux/store";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "./User";


interface FollowerListProps{
    setOpenFollowerList: Dispatch<SetStateAction<boolean>>;
}
const FollowerList:FC<FollowerListProps> = ({setOpenFollowerList}) => {
    const { profile,  } = useSelector((state: RootState) => state.profile);
    const dispatch = useDispatch<AppDispatch>();
    const handleClose = () => {
        setOpenFollowerList(false);
      };
    return (
    
<>
<ThemeProvider
        theme={profile?.data.theme === "dark" ? darkTheme : lightTheme}
      >
        <CssBaseline />
        <Dialog open onClose={handleClose}>
          <DialogTitle align="center">Followers</DialogTitle>
          <DialogContent>
            <div className="w-[300px] lg:w-[400px] h-[75vh] overflow-y-auto overflow-x-hidden  flex flex-col">
            {profile?.data.followers &&
              profile?.data.followers?.length > 0 ? (
                profile.data.followers.map((userId, id) => (
                  <User userId={userId} key={id} />
                ))
              ) : (
                <div className="flex justify-center items-center h-full">
                    <span>No one is following you yet</span>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
</>
  )
}

export default FollowerList