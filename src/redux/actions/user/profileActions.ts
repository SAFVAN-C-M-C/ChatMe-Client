/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "../../../common/configurations";
import { URL } from "../../../common/api";

// get user details
export const getProfileDataFirst = createAsyncThunk(
    "profile/getProfileDataFirst",
    async (_, { rejectWithValue }) => {
      try {
        
        const { data } = await axios.get(`${URL}/profile/`, config);
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );