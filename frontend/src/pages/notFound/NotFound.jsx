import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Link } from "react-router-dom";

import "./notFound.scss";

const NotFound = () => {
   return (
      <div className="not-found">
         <div className="logo-not-found">
            <p>a<span className="logo">?</span>k<span>.</span>UST</p>
         </div>
         <div className="container-not-found">
            <div className="top-not-found">
               <h1>404</h1>
               <p>Halaman tidak dapat ditemukan</p>
            </div>
            <div className="content-not-found">
               <img src="/404.svg" alt="" />
            </div>
            <Link to="/">
               <ArrowUturnLeftIcon className="icons" />
               <span>Kembali</span>
            </Link>
         </div>
      </div>
   )
}

export default NotFound;