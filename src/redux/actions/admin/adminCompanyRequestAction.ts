/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "../../../common/configurations";
import { URL } from "../../../common/api";

// get user details
export const getAdminCompanyRequestsDetails = createAsyncThunk(
  "admin/getAdminCompanyRequestsDetails",
  async (formData: { page: number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${URL}/admin/companies/requests?page=${formData.page}&limit=10`,
        config
      );
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
export const verifyCompany = createAsyncThunk(
  "admin/verifyCompany",
  async (
    formData: {
      email?: string;
      isVerified?: boolean;
      type?: string | "company" | "user";
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(
        `${URL}/admin/companies/requests/verify`,
        formData,
        config
      );

      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
