/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "../../../common/configurations";
import { URL } from "../../../common/api";

// get user details
export const getAdminUsersDetails = createAsyncThunk(
    "admin/getUsersData",
    async (_, { rejectWithValue }) => {
      try {
        console.log(`${URL}/admin/users`);
        
        const { data } = await axios.get(`${URL}/admin/users`, config);
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );