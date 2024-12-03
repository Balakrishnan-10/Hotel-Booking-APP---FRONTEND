import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const OnlyAdminPrivateRoute = () => {
  const { CurrentUser } = useSelector((state) => state.Users);
  return CurrentUser && CurrentUser.Result.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
};

export default OnlyAdminPrivateRoute;
