/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import {
  getAdminCompanyRequestsDetails,
  verifyCompany,
} from "../../actions/admin/adminCompanyRequestAction";

export interface AdminCompanyRequests {
  _id?: string;
  email?: string;
  name?: string;
  userId?: string;
  numberOfReportActions?: number | null;
  IsBlocked?: boolean | null;
  CreatedAt?: Date | null;
  isVerified?: boolean;
}
export interface AdminCompanyRequestPayload {
  success: boolean;
  data: AdminCompanyRequests[];
  totalPages: number;
  currentPage: number;
  message: string;
}
export interface AdminCompanyRequestState {
  error: any | null;
  adminCompanyRequests: AdminCompanyRequestPayload | null;
  loading: boolean;
}

const initialState: AdminCompanyRequestState = {
  loading: false as boolean,
  adminCompanyRequests: null as any | null,
  error: null as any | null,
};

const adminCompanyRequestsSlice = createSlice({
  name: "adminCompanyRequests",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get user details
      .addCase(getAdminCompanyRequestsDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAdminCompanyRequestsDetails.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.error = null;
          state.adminCompanyRequests = payload;
        }
      )
      .addCase(getAdminCompanyRequestsDetails.rejected, (state) => {
        state.loading = false;
        state.adminCompanyRequests = null;
        state.error = null;
      })
      //verify company
      .addCase(verifyCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyCompany.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.adminCompanyRequests = payload;
      })
      .addCase(verifyCompany.rejected, (state) => {
        state.loading = false;
        state.adminCompanyRequests = null;
        state.error = null;
      });
  },
});

export const { updateError } = adminCompanyRequestsSlice.actions;

export default adminCompanyRequestsSlice.reducer;
