import { ThemeContext } from "../../context/themeContext";
import Rightbar from "../rightbar/Rightbar";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Leftbar from "../leftbar/Leftbar";
import Header from "../header/Header";

import "./layout.scss";

const Layout = ({ isLeftBar }) => {
   const { darkMode } = useContext(ThemeContext);

   return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
         <Header />
         <div style={{ display: "flex" }}>
            {!isLeftBar && <Leftbar />}
            <div className={isLeftBar ? "otherMain" : "mainLayout"}>
               <Outlet />
            </div>
            {!isLeftBar && <Rightbar />}
         </div>
      </div>
   );
};

export default Layout;
