import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { TablePage } from "../table/pages/TablePage";
import { Navbar } from "../ui/components/Navbar";
import { HomePage } from "../ui/pages/HomePage";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
   return (
      <>
         <Routes>
            <Route
               path="/login"
               element={
                  <PublicRoute>
                     <LoginPage />
                  </PublicRoute>
               }
            />
            <Route
               path="/register"
               element={
                  <PublicRoute>
                     <RegisterPage />
                  </PublicRoute>
               }
            />
            <Route
               path="/table"
               element={
                  <PrivateRoute>
                     <Navbar /> <TablePage />
                  </PrivateRoute>
               }
            />
            <Route
               path="/*"
               element={
                  <PrivateRoute>
                     <Navbar /> <HomePage />
                  </PrivateRoute>
               }
            />
         </Routes>
      </>
   );
};
