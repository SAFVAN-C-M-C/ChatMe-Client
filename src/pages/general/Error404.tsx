import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const Error404 = () => {
  const { profile } = useSelector((state: RootState) => state.profile);
  return (
    <div data-theme={profile?.data.theme || "light"} className="h-screen w-full flex flex-col justify-center items-center">
      <p className="mt-20 font-semibold text-xl">Error 404 | Page Not Found</p>

    </div>
  )
}

export default Error404