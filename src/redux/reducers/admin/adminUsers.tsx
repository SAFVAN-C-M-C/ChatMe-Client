/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import {
  blockUser,
  getAdminUsersDetails,
  unBlockUser,
} from "../../actions/admin/adminUserAction";

export interface AdminUsers {
  _id?: string;
  email?: string;
  name?: string;
  userId?: string;
  numberOfReportActions?: number | null;
  isBlocked?: boolean | null;
  CreatedAt?: Date | null;
  isVerified?: boolean;
}
export interface AdminUserPayload {
  success: boolean;
  data: AdminUsers[];
  totalPages: number;
  currentPage: number;
  message: string;
}
export interface AdminUserState {
  error: any | null;
  adminUser: AdminUserPayload | null;
  loading: boolean;
}

const initialState: AdminUserState = {
  loading: false as boolean,
  adminUser: null as any | null,
  error: null as any | null,
};

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get user details
      .addCase(getAdminUsersDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminUsersDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.adminUser = payload;
      })
      .addCase(getAdminUsersDetails.rejected, (state) => {
        state.loading = false;
        state.adminUser = null;
        state.error = null;
      })
      //block user
      .addCase(blockUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.adminUser = payload;
      })
      .addCase(blockUser.rejected, (state) => {
        state.loading = false;
        state.adminUser = null;
        state.error = null;
      })
      //unblock user
      .addCase(unBlockUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(unBlockUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.adminUser = payload;
      })
      .addCase(unBlockUser.rejected, (state) => {
        state.loading = false;
        state.adminUser = null;
        state.error = null;
      });
  },
});

export const { updateError } = adminUserSlice.actions;

export default adminUserSlice.reducer;
