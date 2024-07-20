/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { IProfile } from "../../types/IProfile";
import {
  acceptRecruiterRequest,
  addEducation,
  addExperience,
  addPreferedJobs,
  addSkills,
  changeTheam,
  followUser,
  getProfileDataFirst,
  ignoreRecruiterRequest,
  unFollowUser,
  updateAbout,
  updateAvatar,
  updateBio,
} from "../actions/user/profileActions";
export interface ProfilePayload {
  success: boolean;
  data: IProfile;
  message: string;
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

        //add education
      })
      .addCase(addEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEducation.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.profile = payload;
      })
      .addCase(addEducation.rejected, (state, { payload }) => {
        state.loading = false;
        state.profile = null;
        state.error = payload;
      })
      //follow user
      .addCase(followUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(followUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.profile = payload;
      })
      .addCase(followUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.profile = null;
        state.error = payload;
      })
      //un follow user
      .addCase(unFollowUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(unFollowUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.profile = payload;
      })
      .addCase(unFollowUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.profile = null;
        state.error = payload;
      })
      //add experience
      .addCase(addExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExperience.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.profile = payload;
      })
      .addCase(addExperience.rejected, (state, { payload }) => {
        state.loading = false;
        state.profile = null;
        state.error = payload;
      })
      //add skills
      .addCase(addSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSkills.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.profile = payload;
      })
      .addCase(addSkills.rejected, (state, { payload }) => {
        state.loading = false;
        state.profile = null;
        state.error = payload;
      })
      //add preferedJobs
      .addCase(addPreferedJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPreferedJobs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.profile = payload;
      })
      .addCase(addPreferedJobs.rejected, (state, { payload }) => {
        state.loading = false;
        state.profile = null;
        state.error = payload;
      })
      //accept request
      .addCase(acceptRecruiterRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(acceptRecruiterRequest.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.profile = payload;
      })
      .addCase(acceptRecruiterRequest.rejected, (state, { payload }) => {
        state.loading = false;
        state.profile = null;
        state.error = payload;
      })
      //ignore request
      .addCase(ignoreRecruiterRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(ignoreRecruiterRequest.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.profile = payload;
      })
      .addCase(ignoreRecruiterRequest.rejected, (state, { payload }) => {
        state.loading = false;
        state.profile = null;
        state.error = payload;
      })
      //cahnge theam
      .addCase(changeTheam.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeTheam.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.profile = payload;
      })
      .addCase(changeTheam.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { updateError } = profileSlice.actions;
export default profileSlice.reducer;
