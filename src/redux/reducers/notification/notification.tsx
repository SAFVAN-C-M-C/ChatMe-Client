/* eslint-disable @typescript-eslint/no-explicit-any */

import { getNotification } from "@/redux/actions/notification/notificationAction";
import { createSlice } from "@reduxjs/toolkit";


export interface INotification {
  _id:string;
  recipientId?:string;
  content?:string
  isAdminMessage:boolean
  postId?:string
  fromUserId?:string
  type:string
  read:boolean
}
export interface NotificationPayload {
  success: boolean;
  data: INotification[];
  message: string;
}
export interface NotificationState {
  error: any | null;
  notifications: NotificationPayload | null;
  loading: boolean;
}

const initialState: NotificationState = {
  loading: false as boolean,
  notifications: null as any | null,
  error: null as any | null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    updateNotificationError: (state, { payload }) => {
      state.error = payload;
    },
    addNotification: (state, { payload }) => {
      if (state.notifications) {
        state.notifications.data = [payload, ...state.notifications.data];
      } else {
        state.notifications = {
          success: true,
          data: [payload],
          message: '',
        };
      }
    },

  },
  extraReducers: (builder) => {
    builder
      //get Notification
      .addCase(getNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotification.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.notifications = payload;
      })
      .addCase(getNotification.rejected, (state) => {
        state.loading = false;
        state.notifications = null;
        state.error = null;
      });
      
  },
});

export const { updateNotificationError,addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
