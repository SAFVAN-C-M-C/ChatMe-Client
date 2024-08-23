import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

interface ProtectSpecialRoutesProps {
  type: "otp" | "reset";
  children: ReactNode;
}

const ProtectSpecialRoutes = ({
  type,
  children,
}: ProtectSpecialRoutesProps) => {
  const { user, error } = useSelector((state: RootState) => state.user);

  if (type === "otp") {
    if (user || error) {
      return <>{children}</>;
    } else {
      return <Navigate to="/login" />;
    }
  } else if (type === "reset") {
    if (user?.data?.reset) {
      return <>{children}</>;
    } else {
      return <Navigate to="/login" />;
    }
  }

  // Optionally handle other cases if necessary
  return null;
};

export default ProtectSpecialRoutes;
