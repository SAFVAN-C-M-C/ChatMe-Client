/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config, handleError } from "@/common/configurations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

  //get home posts
  export const getJobs = createAsyncThunk(
    "job/getJobs",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${URL}/job/`, config);
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );
  export const searchJobs = createAsyncThunk(
    "job/searchJobs",
    async (formData:{searchKey:string}, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${URL}/job/search?key=${formData.searchKey}`, config);
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );