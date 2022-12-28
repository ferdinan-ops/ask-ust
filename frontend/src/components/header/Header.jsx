import { MagnifyingGlassIcon, BellIcon, MoonIcon, SunIcon, Bars3Icon, HomeIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { getNotif } from "../../config/redux/features/notifSlice";

import { AuthContext } from "../../context/authContext";
import { ThemeContext } from "../../context/themeContext";
import { IMG_URI } from "../../utils/dummy";
import "./header.scss";

const Header = () => {
   const [showNav, setShowNav] = useState(false);
   const [keyword, setKeyword] = useState("");

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { currentUser } = useContext(AuthContext);
   const { darkMode, themeHandler, themeClicked } = useContext(ThemeContext);
   const { readCount, counts } = useSelector((state) => state.notif);
   const { _id, name, profilePicture } = currentUser;

   useEffect(() => {
      dispatch(getNotif(counts));
   }, [dispatch, counts]);

   const toggleHandler = () => {
      themeHandler();
      themeClicked();
   }

   const createNavigate = (e) => {
      e.preventDefault();
      navigate("/forum/create");
      setShowNav(false);
   }

   const submitHandler = (e) => {
      e.preventDefault();
      navigate({
         pathname: "/forum/questions",
         search: `?${createSearchParams({ search: keyword })}`,
      });
      setShowNav(false);
      setKeyword("")
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
         <form className="headerSearchBar" onSubmit={submitHandler}>
            <MagnifyingGlassIcon className="icons" />
            <input placeholder="Cari pertanyaan disini..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
         </form>
         <div className="headerRight">
            <button onClick={() => navigate("/forum/create")}>Buat Pertanyaan</button>
            <HomeIcon className="icons" onClick={() => navigate("/forum/questions")} />
            {darkMode ?
               <SunIcon className="icons mobile" onClick={toggleHandler} /> :
               <MoonIcon className="icons mobile" onClick={toggleHandler} />
            }
            <div className="notifIcon">
               <BellIcon className="icons" onClick={() => navigate("/forum/notification")} />
               {readCount > 0 && <div className="dots"></div>}
            </div>
            <img
               alt=""
               src={profilePicture ? `${IMG_URI}/${profilePicture}` : "/profile.svg"}
               onClick={() => navigate(`/forum/users/${_id}`)}
            />
         </div>
         <div className={`mobileNav ${showNav ? "active" : ""}`}>
            <div className="headerTop" onSubmit={submitHandler}>
               <form className="headerSearchBar mobile">
                  <MagnifyingGlassIcon className="icons" />
                  <input placeholder="Cari pertanyaan disini..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
               </form>
               <XMarkIcon className="icons" onClick={() => setShowNav(false)} />
            </div>
            <Link to="/" onClick={() => setShowNav(false)}>Beranda</Link>
            <Link to="/forum/questions" onClick={() => setShowNav(false)}>Pertanyaan</Link>
            <Link to="/forum/tags" onClick={() => setShowNav(false)}>Tags</Link>
            <Link to="/forum/users" onClick={() => setShowNav(false)}>Pengguna</Link>
            <Link to="/forum/notification" onClick={() => setShowNav(false)}>Notifikasi</Link>
            <Link to={`/forum/users/${_id}`} onClick={() => setShowNav(false)}>
               <div className="headerUserInfo">
                  <img src={profilePicture ? `${IMG_URI}/${profilePicture}` : "/profile.svg"} alt="" />
                  <span>{name}</span>
               </div>
            </Link>
            <button onClick={createNavigate}>Buat Pertanyaan</button>
         </div>
      </div>
   );
};

export default Header;
