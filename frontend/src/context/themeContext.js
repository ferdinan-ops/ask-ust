import { useEffect } from "react";
import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
   const [darkMode, setDarkMode] = useState(
      JSON.parse(localStorage.getItem("darkMode")) || false
   );

   const themeHandler = () => {
      setDarkMode(!darkMode);
   };

   useEffect(() => {
      localStorage.setItem("darkMode", darkMode);
   }, [darkMode]);

   return (
      <ThemeContext.Provider value={{ themeHandler, darkMode }}>
         {children}
      </ThemeContext.Provider>
   );
};
