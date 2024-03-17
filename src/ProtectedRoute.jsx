import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLogged, children }) {
  if (!isLogged) {
    return <Navigate to="/not_Connected" />;
  }
  return children;
}

export default ProtectedRoute;
