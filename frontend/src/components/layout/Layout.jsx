import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import Header from "../header/Header";
import Leftbar from "../leftbar/Leftbar";
import Rightbar from "../rightbar/Rightbar";

import "./layout.scss";

const Layout = () => {
   const { darkMode } = useContext(ThemeContext);

   return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
         <Header />
         <div style={{ display: "flex" }}>
            <Leftbar />
            <div style={{ flex: 4.5 }}>
               <Outlet />
            </div>
            <Rightbar />
         </div>
      </div>
   );
};

export default Layout;
