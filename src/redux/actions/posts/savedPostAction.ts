/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config, handleError } from "@/common/configurations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

  //get my posts
  export const getSavedPost = createAsyncThunk(
    "post/getSavedPost",
    async (_, { rejectWithValue }) => {
      try {
        const {data} = await axios.get(`${URL}/post/saved`, config);
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );