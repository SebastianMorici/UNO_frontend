import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../auth/context/UserContext";

export const PublicRoute = ({ children }: any) => {
   const { logged } = useContext(UserContext);
   return logged ? <Navigate to="/" /> : children;
};
