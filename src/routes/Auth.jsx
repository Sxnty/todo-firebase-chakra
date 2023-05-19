import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../states/AuthContext";
import Loading from "../components/Loading/Loading";

function Auth({ children }) {
  const { userLoading, userLoged } = useContext(AuthContext);
  if (userLoading) {
    return <Loading/>;
  }
  if (!userLoged) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

export default Auth;