import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";

import { ThemeContextProvider } from "./context/themeContext";
import { AuthContextProvider } from "./context/authContext";
import { store } from "./config/redux/app/store";

import App from "./App";
import "./style.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <ThemeContextProvider>
            <AuthContextProvider>
               <App />
            </AuthContextProvider>
         </ThemeContextProvider>
      </Provider>
   </React.StrictMode>
);