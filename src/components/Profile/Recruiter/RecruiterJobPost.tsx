import { Icon } from '@iconify/react'


const RecruiterJobPost = () => {
  return (
    <>
    <div className="post-container mt-4 w-[90%] rounded-lg border-[.5px] border-gray-500 h-auto flex">
      <div className="logo w-[30%] md:w-[10%]  h-full flex justify-center items-center md:ml-10">
        <img
          src="/tests/some_company_logo.jpg"
          alt="company logo"
          className="w-[56px] h-[56px] rounded-full object-cover"
        />
      </div>
      <div className="logo w-[70%] md:w-[80%]  h-full ">
        <div className="first-row ml-2 mt-4 mb-2">
          <div className="title">
            <span className="font-bold text-gray-600">ReactJs Developer</span>
          </div>
        </div>
        <div className="second-row ml-2 mt-2">
          <div className="company flex items-center">
            <span className="text-xs text-gray-400">Company Name</span>{" "}
            <Icon
              className="text-blue-500"
              icon="mdi:verified-user"
              height={15}
              width={12}
            />
          </div>
        </div>
        <div className="third-row ml-2 mt-2">
          <div className="location-type flex justify-between items-center">
            <span className="text-xs text-gray-400 flex items-center">
              Hyderabad, Telangana, India (On-site)
            </span>{" "}
          </div>
        </div>
        <div className="fourth-row ml-2 mt-2 mb-2">
          <span className='text-xs text-gray-400 flex items-center'>12-02-2024</span>
        </div>
        
      </div>
    </div>
  </>
  )
}

export default RecruiterJobPost