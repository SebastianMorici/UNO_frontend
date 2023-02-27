import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from 'react-router-dom';

export const LoginPage = () => {
   const { login } = useContext(UserContext);
   const [userInputValue, setUserInputValue] = useState<string>("");

   const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      e.preventDefault();
      setUserInputValue(e.target.value);
   };

   const handleInputClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setUserInputValue("");
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (login === undefined) return;

      login(userInputValue);
   };

   return (
      <div className="container">
         <div className="login_form">
            <h1> UNO </h1>
            <h5>Login</h5>
            <hr />
            <form onSubmit={handleSubmit}>
               <input
                  placeholder="Usuario"
                  type="text"
                  value={userInputValue}
                  onChange={handleUserInputChange}
                  onClick={handleInputClick}
               />
               <button className="btn btn-outline-primary mt-1">Login</button>
            </form>
            <div>
               <Link to="/register">Register</Link>
            </div>
         </div>
      </div>
   );
};
