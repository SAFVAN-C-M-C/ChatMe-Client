
import { ProfilePayload } from '@/redux/reducers/profileSlice';

interface AboutProps{
    profile: ProfilePayload | null;
}
const About:React.FC<AboutProps> = ({profile}) => {
  
  return (
    <>

    <div className="profile-about border-[.5px] border-gray-600  w-[80%] h-auto rounded-xl bg-slate-50 mt-12">
            <div className="title w-full m-4 pr-6 flex justify-between">
              <div className="about-title">
                <span className="font-bold">About</span>
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