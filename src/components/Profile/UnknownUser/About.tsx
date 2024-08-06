
import { ProfilePayload } from '@/redux/reducers/profileSlice';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

interface AboutProps{
  userProfile: ProfilePayload | null;
}
const About:React.FC<AboutProps> = ({userProfile}) => {
  const { profile,  } = useSelector((state: RootState) => state.profile);
  return (
    <>

    <div data-theme={profile?.data.theme || "light"} className="profile-about border-[.5px] border-gray-600  w-[80%] h-auto rounded-xl border-dashed mt-12">
            <div className="title w-full m-4 pr-6 flex justify-between">
              <div className="about-title">
                <span className="font-bold">About</span>
              </div>

            </div>
            <div className="about-content w-full p-3 h-auto">
              <p>
                {
                  userProfile?.data.bio?.about?userProfile?.data.bio?.about:"Enter some about"
                }
              </p>
            </div>
          </div>
    </>
  )
}

export default About