// import { AccountType } from "./Iuser";

export interface IProfile{
  _id?: string;
  email?: string;
  name?: string;
  userId?: string;
  accountType?: string | "recruiter" | "company" | "personal" | null;
  preferedJobs?: string[] | null;
  title?: string | null;
  bio: {
    about?: string | null;
    avatar?: string | null;
    dob?: Date | null;
    gender?: string | null;
    resume?: string | null;
    location?: string | null;
    phone?: string | null;
  };
  skills?: string[];

  following?: string[] | null;
  followers?: string[] | null;
  theme?: string | null;
  companyDetails?: {
    companyId?: string | null;
    companyName?: string;
    jobs?: string[] | null;
    recruiters?: Recruiters[] | null;
  };
  recruiterApplication?: RecruiterApplication[];
  education?: Education[];
  experience?: Experience[];
  isVerified?: boolean;
}
interface Education {
  _id?: string;
  nameOfinstitue?: string;
  course?: string;
  startYear?: string;
  endYear?: string;
}

interface Experience {
  _id?: string;
  nameOfinstitue?: string;
  position?: string;
  startYear?: string;
  endYear?: string;
}

export interface RecruiterApplication {
  _id?: string;
  userId?: string ;
  userEmail?: string;
  content?: string;
  name?: string;
  avatar?:string
}
export interface BioDetails{
  name?:string | null;
  title?: string | null;
  email?:string|null;
  bio?:{
    location?: string | null;
    phone?: string | null;
  }
}
export interface Recruiters {
  userId?: string ;
  email?: string;
  name?: string;
  avatar?: string |null;
}