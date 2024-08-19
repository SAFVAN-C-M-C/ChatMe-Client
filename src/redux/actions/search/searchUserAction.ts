/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config, handleError } from "@/common/configurations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get serach details
export const getUsers = createAsyncThunk(
    "search/getUsers",
    async (formData:{searchKey:string,filter:string}, { rejectWithValue }) => {
      try {
        let url=`${URL}/profile/users/search?key=${formData.searchKey}`
        if(formData.filter==="post"){
          url=`${URL}/post/posts/search?key=${formData.searchKey}`
        }
        const { data } = await axios.get(url, config);
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );