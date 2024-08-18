import { AxiosRequestConfig } from 'axios';

// Interface for API response errors
interface ApiResponseError extends Error {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;  // HTTP status code
  };
}

// Environment variable for Google ID
export const GOOGLE_ID = import.meta.env.VITE_REACT_APP_GOOGLE_ID;

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
  console.error('Error occurred:', error);

  if (error.response?.data?.message) {
    console.log('Server error:', error.response.data.message);
    return rejectWithValue(error.response.data.message);
  } else if (error.message) {
    console.log('Error message:', error.message);
    return rejectWithValue(error.message);
  } else {
    console.log('Generic error handler triggered.');
    return rejectWithValue("An unknown error occurred");
  }
};
