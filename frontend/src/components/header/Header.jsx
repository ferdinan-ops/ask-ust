import React from "react";

import {
   MagnifyingGlassIcon,
   BellIcon,
   MoonIcon,
} from "@heroicons/react/24/outline";
import "./header.scss";

const Header = () => {
   const random = "https://source.unsplash.com/random/200x200?profile";

   return (
      <div className="header">
         <div className="container">
            <div className="left">
               <p>
                  a<span className="logo">?</span>k<span>.</span>UST
               </p>
            </div>
            <div className="searchBar">
               <MagnifyingGlassIcon className="icons" />
               <input placeholder="Cari pertanyaan disini..." />
            </div>
            <div className="right">
               <button>Buat Pertanyaan</button>
               <MoonIcon className="icons" />
               <BellIcon className="icons" />
               <img src={random} alt="" />
            </div>
         </div>
      </div>
   );
};

export default Header;
