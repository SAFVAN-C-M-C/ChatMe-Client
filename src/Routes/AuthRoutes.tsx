import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const AuthRoutes = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return !user?.loggined ? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthRoutes;
