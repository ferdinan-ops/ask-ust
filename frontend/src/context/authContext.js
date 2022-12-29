import { createContext, useEffect, useState } from "react";
import { loginAPI, logoutAPI } from "../config/api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(
      JSON.parse(localStorage.getItem("user") || null)
   );

   const login = async (fields) => {
      const now = new Date();
      const { data } = await loginAPI(fields);
      let user = data.user;
      user.maxAge = now.getTime() + data.maxAge;
      setCurrentUser(user);
   };

   const logout = async () => {
      setCurrentUser(null);
      localStorage.removeItem("user");
      await logoutAPI();
   }

   const updateUser = (fields) => {
      setCurrentUser(fields);
   }

   useEffect(() => {
      const now = new Date();
      if (now.getTime() > currentUser?.maxAge) {
         setCurrentUser(null);
         localStorage.removeItem("user");
      }
   }, [currentUser]);

   useEffect(() => {
      localStorage.setItem("user", JSON.stringify(currentUser));
   }, [currentUser]);

   return (
      <AuthContext.Provider value={{ currentUser, login, logout, updateUser }}>
         {children}
      </AuthContext.Provider>
   );
};
