import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Leftbar from "../leftbar/Leftbar";
import Rightbar from "../rightbar/Rightbar";

import "./layout.scss";

const Layout = () => {
   return (
      <div className="theme-light">
         <Header />
         <div className="layout">
            <Leftbar />
            <div style={{ flex: 6 }}>
               <Outlet />
            </div>
            <Rightbar />
         </div>
      </div>
   );
};

export default Layout;
