import { GlobeAsiaAustraliaIcon, HashtagIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import React from "react";

import "./leftbar.scss";

const Leftbar = () => {
   return (
      <div className="leftbar">
         <div className="leftContainer">
            <Link to="/">Beranda</Link>
            <p>public</p>
            <div className="public">
               <NavLink to="/forum/questions" className={({ isActive }) => isActive ? "leftItem active" : "leftItem"}>
                  <div className="link">
                     <GlobeAsiaAustraliaIcon className="icons" />
                     <span>Pertanyaan</span>
                  </div>
                  <div className="bar"></div>
               </NavLink>
               <NavLink to="/forum/tags" className={({ isActive }) => isActive ? "leftItem active" : "leftItem"}>
                  <div className="link">
                     <HashtagIcon className="icons" />
                     <span>Tags</span>
                  </div>
                  <div className="bar"></div>
               </NavLink>
               <NavLink to="/forum/users" className={({ isActive }) => isActive ? "leftItem active" : "leftItem"}>
                  <div className="link">
                     <UserCircleIcon className="icons" />
                     <span>Pengguna</span>
                  </div>
                  <div className="bar"></div>
               </NavLink>
            </div>
         </div>
      </div>
   );
};

export default Leftbar;
