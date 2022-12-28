import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  let location = useLocation();
  console.log(localStorage.getItem("user"));
  // remove the next line and uncomment the next two lines to test the protected route
  return !localStorage.getItem("user") ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : localStorage.getItem("user").role !== "administrator" ? (
    <Navigate to="/" state={{ from: location }} />
  ) : (
    <Outlet />
  );
}
