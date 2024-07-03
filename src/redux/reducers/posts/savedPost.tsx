/* eslint-disable @typescript-eslint/no-explicit-any */

import { getSavedPost } from "@/redux/actions/posts/savedPostAction";
import { ISavedPosts } from "@/types/IPosts";
import { createSlice } from "@reduxjs/toolkit";


export interface SavedPostsPayload {
  success: boolean;
  data: ISavedPosts;
  message: string;
}
export interface SavedPostsState {
  error: any | null;
  savedPosts: SavedPostsPayload | null;
  loading: boolean;
}

const initialState: SavedPostsState = {
  loading: false as boolean,
  savedPosts: null as any | null,
  error: null as any | null,
};

const savedPostsSlice = createSlice({
  name: "savedPosts",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get saved post
      .addCase(getSavedPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSavedPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.savedPosts = payload;
      })
      .addCase(getSavedPost.rejected, (state) => {
        state.loading = false;
        state.savedPosts = null;
        state.error = null;
      });
  },
});

export const { updateError} = savedPostsSlice.actions;

export default savedPostsSlice.reducer;
