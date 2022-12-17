import React from "react";
import { CheckBadgeIcon, PaperClipIcon, UserIcon } from "@heroicons/react/20/solid";
import "./rightbar.scss";

const Rightbar = () => {
   const random = "https://source.unsplash.com/random/200x200?profile";

   return (
      <div className="rightbar">
         <div className="rightContainer">
            <div className="rightTop">
               <PaperClipIcon className="icons" />
               <span>Selamat Datang</span>
            </div>
            <div className="rightBottom">
               Hai Ferdinan, selamat datang di ask.UST, Mau tau kamu bisa apa aja disini 😝 ?
               <ul>
                  <li>Kamu bisa membuat pertanyaan</li>
                  <li>Kamu bisa menjawab pertanyaan</li>
                  <li>Kamu bisa mencari pertanyaan</li>
                  <li>Dan masih banyak lagi</li>
               </ul>
            </div>
         </div>
         <div className="rightContainer">
            <div className="rightTop">
               <UserIcon className="icons" />
               <span>Pengguna teraktif</span>
            </div>
            <div className="rightBottom">
               <div className="rightItem">
                  <div className="rigthUserInfo">
                     <img src={random} alt="" />
                     <span>John Doe</span>
                  </div>
                  <CheckBadgeIcon className="icons" />
               </div>
               <div className="rightItem">
                  <div className="rigthUserInfo">
                     <img src="https://source.unsplash.com/random/200x200?robot" alt="" />
                     <span>Rapitch Bick</span>
                  </div>
                  <CheckBadgeIcon className="icons" />
               </div>
               <div className="rightItem">
                  <div className="rigthUserInfo">
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
