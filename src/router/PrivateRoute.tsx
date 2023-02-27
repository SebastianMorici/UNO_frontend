import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../auth/context/UserContext';

export const PrivateRoute = ({ children }: any) => {
   const { logged } = useContext(UserContext);

   return logged ? children : <Navigate to="/login" />
 
}
