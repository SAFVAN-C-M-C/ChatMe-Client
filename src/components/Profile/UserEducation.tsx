import { Icon } from '@iconify/react'


const UserEducation = () => {
  return (
    <>
              <div className="profile-education border-[.5px] border-gray-600  w-[80%] h-auto rounded-xl bg-slate-100 mt-12">
            <div className="title w-full m-4 pr-6 flex justify-between">
              <div className="education-title">
                <span className="font-bold">Education</span>
              </div>
              <div className="action-education flex ">
                <Icon
                  className="mr-2 cursor-pointer"
                  icon="mdi:edit"
                  width={26}
                  height={26}
                />
                <Icon
                  icon="mdi:add"
                  width={26}
                  height={26}
                  className="mr-2 cursor-pointer"
                />
              </div>
            </div>
            <div className="education list w-full m-4 pr-6 flex flex-col">
              <div className="education w-full flex flex-col">
                <div className="education-institute">
                  <span className="font-bold text-gray-700">
                    University of Calicut
                  </span>
                </div>
                <div className="education-course ">
                  <span className="text-gray-500">
                    Bachelor of Computer Application
                  </span>
                </div>
                <div className="education-span ">
                  <span className="text-gray-500">2020 - 2023</span>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default UserEducation