/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { getAdminRecruiterRequestDetails, verifyRecruiter } from "../../actions/admin/adminRecruiterRequestAction";

export interface AdminRecruiterRequests {
  _id: string;
  email?: string;
  name?: string;
  companyId?: string;
  companyName?: string;
}
export interface AdminRecruiterRequestPayload{
  success:boolean;
  data:AdminRecruiterRequests[];
  message:string;
}
export interface AdminRecruiterRequestState {
  error: any | null;
  adminRecruiterRequests: AdminRecruiterRequestPayload | null;
  loading: boolean;
}

const initialState: AdminRecruiterRequestState = {
  loading: false as boolean,
  adminRecruiterRequests: null as any | null,
  error: null as any | null,
};



const adminRecruiterRequestsSlice = createSlice({
  name: "adminRecruiterRequests",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get user details
      .addCase(getAdminRecruiterRequestDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminRecruiterRequestDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.adminRecruiterRequests = payload;
      })
      .addCase(getAdminRecruiterRequestDetails.rejected, (state) => {
        state.loading = false;
        state.adminRecruiterRequests = null;
        state.error = null;
      })
      //verify recruiter
      .addCase(verifyRecruiter.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyRecruiter.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.adminRecruiterRequests = payload;
      })
      .addCase(verifyRecruiter.rejected, (state) => {
        state.loading = false;
        state.adminRecruiterRequests = null;
        state.error = null;
      });
  },
});

export const { updateError } = adminRecruiterRequestsSlice.actions;

export default adminRecruiterRequestsSlice.reducer;
