import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  console.log(isAuthenticated, user)
  const location = useLocation();

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") || 
      location.pathname.includes("/home") ||
      location.pathname.includes("/products") ||
      location.pathname.includes("/about") ||
      location.pathname.includes("/contact")
    )
  ) {
    return <Navigate to={"/auth/login"} />;
  }
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "Admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"/home"} />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "Admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to={"/home"} />;
  }
  return <>{children}</>;
};

export default CheckAuth;
