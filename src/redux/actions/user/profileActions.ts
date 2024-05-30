/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "../../../common/configurations";

// get user details
export const getProfileDataFirst = createAsyncThunk(
    "profile/getProfileDataFirst",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${URL}/profile/`, config);
        console.log(data, "here in data of getUserDataFirst");
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );