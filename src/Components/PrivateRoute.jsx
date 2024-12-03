import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { CurrentUser } = useSelector((state) => state.Users);
  return CurrentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
