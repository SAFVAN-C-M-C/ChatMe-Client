import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const PrivetRoutes = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return user?.loggined && !user?.data.isBlocked ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivetRoutes;
