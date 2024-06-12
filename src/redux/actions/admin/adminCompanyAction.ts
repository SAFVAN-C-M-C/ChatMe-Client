/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "../../../common/configurations";
import { URL } from "../../../common/api";

// get user details
export const getAdminCompanyDetails = createAsyncThunk(
    "admin/getAdminCompanyDetails",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${URL}/admin/companies`, config);
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );
  // export const verifyCompany = createAsyncThunk(
  //   "admin/verifyCompany",
  //   async (formData:{
  //     email?: string,
  //     isVerfied?: boolean,
  //     type?: string| "company" | "user",
  //   }, { rejectWithValue }) => {
  //     try {
  //       const { data } = await axios.post(`${URL}/admin/companies/requests/verify`,formData, config);
  //       console.log("company==",data);
        
  //       return data;
  //     } catch (error: any) {
  //       return handleError(error, rejectWithValue);
  //     }
  //   }
  // );
  //block company
    export const blockCompany = createAsyncThunk(
    "admin/blockCompany",
    async (formData:{
      email?: string,
      isBlocked?: boolean,
      type?: string| "company" | "user",
    }, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(`${URL}/admin/company/block`,formData, config);
        console.log("company==",data);
        
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  )
    //block company
    export const unBlockCompany = createAsyncThunk(
      "admin/unBlockCompany",
      async (formData:{
        email?: string,
        isBlocked?: boolean,
        type?: string| "company" | "user",
      }, { rejectWithValue }) => {
        try {
          const { data } = await axios.post(`${URL}/admin/company/unblock`,formData, config);
          console.log("company==",data);
          
          return data;
        } catch (error: any) {
          return handleError(error, rejectWithValue);
        }
      }
    );