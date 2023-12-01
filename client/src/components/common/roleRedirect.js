import React from "react";
import { Navigate } from "react-router";

const RoleRedirect = ({ user, children }) => {
  if (!user.isConnected) {
    return <Navigate to="/login" replace />;
  } else {
    if (user.role === "Customer") {
      return <Navigate to="/customerDashbord" replace />;
    }
  }
  return children;
};

export default RoleRedirect;
