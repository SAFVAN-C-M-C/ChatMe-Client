/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";

export const URL = import.meta.env.VITE_CHAT_ME_APP_SERVER_URL;

const apiInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

// Response interceptor
apiInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    console.error("API Error:", error.message);
    return Promise.reject(error); // Ensures the error is properly propagated
  }
);

// Function to handle common requests
export const commonRequest = async (
  method: Method,
  route: string,
  body?: any,
  config: AxiosRequestConfig = {}
) => {
  const requestConfig: AxiosRequestConfig = {
    method,
    url: route,
    data: body,
    headers: config.headers,
    withCredentials: true,
  };

  try {
    return await apiInstance(requestConfig);
  } catch (error) {
    console.error("Error in commonRequest:", error);
    throw error;
  }
};

// Function to handle Redux-compatible requests
export const commonReduxRequest = async (
  method: Method,
  route: string,
  rejectWithValue?: (error: AxiosError) => void,
  body?: any,
  config: AxiosRequestConfig = {}
) => {
  const requestConfig: AxiosRequestConfig = {
    method,
    url: route,
    data: body,
    headers: config.headers || {},
    withCredentials: true,
  };

  try {
    const response = await apiInstance(requestConfig);
    return response;
  } catch (error: any) {
    console.error("Request failed with error:", error);
    if (rejectWithValue) {
      return rejectWithValue(error);
    } else {
      throw error;
    }
  }
};
