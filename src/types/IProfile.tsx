import { AccountType } from "./Iuser";

export interface IProfile{
    _id?: string;
    email?: string;
    name?: string;
    userId?:  string | null;
    accountType?: AccountType | null;
    preferedJobs?: string[] | null;
    title?: string | null;
    bio?: {
      about?: string | null;
      avatar?: string | null;
      dob?: Date | null;
      gender?: string | null;
      resume?: string | null;
      location?: string | null;
      phone?: string | null;
    };
    campanyId?: string | null;
    following?: string[] | null;
    followers?: string[] | null;
    theme?: string | null;
    companyDetails?: {
      jobs?: string[] | null;
      recruiters?: string[] | null;
    };
}