/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config, handleError } from "@/common/configurations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get user details
export const getUsers = createAsyncThunk(
    "search/getUsers",
    async (formData:{searchKey:string}, { rejectWithValue }) => {
      try {
        console.log(`${URL}//`);
        
        const { data } = await axios.get(`${URL}/profile/users/search?key=${formData.searchKey}`, config);
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );