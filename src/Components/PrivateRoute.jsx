import React from "react";
import { Auth } from "./AuthContext";
import { Navigate, useLocation } from "react-router";


const PrivateRoute = ({ children }) => {
  const { user, loading } = Auth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;
