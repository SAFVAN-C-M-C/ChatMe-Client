/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "../../../common/configurations";
import { URL } from "../../../common/api";

// get recruiter  details
export const getAdminRecruiterRequestDetails = createAsyncThunk(
  "admin/getAdminRecruiterRequestDetails",
  async (formData: { page: number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${URL}/admin/recruiter/requests?page=${formData.page}&limit=10`,
        config
      );

      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//block company
export const verifyRecruiter = createAsyncThunk(
  "admin/verifyRecruiter",
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
        `${URL}/admin/recruiter/requests/verify`,
        formData,
        config
      );
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
