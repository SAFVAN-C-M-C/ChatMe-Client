/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "../../../common/configurations";
import { URL } from "../../../common/api";

  //get home posts
  export const getHomePosts = createAsyncThunk(
    "post/getHomePost",
    async (_, { rejectWithValue }) => {
      try {
        console.log("hi there");
        
        const { data } = await axios.get(`${URL}/post/`, config);
        console.log("hi there",data);
        return data;
        
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );