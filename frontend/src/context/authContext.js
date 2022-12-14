import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(
      JSON.parse(localStorage.getItem("user") || null)
   );

   const login = () => {
      setCurrentUser({
         id: 1,
         name: "Ferdinan Imanuel Tumanggor",
         profilPic: "https://source.unsplash.com/random/200x200?computer",
      });
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
