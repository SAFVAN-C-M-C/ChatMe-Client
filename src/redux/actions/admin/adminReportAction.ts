/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from "@/common/api";
import { config, handleError } from "@/common/configurations";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// get user details
export const getReports = createAsyncThunk(
    "admin/getReports",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${URL}/admin/report`, config);
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );


    //report action
    export const reportAction = createAsyncThunk(
      "admin/reportAction",
      async (formData:{
        userId: string,
        reportId: string,
      }, { rejectWithValue }) => {
        try {
          const { data } = await axios.put(`${URL}/admin/report/action`,formData, config);
          return data;
        } catch (error: any) {
          return handleError(error, rejectWithValue);
        }
      }
    );

        //delete report
        export const deleteReport = createAsyncThunk(
          "admin/deleteReport",
          async (formData:{
            id: string,
          }, { rejectWithValue }) => {
            try {
              const { data } = await axios.put(`${URL}/admin/report/delete/${formData.id}`, config);
              return data;
            } catch (error: any) {
              return handleError(error, rejectWithValue);
            }
          }
        );