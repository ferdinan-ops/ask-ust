import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeContextProvider } from "./context/themeContext";
import { AuthContextProvider } from "./context/authContext";
import "./style.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <ThemeContextProvider>
         <AuthContextProvider>
            <App />
         </AuthContextProvider>
      </ThemeContextProvider>
   </React.StrictMode>
);
