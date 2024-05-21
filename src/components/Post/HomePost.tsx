import { Icon } from '@iconify/react'
const HomePost = () => {
  return (
    <>
            <div className="post w-[500px] h-auto border-[.4px] border-gray-500  mt-14 rounded-xl flex flex-col">
          <div className="title-part h-[65px]  rounded-t-xl flex items-center justify-between">
            <div className="user flex items-center ml-4">
              <div className="logo">
                <img src="/tests/sample_user_logo.jpg" className='w-[35px] h-[35px] rounded-full' />
              </div>
              <div className="name flex items-center ml-2">
                <span>user name</span>
              </div>
            </div>
            <div className="option mr-4">
              <Icon icon="mi:options-vertical" width={26} height={26}/>
            </div>
          </div>
          <div className="media-part w-[500px] h-[500px] bg-blue-500">
              <img src="/tests/sample_post_image.jpg" alt="" className='w-full h-full object-cover'/>
          </div>
          <div className="bottom-section w-full h-auto rounded-b-xl ">
            <div className="first-row pl-4">
              <span className='username font-bold '>user name</span> <span>Lorem ipsum dolor sit amet consectetur adipisicing </span>
            </div>
            <div className="second-row flex justify-around mt-2 mb-4  ">
              <div className="like flex">
              <Icon icon="solar:like-bold" width={26} height={26}/>
                <span>Like</span>
              </div>
              <div className="comment flex">
              <Icon icon="iconamoon:comment" width={26} height={26}/>
                <span>Comment</span>
              </div>
              <div className="save flex">
              <Icon icon="lucide:bookmark" width={26} height={26}/>
                <span>Save</span>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default HomePost