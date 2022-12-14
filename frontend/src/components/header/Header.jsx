import { MagnifyingGlassIcon, BellIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
import { ThemeContext } from "../../context/themeContext";
import "./header.scss";

const Header = () => {
   const { darkMode, themeHandler } = useContext(ThemeContext);
   const { currentUser } = useContext(AuthContext);

   return (
      <div className="header">
         <Link className="left" to="/forum">
            <p>
               a<span className="logo">?</span>k<span>.</span>UST
            </p>
         </Link>
         <div className="searchBar">
            <MagnifyingGlassIcon className="icons" />
            <input placeholder="Cari pertanyaan disini..." />
         </div>
         <div className="right">
            <button>Buat Pertanyaan</button>
            {darkMode ? (
               <SunIcon className="icons" onClick={themeHandler} />
            ) : (
               <MoonIcon className="icons" onClick={themeHandler} />
            )}
            <BellIcon className="icons" />
            <img src={currentUser.profilPic} alt="" />
         </div>
      </div>
   );
};

export default Header;
