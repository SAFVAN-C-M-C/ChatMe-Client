
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Home from "../pages/user/general/Home";
import AdminHome from '../pages/admin/AdminHome';

const RolebaseRoutes = () => {
  const { user } = useSelector((state: RootState) => state.user);
    if(user?.data?.role==="user"){
      return <Home/>
    }else{
      return <AdminHome/>
    }
}

export default RolebaseRoutes