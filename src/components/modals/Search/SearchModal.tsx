/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,

  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchUser from "./SearchUser";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "@/redux/actions/search/searchUserAction";

import { updateSerachKey } from "@/redux/reducers/Search/searchUsers";
import { Icon } from "@iconify/react";
interface SearchModalProps {
  setOpenSearchModal: Dispatch<SetStateAction<boolean>>;
}
const SearchModal: React.FC<SearchModalProps> = ({ setOpenSearchModal }) => {
    const { searchUser} = useSelector((state: RootState) => state.searchUser);
    console.log(searchUser);
    
    const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => {
    setOpenSearchModal(false);
  };
  const handleClear=()=>{
    dispatch(updateSerachKey(null))
    setSerachKey("")
  }
  const [serachKey,setSerachKey]=useState(searchUser?.key?searchUser.key:"")
  const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    try {
        setSerachKey(e.target.value);
    setTimeout(() => {
        dispatch(getUsers({searchKey:serachKey}))
    }, 500);
    } catch (error:any) {
        console.log("Something went wrong",error.message);
        
    }
  }
  return (
    <>
      <Dialog
        fullWidth
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
            {serachKey!==""?<Icon icon={"carbon:close-outline"} width={20} height={20} onClick={handleClear} className="cursor-pointer text-gray-400 hover:text-gray-600"/>:null}
          </Box>
          <div className="w-full h-[300px] overflow-y-scroll flex flex-col">
            {
                searchUser?.data?.length!==0?searchUser?.data.map((user,index)=>(<SearchUser user={user} key={index}/>)):"No user Found"
            }
            
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchModal;
