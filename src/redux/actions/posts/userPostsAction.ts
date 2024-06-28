/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "../../../common/configurations";
import { URL } from "../../../common/api";
import { CreatePostCredentials } from "../../../types/IPosts";

// get user posts
export const createPosts = createAsyncThunk(
    "post/createPost",
    async (formData:CreatePostCredentials, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(`${URL}/post/create`,formData, config);
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );


  //get my posts
  export const getMyPosts = createAsyncThunk(
    "post/getMyPosts",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${URL}/post/myposts`, config);
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );
  export const editPost = createAsyncThunk(
    "post/editPost",
    async (formData:{_id:string,content:string}, { rejectWithValue }) => {
      try {
        const { data } = await axios.put(`${URL}/post/edit`,formData, config);
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );
  export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (formData:{_id:string}, { rejectWithValue }) => {
      try {
        const { data } = await axios.put(`${URL}/post/delete`,formData, config);
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );