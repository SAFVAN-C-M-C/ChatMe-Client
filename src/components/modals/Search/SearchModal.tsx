/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchUser from "./SearchUser";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "@/redux/actions/search/searchUserAction";

import { updateSerachKey } from "@/redux/reducers/Search/searchData";
import { Icon } from "@iconify/react";
import { darkTheme, lightTheme } from "@/helper/theme";
import { IProfile } from "@/types/IProfile";
import SearchPost from "./SearchPost";
import { IPosts } from "@/types/IPosts";
interface SearchModalProps {
  setOpenSearchModal: Dispatch<SetStateAction<boolean>>;
}
const SearchModal: React.FC<SearchModalProps> = ({ setOpenSearchModal }) => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const { searchData } = useSelector((state: RootState) => state.searchData);
  const [filter, setFilter] = useState("user");
  const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => {
    setOpenSearchModal(false);
  };
  const handleClear = () => {
    dispatch(updateSerachKey(null));
    setSerachKey("");
  };
  const [serachKey, setSerachKey] = useState(
    searchData?.key ? searchData.key : ""
  );
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setSerachKey(e.target.value);
    } catch (error: any) {
      console.error("Something went wrong", error.message);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      dispatch(getUsers({ searchKey: serachKey, filter }));
    }, 500);
  }, [dispatch, serachKey, filter]);
  return (
    <>
      <ThemeProvider
        theme={profile?.data.theme === "dark" ? darkTheme : lightTheme}
      >
        <CssBaseline />
        <Dialog
          fullWidth
          maxWidth="md"
          open
          onClose={handleClose}
          // PaperProps={{
          //   component: "form",
          //   onSubmit: handleSubmit

          // }}
        >
          <DialogTitle align="center" fontWeight={700}>
            Search
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                value={serachKey}
                onChange={handleSearch}
                id="input-with-sx"
                label="Search"
                name="search"
                variant="standard"
                fullWidth
              />
              {serachKey !== "" ? (
                <Icon
                  icon={"carbon:close-outline"}
                  width={20}
                  height={20}
                  onClick={handleClear}
                  className="cursor-pointer text-gray-400 hover:text-gray-600"
                />
              ) : null}
            </Box>
            <div className="fitler-part fiter-controller flex gap-3 ml-3 mt-5 mb-5">
              <span
                onClick={() => setFilter("user")}
                className={`px-4 py-2 ${
                  filter === "user"
                    ? profile?.data.theme === "dark"
                      ? "bg-slate-900"
                      : "bg-slate-400"
                    : profile?.data.theme === "dark"
                    ? "bg-slate-600"
                    : "bg-slate-200"
                }  rounded-md cursor-pointer`}
              >
                Users
              </span>
              <span
                onClick={() => setFilter("post")}
                className={`px-4 py-2 ${
                  filter === "post"
                    ? profile?.data.theme === "dark"
                      ? "bg-slate-900"
                      : "bg-slate-400"
                    : profile?.data.theme === "dark"
                    ? "bg-slate-600"
                    : "bg-slate-200"
                } rounded-md cursor-pointer`}
              >
                Posts
              </span>
            </div>
            {filter === "user" ? (
              <div className="w-full h-[300px] overflow-y-scroll flex flex-col">
                {searchData?.data?.length !== 0
                  ? searchData?.data.map((user, index) => (
                      <SearchUser user={user as IProfile} key={index} />
                    ))
                  : "No user Found"}
              </div>
            ) : (
              <div className="w-full h-[400px] overflow-y-scroll flex flex-wrap gap-3">
                {searchData?.data?.length !== 0
                  ? searchData?.data.map((post, index) => (
                      <SearchPost post={post as IPosts} key={index} />
                    ))
                  : "No user Found"}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default SearchModal;
