export interface CreatePostCredentials {
  email?: string;
  name?: string;
  userId?: string;
  media?: string;
  content?: string;
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
  comments?: IComments[];
}
export interface IComments {
  _id?: string;
  comment?: string;
  name?: string;
  userAvatar?: string;
  userId?: string;
  likes?: string[];
}
export interface ISavedPosts {
  saved:string[]
  savedPost:IPosts[]
}
export interface AddCommentPayload {
  postId: string;
  comment: IComments;
}
export interface DeleteCommentPayload {
  postId: string;
  commentId: string;
}