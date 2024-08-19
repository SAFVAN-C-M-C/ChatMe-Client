export interface CreatePostCredentials {
  email?: string;
  name?: string;
  userId?: string;
  media?: string;
  content?: string;
  tags:string[]
  userAvatar?: string;
}
export interface IPosts {
  _id?: string;
  email?: string;
  name?: string;
  userId?: string;
  media?: string;
  userAvatar?: string;
  content?: string;
  likes?: string[];
  comments?: string[];
  createdAt:Date
}

export interface ISavedPosts {
  saved:string[]
  savedPost:IPosts[]
}
export interface AddCommentPayload {
  postId: string;
  comment: string;
}
export interface DeleteCommentPayload {
  postId: string;
  commentId: string;
}
export interface IComments{
  _id: string;
  postId: string;
  comment: string;
  name: string;
  userAvatar: string;
  userId: string;
  likes: string[];
  replyId?: string;
  replys: number;
}