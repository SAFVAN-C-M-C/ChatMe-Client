/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteReport,
  getReports,
  reportAction,
} from "@/redux/actions/admin/adminReportAction";

export interface AdminReports {
  _id?: string;
  userId?: string;
  suspectId?: string;
  reason?: string;
  postId?: string;
}
export interface AdminReportPayload {
  success: boolean;
  data: AdminReports[];
  totalPages: number;
  currentPage: number;
  message: string;
}
export interface AdminReportState {
  error: any | null;
  adminReport: AdminReportPayload | null;
  loading: boolean;
}

const initialState: AdminReportState = {
  loading: false as boolean,
  adminReport: null as any | null,
  error: null as any | null,
};

const adminReportSlice = createSlice({
  name: "adminReport",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get company details
      .addCase(getReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReports.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.adminReport = payload;
      })
      .addCase(getReports.rejected, (state) => {
        state.loading = false;
        state.adminReport = null;
        state.error = null;
      })
      //report actions
      .addCase(reportAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(reportAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.adminReport = payload;
      })
      .addCase(reportAction.rejected, (state) => {
        state.loading = false;
        state.adminReport = null;
        state.error = null;
      })
      //delete report
      .addCase(deleteReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReport.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.adminReport = payload;
      })
      .addCase(deleteReport.rejected, (state) => {
        state.loading = false;
        state.adminReport = null;
        state.error = null;
      });
  },
});

export const { updateError } = adminReportSlice.actions;

export default adminReportSlice.reducer;
