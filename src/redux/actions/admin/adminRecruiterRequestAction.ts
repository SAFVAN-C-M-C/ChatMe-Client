/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "../../../common/configurations";
import { URL } from "../../../common/api";

// get recruiter  details
export const getAdminRecruiterRequestDetails = createAsyncThunk(
    "admin/getAdminRecruiterRequestDetails",
    async (_, { rejectWithValue }) => {
      try {
        console.log(`${URL}/admin/users`);
        
        const { data } = await axios.get(`${URL}/admin/recruiter/requests`, config);
        console.log("reruiter req==",data.data);
        
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );

      //block company
      export const verifyRecruiter = createAsyncThunk(
        "admin/verifyRecruiter",
        async (formData:{
          email?: string,
          isVerified?: boolean,
          type?: string| "company" | "user",
        }, { rejectWithValue }) => {
          try {
            const { data } = await axios.post(`${URL}/admin/recruiter/requests/verify`,formData, config);
            console.log("company==",data);
            
            return data;
          } catch (error: any) {
            return handleError(error, rejectWithValue);
          }
        }
      )