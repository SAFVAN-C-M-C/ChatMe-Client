import { Icon } from '@iconify/react'
import { useState } from 'react'
import EditAbout from '../../modals/EditAbout'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';


const About = () => {
  const { profile, error } = useSelector((state: RootState) => state.profile);
  const [editAbout,setEditAbout]=useState(false)
  const handleEditAboutclick=()=>{
    setEditAbout(!editAbout)
  }
  return (
    <>
    {
      editAbout?<EditAbout handleEditAboutclick={handleEditAboutclick}/>:null
    }
    <div data-theme={profile?.data.theme || "light"} className="profile-about border-[.5px] border-dashed border-gray-600  w-[80%] h-auto rounded-xl  mt-12">
            <div className="title w-full m-4 pr-6 flex justify-between">
              <div className="about-title">
                <span className="font-bold">About</span>
              </div>
              <div className="edit-about ">
                <Icon
                onClick={handleEditAboutclick}
                  className="cursor-pointer"
                  icon="mdi:edit"
                  width={26}
                  height={26}
                />
              </div>
            </div>
            <div className="about-content w-full p-3 h-auto">
              <p>
                {
                  profile?.data.bio?.about?profile?.data.bio?.about:"Enter some about"
                }
              </p>
            </div>
          </div>
    </>
  )
}

export default About