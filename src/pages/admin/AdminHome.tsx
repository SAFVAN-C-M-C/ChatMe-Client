
import { useSelector } from 'react-redux'
import NavBar from '../../components/admin/NavBar'
import { RootState } from '../../redux/store';

const AdminHome = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <>
    <div className="flex">
    <NavBar/>
    <div className="main-cover w-full   flex flex-col ">
      <div className="greeting ml-14 mt-2 felx">
        <span>Hello Admin,</span><span className='font-bold text-lg'>{user?.data?.name}</span>
      </div>
    </div>
    </div>
    
    </>
  )
}

export default AdminHome