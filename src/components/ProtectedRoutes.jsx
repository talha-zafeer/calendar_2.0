import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = localStorage.getItem("isAuthenticated") || false;
  return user;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  console.log(isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
