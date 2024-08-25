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
  async (formData: { avatar: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${URL}/profile/avatar/upload`,
        formData,
        config
      );
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

//update bio
export const updateBio = createAsyncThunk(
  "profile/updateBio",
  async (formData: BioDetails, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${URL}/profile/bio/update`,
        formData,
        config
      );
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
export const updateAbout = createAsyncThunk(
  "profile/updateAbout",
  async (formData: { about: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${URL}/profile/update/about`,
        formData,
        config
      );
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const addEducation = createAsyncThunk(
  "profile/addEducation",
  async (
    formData: {
      nameOfinstitue?: string;
      course?: string;
      startYear?: string;
      endYear?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${URL}/profile/update/education/add`,
        formData,
        config
      );

      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
export const addExperience = createAsyncThunk(
  "profile/addExperience",
  async (
    formData: {
      nameOfinstitue?: string;
      position?: string;
      startYear?: string;
      endYear?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${URL}/profile/update/experience/add`,
        formData,
        config
      );

      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
export const addResume = createAsyncThunk(
  "profile/addResume",
  async (
    formData: {
      name: string;
      doc: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${URL}/profile/update/resume/add`,
        formData,
        config
      );

      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
export const deleteResume = createAsyncThunk(
  "profile/deleteResume",
  async (
    formData: {
      id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.delete(
        `${URL}/profile/update/resume/delete/${formData.id}`,
        config
      );

      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
export const addSkills = createAsyncThunk(
  "profile/addSkills",
  async (
    formData: {
      skills: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${URL}/profile/update/skills/add`,
        formData,
        config
      );

      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
export const addPreferedJobs = createAsyncThunk(
  "profile/addPreferedJobs",
  async (
    formData: {
      preferedJobs: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        `${URL}/profile/update/preferedJobs/add`,
        formData,
        config
      );

      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
export const acceptRecruiterRequest = createAsyncThunk(
  "profile/acceptRecruiterRequest",
  async (
    formData: {
      requestId?: string;
      userEmail?: string;
      userId?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(
        `${URL}/profile/apply-recruiter/accept`,
        formData,
        config
      );

      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
export const ignoreRecruiterRequest = createAsyncThunk(
  "profile/ignoreRecruiterRequest",
  async (
    formData: {
      requestId?: string;
      userEmail?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(
        `${URL}/profile/apply-recruiter/ignore`,
        formData,
        config
      );

      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);

export const followUser = createAsyncThunk(
  "profile/followUser",
  async (
    formData: {
      userId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(
        `${URL}/profile/users/follow/${formData.userId}`,
        config
      );
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
export const changeTheme = createAsyncThunk(
  "profile/changeTheme",
  async (
    formData: {
      theme: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(
        `${URL}/profile/theme?theme=${formData.theme}`,
        config
      );
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
export const unFollowUser = createAsyncThunk(
  "profile/unFollowUser",
  async (
    formData: {
      userId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(
        `${URL}/profile/users/unfollow/${formData.userId}`,
        config
      );
      return data;
    } catch (error: any) {
      return handleError(error, rejectWithValue);
    }
  }
);
