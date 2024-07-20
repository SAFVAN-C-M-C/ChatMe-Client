/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TextField } from '@mui/material'
import React, { FC, useState } from 'react'
import SearchIcon from "@mui/icons-material/Search";
import { getUsers } from '@/redux/actions/search/searchUserAction';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import axios from 'axios';
import { URL } from '@/common/api';
import { config } from '@/common/configurations';
import { IProfile } from '@/types/IProfile';
import SearchUser from './ChatPart/SearchUser';

interface SearchInputProps{
  serachRef:React.MutableRefObject<HTMLInputElement | null>
}
const SearchInput:FC<SearchInputProps> = ({serachRef}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchData,setSearchData]=useState<IProfile[] | null>([])
    const [serachKey,setSerachKey]=useState("")
    const { profile } = useSelector(
      (state: RootState) => state.profile
    );
    const getUsers=async(key:string)=>{
        const { data } = await axios.get(`${URL}/profile/users/search?key=${key}`, config);
        setSearchData(data.data)

    }
    const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
        try {
            setSerachKey(e.target.value);
        setTimeout(() => {
            
            getUsers(serachKey)
        }, 500);
        } catch (error:any) {
            console.log("Something went wrong",error.message);
            
        }
      }
      const handleClear=()=>{
        // dispatch(updateSerachKey(null))
        setSerachKey("")
        setSearchData([])
      }
  return (
    <>
        <div className='flex items-end mr-3 ml-3 mb-5'>
            <SearchIcon   sx={{ color: `${profile?.data.theme==="dark"?"white":"action.active"}`, mr: 1, my: 0.5 }} />
            <TextField
              
              sx={{input:{color:`${profile?.data.theme==="dark"?"white":"action.active"}`},label:{color:`${profile?.data.theme==="dark"?"white":"action.active"}`}}}
              inputRef={serachRef}
              value={serachKey}
              onChange={handleSearch}
              id="input-with-sx"
              label="Search"
              name="search"
              variant="standard"
              fullWidth
            />
            {serachKey!==""?<Icon icon={"carbon:close-outline"} width={20} height={20} onClick={handleClear} className="cursor-pointer text-gray-400 hover:text-gray-600"/>:null}
          </div>
          {searchData && searchData.length!==0?<div className={`w-auto left-[80px] px-14 pt-3 pb-3 h-auto  absolute z-50 ${profile?.data.theme==="dark"?"bg-gray-600":"bg-slate-300"} overflow-y-auto flex flex-col`}>
            {
                searchData?.map((user,index)=>(<SearchUser user={user} key={index} setSearchData={setSearchData}/>))
            }
            
          </div>:null}
    </>
  )
}

export default SearchInput