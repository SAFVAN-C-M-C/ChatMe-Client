/* eslint-disable @typescript-eslint/no-explicit-any */
import { URL } from '@/common/api'
import { config } from '@/common/configurations'
import { getMyPosts } from '@/redux/actions/posts/userPostsAction'
import { deleteComment } from '@/redux/reducers/posts/homePosts'
import { AppDispatch, RootState } from '@/redux/store'
import { IComments } from '@/types/IPosts'
import { Icon } from '@iconify/react'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
interface CommentProps{
    comment:IComments,
    postId:string,
    postUser:string
}
const Comments:React.FC<CommentProps> = ({comment,postId,postUser}) => {
    const { user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();




    const handleCommentDelete=async(e:React.MouseEvent<HTMLOrSVGElement>)=>{
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("postId",String(postId) );
            formData.append("commentId", String(comment._id));
            const response = await axios.put(
              `${URL}/post/comment/delete`,
              formData,
              config
            );
            
            if (response.status === 200) {
              dispatch(deleteComment({commentId:String(comment._id),postId:String(postId)}))
              if (postUser === user?.data._id) {
                dispatch(getMyPosts());
              }
            }
          } catch (error: any) {
            console.log("Seomething went wrong", error.message);
            toast.error("Something went wrong,please try again!");
          }
    }
  return (
    <>
        <div className="container w-full h-auto  mt-2 flex justify-between">
            
            <div className="content-part flex">
            <div className="avatar w-[30px] h-[30px] rounded-full m-2">
                <img src={comment.userAvatar} alt="avatar" className='w-fullh-full object-cover rounded-full' />
            </div>
            
            <div className="content h-full">
                <div className="username flex items-center">
                    <span className='text-gray-900 font-semibold'>{comment.name}</span>
                    
                </div>
                <div className="comment ">
                    <span className='text-gray-700 font-thin'>{comment.comment}</span>
                </div>
            </div>
            </div>
            {comment.userId===user?.data._id || postUser===user?.data._id?<div className="action m-2">
            
            <Icon className='cursor-pointer text-gray-400 hover:text-gray-500' icon={"mdi:delete"} width={20} height={20} onClick={handleCommentDelete}/>
            </div>:null}
        </div>
    </>
  )
}

export default Comments