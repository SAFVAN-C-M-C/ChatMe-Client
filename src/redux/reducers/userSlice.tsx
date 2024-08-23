/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import {
  RegisterUser,
  addRegisterDetails,
  forgotPassword,
  getUserDataFirst,
  googleLoginOrSignUp,
  loginUser,
  logout,
  updatePassword,
  verifyOTP,
} from "../actions/user/userActions";
import { AccountType } from "../../types/Iuser";
export interface User {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  isBlocked: boolean;
  accountType?: AccountType;
  loggined?: boolean;
  isEmailVerified?: boolean;
  isDetailsComplete?: boolean;
  otp?: boolean;
  details?: boolean;
  reset?: boolean;
  otpType?: string;
}
export interface UserPayload {
  success: boolean;
  data: User;
  message: string;
  loggined?: boolean;
  detailsFilled?: boolean;
}
export interface UserState {
  error: any | null;
  user: UserPayload | null;
  loading: boolean;
}

const initialState: UserState = {
  loading: false as boolean,
  user: null as any | null,
  error: null as any | null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //get user details
      .addCase(getUserDataFirst.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDataFirst.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(getUserDataFirst.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      //google auth
      .addCase(googleLoginOrSignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLoginOrSignUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(googleLoginOrSignUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })

      // Login States
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })

      // Logout States
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })

      // Sign-up States
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(RegisterUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })
      // Forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })
      //update password
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      // add register details States
      .addCase(addRegisterDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRegisterDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(addRegisterDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })

      // verify otp
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
      })
      .addCase(verifyOTP.rejected, (state, { payload }) => {
        state.loading = false;
        // state.user = null;
        state.error = payload;
      });
  },
});

export const { updateError } = userSlice.actions;

export default userSlice.reducer;
