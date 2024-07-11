export interface IChat {
    _id?: string;
    participants?: string[];
    messages?:IMessage[];
  }
  export interface IMessage{
    _id?:string;
    senderId?:string;
    receiverId?:string;
    recieverSeen?:boolean;
    message:string
  }