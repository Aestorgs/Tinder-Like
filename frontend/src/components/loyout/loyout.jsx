import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { users } from "../../App";

// un systeme de connexion si il est connecter il passe sinon il revient au login
export const Layout = () => {
  const { me } = React.useContext(users);

  return <div> {me ? <Outlet /> : <Navigate to="/login" />}</div>;
};
