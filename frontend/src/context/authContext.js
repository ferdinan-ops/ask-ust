import { createContext, useEffect, useState } from "react";
import { loginAPI } from "../config/api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(
      JSON.parse(localStorage.getItem("user") || null)
   );

   const login = async (fields) => {
      const { data } = await loginAPI(fields);
      setCurrentUser(data);
      return data;
   };

   useEffect(() => {
      localStorage.setItem("user", JSON.stringify(currentUser));
   }, [currentUser]);

   return (
      <AuthContext.Provider value={{ currentUser, login }}>
         {children}
      </AuthContext.Provider>
   );
};
