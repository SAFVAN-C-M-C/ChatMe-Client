
import { useEffect } from 'react';
import NavigationBar from '../../components/NavigationBar'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const Home = () => {
  const { user } = useSelector((state: RootState) => state.user);
  console.log(user,"in home");
  
  const navigate=useNavigate()
useEffect(()=>{
    if(!user?.loggined){
        navigate('/login',{replace:true})
    }
},[user,navigate])
  return (
    <>
    <NavigationBar/>
    </>
  )
}

export default Home