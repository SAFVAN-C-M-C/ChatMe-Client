/* eslint-disable @typescript-eslint/no-explicit-any */

import { getJobs, searchJobs } from "@/redux/actions/jobs/jobAction";
import { createSlice } from "@reduxjs/toolkit";

export interface IJobs {
  _id: string;
  jobTitle?: string;
  companyId?: string;
  recruiterId?: string;
  description?: string;
  type?: string;
  location?: string;
  mode?: string;
  skills?: string[];
  email?: string;
  updatedAt: Date;
  createdAt: Date;
}
export interface JobsPayload {
  success: boolean;
  data: IJobs[];
  message: string;
}
export interface JobsState {
  error: any | null;
  jobs: JobsPayload | null;
  loading: boolean;
}

const initialState: JobsState = {
  loading: false as boolean,
  jobs: null as any | null,
  error: null as any | null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    updateJobsError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get jobs
      .addCase(getJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getJobs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.jobs = payload;
      })
      .addCase(getJobs.rejected, (state) => {
        state.loading = false;
        state.jobs = null;
        state.error = null;
      })
      .addCase(searchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchJobs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.jobs = payload;
      })
      .addCase(searchJobs.rejected, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export const { updateJobsError } = jobsSlice.actions;

export default jobsSlice.reducer;
