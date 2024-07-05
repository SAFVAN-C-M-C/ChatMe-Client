/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "@/redux/actions/search/searchUserAction";
import { IProfile } from "@/types/IProfile";
export interface SearchUserPayload{
    success:boolean;
    data:IProfile[];
    message:string;
    key:string;
  }
export interface SearchUserState {
    error: any | null;
    searchUser: SearchUserPayload | null;
    loading: boolean;
  }
const initialState: SearchUserState = {
    loading: false as boolean,
    searchUser: null as any | null,
    error: null as any | null,
  };
const searchUserSlice = createSlice({
    name: "searchUser",
    initialState,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
      updateSerachKey:(state,{payload})=>{
        state.searchUser=payload
      }
    },
    extraReducers: (builder) => {
      builder
      //get serach user
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.searchUser = payload;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.searchUser = null;
        state.error = payload;
      })

    },
  });

  export const { updateError,updateSerachKey } = searchUserSlice.actions;
  export default searchUserSlice.reducer;