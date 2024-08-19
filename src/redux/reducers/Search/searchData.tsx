/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "@/redux/actions/search/searchUserAction";
import { IProfile } from "@/types/IProfile";
import { IPosts } from "@/types/IPosts";
export interface SearchPayload{
    success:boolean;
    data:IProfile[] | IPosts[];
    message:string;
    key:string;
  }
export interface SearchState {
    error: any | null;
    searchData: SearchPayload | null;
    loading: boolean;
  }
const initialState: SearchState = {
    loading: false as boolean,
    searchData: null as any | null,
    error: null as any | null,
  };
const searchSlice = createSlice({
    name: "searchData",
    initialState,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
      updateSerachKey:(state,{payload})=>{
        state.searchData=payload
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
        state.searchData = payload;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.searchData = null;
        state.error = payload;
      })

    },
  });

  export const { updateError,updateSerachKey } = searchSlice.actions;
  export default searchSlice.reducer;