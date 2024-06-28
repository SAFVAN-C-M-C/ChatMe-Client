/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { createPosts, deletePost, editPost, getMyPosts } from "../../actions/posts/userPostsAction";
import { IComments } from "../../../types/IPosts";

export interface IUserPosts {
  _id?: string;
  email?: string;
  name?: string;
  userId?: string;
  media?: string;
  userAvatar?:string
  content?: string;
  likes?: string[];
  comments?: IComments[];
}
export interface UserPostsPayload {
  success: boolean;
  data: IUserPosts[];
  message: string;
}
export interface UserPostsState {
  error: any | null;
  userPosts: UserPostsPayload | null;
  loading: boolean;
}

const initialState: UserPostsState = {
  loading: false as boolean,
  userPosts: null as any | null,
  error: null as any | null,
};

const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //create user posts
      .addCase(createPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userPosts = payload;
      })
      .addCase(createPosts.rejected, (state) => {
        state.loading = false;
        state.userPosts = null;
        state.error = null;
      })
      //get my posts
      .addCase(getMyPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userPosts = payload;
      })
      .addCase(getMyPosts.rejected, (state) => {
        state.loading = false;
        state.userPosts = null;
        state.error = null;
      })
       //edit my posts
       .addCase(editPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userPosts = payload;
      })
      .addCase(editPost.rejected, (state) => {
        state.loading = false;
        state.userPosts = null;
        state.error = null;
      })
      //delete my posts
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userPosts = payload;
      })
      .addCase(deletePost.rejected, (state) => {
        state.loading = false;
        state.userPosts = null;
        state.error = null;
      });
  },
});

export const { updateError } = userPostsSlice.actions;

export default userPostsSlice.reducer;
