/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUserLogin {
  email: string | null;
  google?: boolean;
}
export enum AccountType{
  personal="personal",
  company="company",
  recruiter="recruiter"
}

export interface UserState {
  loading: boolean;
  user: UserType | null;
  error: ErrorType | null;
}

export interface UserType {
  id: string;
  email: string;
  name: string;
  role: string
}

export interface ErrorType {
  message: string;
  statusCode?: number;
  status?: boolean;
  details?: any;
}

export interface IUserSelector {
  user:UserState,
  loading: boolean,
  error: null | string
}