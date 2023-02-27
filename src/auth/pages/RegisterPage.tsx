import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";

export const RegisterPage = () => {
   const [userInputValue, setUserInputValue] = useState<string>("");
   const navigate = useNavigate();
   const { REACT_APP_API_URL } = process.env;

   const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      e.preventDefault();
      setUserInputValue(e.target.value);
   };
   const handleInputClick = (e: React.MouseEvent): void => {
      e.preventDefault();
      setUserInputValue("");
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         await axios.post(
            `${REACT_APP_API_URL}/players`,
            JSON.stringify({
               name: userInputValue,
            }),
            {
               headers: {
                  "Content-type": "application/json; charset=UTF-8",
               },
            }
         );

         if (userInputValue.trim().length > 0) setUserInputValue("");

         navigate("/login");
      } catch (e: any) {
         alert(e.response.data.message);
      }
   };

   return (
      <div className="container">
         <div className="register_form">
            <h1> UNO </h1>
            <h5>Register</h5>
            <hr />
            <form onSubmit={handleSubmit}>
               <input
                  placeholder="User"
                  type="text"
                  value={userInputValue}
                  onChange={handleUserInputChange}
                  onClick={handleInputClick}
               />
               <button className="btn btn-outline-primary mt-1">Register</button>
            </form>
            <div>
               <Link to="/login">Login</Link>
            </div>
         </div>
      </div>
   );
};
