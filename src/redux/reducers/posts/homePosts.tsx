/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

import { IPosts } from "./userPosts";
import { getHomePosts } from "../../actions/posts/homePostsActions";


export interface HomePostsPayload {
  success: boolean;
  data: IPosts[];
  message: string;
}
export interface HomePostsState {
  error: any | null;
  homePosts: HomePostsPayload | null;
  loading: boolean;
}

const initialState: HomePostsState = {
  loading: false as boolean,
  homePosts: null as any | null,
  error: null as any | null,
};

const homePostsSlice = createSlice({
  name: "homePosts",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get home post
      .addCase(getHomePosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHomePosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.homePosts = payload;
      })
      .addCase(getHomePosts.rejected, (state) => {
        state.loading = false;
        state.homePosts = null;
        state.error = null;
      })

  },
});

export const { updateError } = homePostsSlice.actions;

export default homePostsSlice.reducer;
