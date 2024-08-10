export interface IJobApplication{
    jobId: string;
    resume: string;
    name:string;
    phone:string;
    email:string;
    coverLetter: string;
}
export interface IJobApplicationFromBackend{
    _id:string;
    userId:string
    jobId: string;
    resume: string;
    name:string;
    phone:string;
    email:string;
    coverLetter: string;
    status: string;
    createdAt:Date
}