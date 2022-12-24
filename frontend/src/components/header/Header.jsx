import { MagnifyingGlassIcon, BellIcon, MoonIcon, SunIcon, Bars3Icon, HomeIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
import { ThemeContext } from "../../context/themeContext";
import "./header.scss";

const Header = () => {
   const navigate = useNavigate();
   const [showNav, setShowNav] = useState(false);
   const { darkMode, themeHandler, themeClicked } = useContext(ThemeContext);
   const { currentUser } = useContext(AuthContext);

   const toggleHandler = () => {
      themeHandler();
      themeClicked();
   }

   return (
      <div className="header">
         <Bars3Icon className="mobileIcons" onClick={() => setShowNav(true)} />
         <Link className="leftHeader brands" to="/forum/questions">
            <p>a<span className="logo">?</span>k<span>.</span>UST</p>
         </Link>
         {darkMode ?
            <SunIcon className="mobileIcons" onClick={toggleHandler} /> :
            <MoonIcon className="mobileIcons" onClick={toggleHandler} />
         }
         <div className="headerSearchBar">
            <MagnifyingGlassIcon className="icons" />
            <input placeholder="Cari pertanyaan disini..." />
         </div>
         <div className="headerRight">
            <button onClick={() => navigate("/forum/create")}>Buat Pertanyaan</button>
            <HomeIcon className="icons" onClick={() => navigate("/forum/questions")} />
            {darkMode ?
               <SunIcon className="icons mobile" onClick={toggleHandler} /> :
               <MoonIcon className="icons mobile" onClick={toggleHandler} />
            }
            <BellIcon className="icons" onClick={() => navigate("/forum/notification")} />
            <img src={currentUser.profilPicture || "/profile.svg"} alt="" onClick={() => navigate(`/forum/users/${currentUser.id}`)} />
         </div>
         <div className={`mobileNav ${showNav ? "active" : ""}`}>
            <div className="headerTop">
               <div className="headerSearchBar mobile">
                  <MagnifyingGlassIcon className="icons" />
                  <input placeholder="Cari pertanyaan disini..." />
               </div>
               <XMarkIcon className="icons" onClick={() => setShowNav(false)} />
            </div>
            <Link to="/" onClick={() => setShowNav(false)}>Beranda</Link>
            <Link to="/forum/questions" onClick={() => setShowNav(false)}>Pertanyaan</Link>
            <Link to="/forum/tags" onClick={() => setShowNav(false)}>Tags</Link>
            <Link to="/forum/users" onClick={() => setShowNav(false)}>Pengguna</Link>
            <Link to="/forum/notification" onClick={() => setShowNav(false)}>Notifikasi</Link>
            <Link to={`/forum/users/${currentUser.id}`} onClick={() => setShowNav(false)}>
               <div className="headerUserInfo">
                  <img src={currentUser.profilPicture || "/profile.svg"} alt="" />
                  <span>{currentUser.name}</span>
               </div>
            </Link>
            <button onClick={() => {
               navigate("/forum/create");
               setShowNav(false);
            }}>Buat Pertanyaan</button>
         </div>
      </div>
   );
};

export default Header;
