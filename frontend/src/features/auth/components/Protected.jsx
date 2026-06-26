import { useEffect } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";

const Protected = ({ children }) => {
  

  const { user, loading } = useSelector(
    (state) => state.auth
  );

  // Jab tak auth check complete na ho
  if (loading) {
    return <LoadingSpinner />;
  }

  // Auth check complete ho gaya, lekin user nahi mila
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User authenticated hai
  return children;
};

export default Protected;