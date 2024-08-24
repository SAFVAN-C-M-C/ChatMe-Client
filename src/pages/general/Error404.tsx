import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const { profile } = useSelector((state: RootState) => state.profile);
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const goToHome = () => {
    if (user?.data._id) {
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };
  return (
    <div
      data-theme={profile?.data.theme || "light"}
      className="h-screen w-full flex flex-col justify-center items-center"
    >
      <p className="mt-20 font-semibold text-xl">Error 404 | Page Not Found</p>
      <span className="text-blue-600" onClick={goToHome}>
        Goto Home
      </span>
    </div>
  );
};

export default Error404;
