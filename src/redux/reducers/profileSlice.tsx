/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { IProfile } from "../../types/IProfile";
import { getProfileDataFirst, updateAbout, updateAvatar, updateBio } from "../actions/user/profileActions";
export interface ProfilePayload{
    success:boolean;
    data:IProfile;
    message:string;
  }
export interface ProfileState {
    error: any | null;
    profile: ProfilePayload | null;
    loading: boolean;
  }
const initialState: ProfileState = {
    loading: false as boolean,
    profile: null as any | null,
    error: null as any | null,
  };
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(getProfileDataFirst.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileDataFirst.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.profile = payload;
      })
      .addCase(getProfileDataFirst.rejected, (state, { payload }) => {
        state.loading = false;
        state.profile = null;
        state.error = payload;
      })
      //update avatar
      .addCase(updateAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.profile = payload;
      })
      .addCase(updateAvatar.rejected, (state, { payload }) => {
        state.loading = false;
        state.profile = null;
        state.error = payload;
      })
      //update bio
      .addCase(updateBio.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBio.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.profile = payload;
      })
      .addCase(updateBio.rejected, (state, { payload }) => {
        state.loading = false;
        state.profile = null;
        state.error = payload;
      })
      //update about
      .addCase(updateAbout.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAbout.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.profile = payload;
      })
      .addCase(updateAbout.rejected, (state, { payload }) => {
        state.loading = false;
        state.profile = null;
        state.error = payload;
      });
    },
  });

  export const { updateError } = profileSlice.actions;
  export default profileSlice.reducer;