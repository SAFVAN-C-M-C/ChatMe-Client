/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


import { getHomePosts } from "../../actions/posts/homePostsActions";
import { AddCommentPayload, DeleteCommentPayload, IPosts } from "@/types/IPosts";

export interface HomePostsPayload {
  success: boolean;
  data: IPosts[];
  totalPages:number;
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
    likePost(state, action: PayloadAction<{ postId: string; userId: string }>) {
      const { postId, userId } = action.payload;
      const post = state.homePosts?.data.find((post) => post._id === postId);
      if (post && !post.likes?.includes(userId)) {
        post.likes?.push(userId);
      }
    },
    unlikePost(state,action: PayloadAction<{ postId: string; userId: string }>) {
      const { postId, userId } = action.payload;
      const post = state.homePosts?.data.find((post) => post._id === postId);
      if (post) {
        post.likes = post.likes?.filter((id: string) => id !== userId);
      }
    },
    addComment(state, action: PayloadAction<AddCommentPayload>) {
      const { postId, comment } = action.payload;
      const post = state.homePosts?.data.find((post) => post._id === postId);
      if (post) {
        post.comments?.push(comment);
      }
    },
    deleteComment(state, action: PayloadAction<DeleteCommentPayload>) {
      const { postId, commentId } = action.payload;
      const post = state.homePosts?.data.find((post) => post._id === postId);
      if (post) {
        post.comments = post?.comments?.filter((comment) => comment !== commentId);
      }
    },
    addMorePosts(state, action: PayloadAction<HomePostsPayload>) {
      if (state.homePosts) {
        const existingPostIds = new Set(state.homePosts.data.map(post => post._id));
        const newPosts = action.payload.data.filter(post => !existingPostIds.has(post._id));
        state.homePosts.data = [...state.homePosts.data, ...newPosts];
        state.homePosts.totalPages = action.payload.totalPages;
      } else {
        state.homePosts = action.payload;
      }
    }
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
      });
  },
});

export const { updateError,likePost,unlikePost,addComment,deleteComment,addMorePosts } = homePostsSlice.actions;

export default homePostsSlice.reducer;
