/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import {
  blockCompany,
  getAdminCompanyDetails,
  unBlockCompany,
} from "../../actions/admin/adminCompanyAction";

export interface AdminCompany {
  _id?: string;
  email?: string;
  name?: string;
  userId?: string;
  numberOfReportActions?: number | null;
  isBlocked?: boolean | null;
  CreatedAt?: Date | null;
  isVerified?: boolean;
}
export interface AdminCompaniesPayload {
  success: boolean;
  data: AdminCompany[];
  totalPages: number;
  currentPage: number;
  message: string;
}
export interface AdminCompaniesState {
  error: any | null;
  adminCompanies: AdminCompaniesPayload | null;
  loading: boolean;
}

const initialState: AdminCompaniesState = {
  loading: false as boolean,
  adminCompanies: null as any | null,
  error: null as any | null,
};

const adminCompaniesSlice = createSlice({
  name: "adminCompanies",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get company details
      .addCase(getAdminCompanyDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminCompanyDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.adminCompanies = payload;
      })
      .addCase(getAdminCompanyDetails.rejected, (state) => {
        state.loading = false;
        state.adminCompanies = null;
        state.error = null;
      })
      //block company
      .addCase(blockCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockCompany.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.adminCompanies = payload;
      })
      .addCase(blockCompany.rejected, (state) => {
        state.loading = false;
        state.adminCompanies = null;
        state.error = null;
      })
      //unblock company
      .addCase(unBlockCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(unBlockCompany.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.adminCompanies = payload;
      })
      .addCase(unBlockCompany.rejected, (state) => {
        state.loading = false;
        state.adminCompanies = null;
        state.error = null;
      });
  },
});

export const { updateError } = adminCompaniesSlice.actions;

export default adminCompaniesSlice.reducer;
