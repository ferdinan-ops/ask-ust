import {
   GlobeAsiaAustraliaIcon,
   HashtagIcon,
   UserCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

import "./leftbar.scss";

const Leftbar = () => {
   return (
      <div className="leftbar">
         <div className="container">
            <Link to="/">Beranda</Link>
            <p>public</p>
            <div className="public">
               <div className="item">
                  <div className="link">
                     <GlobeAsiaAustraliaIcon className="icons" />
                     <Link to="/">Pertanyaan</Link>
                  </div>
                  <div className="bar"></div>
               </div>
               <div className="item">
                  <div className="link">
                     <HashtagIcon className="icons" />
                     <Link to="/">Tags</Link>
                  </div>
               </div>
               <div className="item">
                  <div className="link">
                     <UserCircleIcon className="icons" />
                     <Link to="/">Pengguna</Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Leftbar;
