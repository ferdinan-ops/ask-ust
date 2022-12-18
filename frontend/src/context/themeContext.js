import { useEffect } from "react";
import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
   const [darkMode, setDarkMode] = useState(
      JSON.parse(localStorage.getItem("darkMode")) || false
   );

   const [isThemeClicked, setIsThemeClicked] = useState(false);

   const themeHandler = () => {
      setDarkMode(!darkMode);
   };

   const themeClicked = () => {
      setIsThemeClicked(true);
   }

   useEffect(() => {
      setIsThemeClicked(false);
   }, []);

   useEffect(() => {
      localStorage.setItem("darkMode", darkMode);
   }, [darkMode]);

   const value = { themeHandler, darkMode, themeClicked, isThemeClicked }

   return (
      <ThemeContext.Provider value={value}>
         {children}
      </ThemeContext.Provider>
   );
};
