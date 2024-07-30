export interface IChat {
    _id?: string;
    participants?: string[];
    messages:IMessage[];
    unread:boolean
  }
  export interface IMessage{
    _id?:string;
    senderId?:string;
    receiverId?:string;
    recieverSeen?:boolean;
    message:string;
    updatedAt:Date;
    createdAt:Date;
    shouldShake?:boolean;
    type:string;
    media?:string
  }

  export interface ISoccketMessage{
    obj:IMessage;
    chatId:string
  }