import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../common/api";
import { config, handleError, appJson } from "../../../common/configurations";
axios.defaults.withCredentials = true;

export const getUserDataFirst = createAsyncThunk(
  "user/getUserDataFirst",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${URL}/auth/`, config);
      console.log(data, "here in data of getUserDataFirst");
      return { ...data, loggined: true };
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
//logout
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${URL}/auth/logout`, config);
      localStorage.removeItem("user");
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
      navigate: any;
      data: {
        email: string;
        password: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { navigate } = userCredentials;
      console.log("calling signup");
      console.log(`${URL}/auth/register`);

      const { data } = await axios.post(
        `${URL}/auth/register`,
        userCredentials.data,
        config
      );
      console.log(data, "here in data");

      navigate("/otp-verification", { replace: true });
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
      };
      navigate: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const { navigate } = userCredentials;

      console.log("calling signup");

      const { data } = await axios.post(
        `${URL}/auth/register/details`,
        userCredentials,
        config
      );
      console.log(data, "here in data");
      navigate("/", { replace: true });
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
      navigate: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const { navigate } = userCredentials;
      const res = await axios.post(
        `${URL}/auth/login`,
        userCredentials.data,
        config
      );
      localStorage.setItem("user", res.data);
      navigate("/", { replace: true });
      return { ...res.data, loggined: true };
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//forgot password
// export const forgotPassword = createAsyncThunk(
//   "forgot/password",
//   async ({ email: string, navigate: any }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(
//         `${URL}/auth/forgotpassword`,
//         { email },
//         config
//       );
//       console.log("🚀 ~ file: userActions.tsx:99 ~ async ~ data:", data);
//       return data;
//     } catch (error: any) {
//       return handleError(error, rejectWithValue);
//     }
//   }
// );
//verify otp
export const verifyOTP = createAsyncThunk(
  "otp/verify",
  async (
    dataFromClient: {
      data: {
        otp: string;
        type: string;
      };
      navigate: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const { navigate } = dataFromClient;
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
      console.log("🚀 ~ file: userActions.tsx:127 ~ async ~ data:", data);
      navigate("/register", { replace: true });
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
