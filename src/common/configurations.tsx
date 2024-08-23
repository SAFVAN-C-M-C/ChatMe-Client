import { AxiosRequestConfig } from "axios";

// Interface for API response errors
interface ApiResponseError extends Error {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
}

// Environment variable for Google ID
export const GOOGLE_ID = import.meta.env.VITE_CHAT_ME_APP_GOOGLE_ID;

// Common Axios configuration
export const config: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// Configuration for multipart/form-data requests
export const configMultiPart: AxiosRequestConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

// Error handler function
export const handleError = (
  error: ApiResponseError,
  rejectWithValue: (value: string | unknown) => void
) => {
  if (error.response?.data?.message) {
    return rejectWithValue(error.response.data.message);
  } else if (error.message) {
    return rejectWithValue(error.message);
  } else {
    return rejectWithValue("An unknown error occurred");
  }
};
