import React from "react";
import { CheckBadgeIcon, PaperClipIcon, UserIcon } from "@heroicons/react/20/solid";
import "./rightbar.scss";

const Rightbar = () => {
   const random = "https://source.unsplash.com/random/200x200?profile";

   return (
      <div className="rightbar">
         <div className="container">
            <div className="top">
               <PaperClipIcon className="icons" />
               <span>Selamat Datang</span>
            </div>
            <div className="bottom">
               Hai Ferdinan, selamat datang di ask.UST, Mau tau kamu bisa apa aja disini 😝 ?
               <ul>
                  <li>Kamu bisa membuat pertanyaan</li>
                  <li>Kamu bisa menjawab pertanyaan</li>
                  <li>Kamu bisa mencari pertanyaan</li>
                  <li>Dan masih banyak lagi</li>
               </ul>
            </div>
         </div>
         <div className="container">
            <div className="top">
               <UserIcon className="icons" />
               <span>Pengguna teraktif</span>
            </div>
            <div className="bottom">
               <div className="item">
                  <div className="userInfo">
                     <img src={random} alt="" />
                     <span>John Doe</span>
                  </div>
                  <CheckBadgeIcon className="icons" />
               </div>
               <div className="item">
                  <div className="userInfo">
                     <img src="https://source.unsplash.com/random/200x200?robot" alt="" />
                     <span>Rapitch Bick</span>
                  </div>
                  <CheckBadgeIcon className="icons" />
               </div>
               <div className="item">
                  <div className="userInfo">
                     <img src="https://source.unsplash.com/random/200x200?technology" alt="" />
                     <span>Boel Boeman</span>
                  </div>
                  <CheckBadgeIcon className="icons" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Rightbar;
