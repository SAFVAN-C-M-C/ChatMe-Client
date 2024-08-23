/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { config, handleError } from "../../../common/configurations";
import { IUserLogin } from "../../../types/Iuser";
import { URL } from "@/common/api";

axios.defaults.withCredentials = true;

// get user details
export const getUserDataFirst = createAsyncThunk(
  "user/getUserDataFirst",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/auth/`, config);
      if (data.data.isBlocked) {
        return null;
      }
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//google auth
export const googleLoginOrSignUp = createAsyncThunk(
  "user/googleLoginOrSignUp",
  async (userCredentials: IUserLogin, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/auth/google`,
        userCredentials,
        config
      );
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//logout
export const logout = createAsyncThunk(
  "user/logout",
  async (navigate: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${URL}/auth/logout`, config);
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//signup
export const RegisterUser = createAsyncThunk(
  "user/registerUser",
  async (
    userCredentials: {
      data: {
        email: string;
        password: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${URL}/auth/register`,
        userCredentials.data,
        config
      );
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
//add register details

// eslint-disable-next-line react-refresh/only-export-components
export const addRegisterDetails = createAsyncThunk(
  "user/addRegisterDetails",
  async (
    userCredentials: {
      data: {
        name: string;
        location: string;
        phone: string;
        accountType: string;
        doc?: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${URL}/auth/register/details`,
        userCredentials,
        config
      );

      return { ...data, loggined: true };
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
//login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    userCredentials: {
      data: {
        email: string;
        password: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${URL}/auth/login`,
        userCredentials.data,
        config
      );
      localStorage.setItem("user", res.data);
      return { ...res.data, loggined: true };
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//forgot password
export const forgotPassword = createAsyncThunk(
  "forgot/password",
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/auth/forgotpassword`,
        { email },
        config
      );
      // consol.log("🚀 ~ file: userActions.tsx:99 ~ async ~ data:", data);
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
//update password
export const updatePassword = createAsyncThunk(
  "reset/password",
  async (password: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/auth/reset-password`,
        { password },
        config
      );
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
//verify otp
export const verifyOTP = createAsyncThunk(
  "otp/verify",
  async (
    dataFromClient: {
      data: {
        otp: string;
        type?: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${URL}/auth/verify-otp`,
        dataFromClient.data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
