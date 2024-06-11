/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { config, handleError } from "../../../common/configurations";
import { URL } from "../../../common/api";
import { BioDetails } from "../../../types/IProfile";

// get user details
export const getProfileDataFirst = createAsyncThunk(
    "profile/getProfileDataFirst",
    async (_, { rejectWithValue }) => {
      try {
        
        const { data } = await axios.get(`${URL}/profile/`, config);
        return data;
      } catch (error: any) {
        return handleError(error, rejectWithValue);
      }
    }
  );


  //update user avatar
  export const updateAvatar= createAsyncThunk(
    "profile/updateAvatar",
    async (formData:{
      avatar: File
    },{rejectWithValue})=>{
      try{
        console.log(formData);
        
        const { data } = await axios.post(`${URL}/profile/avatar/upload`,formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
        return data;
      }catch(error:any){
        return handleError(error, rejectWithValue);
      }
    }
  )

  //update bio
  export const updateBio= createAsyncThunk(
    "profile/updateBio",
    async (formData:BioDetails,{rejectWithValue})=>{
      try{
        console.log(formData);
        
        const { data } = await axios.post(`${URL}/profile/bio/update`,formData, config);
        return data;
      }catch(error:any){
        return handleError(error, rejectWithValue);
      }
    }
  )
  export const updateAbout= createAsyncThunk(
    "profile/updateAbout",
    async (formData:{about:string},{rejectWithValue})=>{
      try{
        console.log(formData);
        
        const { data } = await axios.post(`${URL}/profile/update/about`,formData, config);
        console.log(data);
        
        return data;
      }catch(error:any){
        return handleError(error, rejectWithValue);
      }
    }
  )