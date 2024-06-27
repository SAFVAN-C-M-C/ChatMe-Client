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
  export const updateAvatar = createAsyncThunk(
  "profile/updateAvatar",
  async (formData: {avatar:string},{rejectWithValue}) => {
    try {
      const { data } = await axios.put(`${URL}/profile/avatar/upload`, formData, config);
      return data;
    } catch (error:any) {
      return handleError(error, rejectWithValue);
    }
  }
);

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

  export const addEducation= createAsyncThunk(
    "profile/addEducation",
    async (formData:{
      nameOfinstitue?: string;
        course?: string;
        startYear?: string;
        endYear?: string;
    },{rejectWithValue})=>{
      try{
        console.log(formData);
        
        const { data } = await axios.post(`${URL}/profile/update/education/add`,formData, config);
        console.log(data);
        
        return data;
      }catch(error:any){
        return handleError(error, rejectWithValue);
      }
    }
  )
  export const addExperience= createAsyncThunk(
    "profile/addExperience",
    async (formData:{
        nameOfinstitue?: string;
        position?: string;
        startYear?: string;
        endYear?: string;
    },{rejectWithValue})=>{
      try{
        console.log(formData);
        
        const { data } = await axios.post(`${URL}/profile/update/experience/add`,formData, config);
        console.log(data);
        
        return data;
      }catch(error:any){
        return handleError(error, rejectWithValue);
      }
    }
  )
  export const addSkills= createAsyncThunk(
    "profile/addSkills",
    async (formData:{
      skills:string
    },{rejectWithValue})=>{
      try{
        console.log(formData);
        
        const { data } = await axios.post(`${URL}/profile/update/skills/add`,formData, config);
        console.log(data);
        
        return data;
      }catch(error:any){
        return handleError(error, rejectWithValue);
      }
    }
  )
  export const addPreferedJobs= createAsyncThunk(
    "profile/addPreferedJobs",
    async (formData:{
      preferedJobs:string
    },{rejectWithValue})=>{
      try{
        console.log(formData);
        
        const { data } = await axios.post(`${URL}/profile/update/preferedJobs/add`,formData, config);
        console.log(data);
        
        return data;
      }catch(error:any){
        return handleError(error, rejectWithValue);
      }
    }
  )
  export const acceptRecruiterRequest= createAsyncThunk(
    "profile/acceptRecruiterRequest",
    async (formData:{
      requestId?: string,
      userEmail?: string,
      userId?: string,
    },{rejectWithValue})=>{
      try{
        console.log(formData);
        
        const { data } = await axios.post(`${URL}/profile/apply-recruiter/accept`,formData, config);
        console.log(data);
        
        return data;
      }catch(error:any){
        return handleError(error, rejectWithValue);
      }
    }
  )
  export const ignoreRecruiterRequest= createAsyncThunk(
    "profile/ignoreRecruiterRequest",
    async (formData:{
      requestId?: string,
      userEmail?: string,
    },{rejectWithValue})=>{
      try{
        console.log(formData);
        
        const { data } = await axios.post(`${URL}/profile/apply-recruiter/ignore`,formData, config);
        console.log(data);
        
        return data;
      }catch(error:any){
        return handleError(error, rejectWithValue);
      }
    }
  )