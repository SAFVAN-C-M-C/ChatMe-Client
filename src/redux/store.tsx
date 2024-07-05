import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import profileReducer from "./reducers/profileSlice";
import adminUserReducer from './reducers/admin/adminUsers'
import { ThunkAction, Action } from '@reduxjs/toolkit';
import adminCompanies from "./reducers/admin/adminCompanies";
import adminCompanyRequests from "./reducers/admin/adminCompanyRequests";
import adminRecruiterRequests from "./reducers/admin/adminRecruiterRequests";
import userPosts from "./reducers/posts/userPosts";
import homePosts from "./reducers/posts/homePosts";
import savedPost from "./reducers/posts/savedPost";
import searchUsers from "./reducers/Search/searchUsers";
import adminReports from "./reducers/admin/adminReports";

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile:profileReducer,
    adminUser:adminUserReducer,
    adminCompany:adminCompanies,
    adminCompanyRequest:adminCompanyRequests,
    adminRecruiterRequest:adminRecruiterRequests,
    userPosts:userPosts,
    homePosts:homePosts,
    savedPost:savedPost,
    searchUser:searchUsers,
    adminReport:adminReports
  },
});

// Type for the root state
export type RootState = ReturnType<typeof store.getState>;

// Type for the dispatch function
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
