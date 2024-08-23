/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "../../../common/configurations";
import { URL } from "../../../common/api";

// get user details
export const getAdminUsersDetails = createAsyncThunk(
  "admin/getUsersData",
  async (formData: { page: number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${URL}/admin/users?page=${formData.page}&limit=10`,
        config
      );
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//block company
export const blockUser = createAsyncThunk(
  "admin/blockUser",
  async (
    formData: {
      userId?: string;
      isBlocked?: boolean;
      type?: string | "company" | "user";
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(
        `${URL}/admin/user/block`,
        formData,
        config
      );

      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
//block company
export const unBlockUser = createAsyncThunk(
  "admin/unBlockUser",
  async (
    formData: {
      email?: string;
      isBlocked?: boolean;
      type?: string | "company" | "user";
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(
        `${URL}/admin/user/unblock`,
        formData,
        config
      );

      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
