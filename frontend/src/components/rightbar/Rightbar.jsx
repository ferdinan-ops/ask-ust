import { CheckBadgeIcon, PaperClipIcon, UserIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import React, { useContext, useEffect } from "react";

import { getActiveUser } from "../../config/redux/features/userSlice";
import { AuthContext } from "../../context/authContext";
import "./rightbar.scss";
import { IMG_URI } from "../../utils/dummy";

const Rightbar = () => {
   const dispatch = useDispatch();
   const { currentUser } = useContext(AuthContext);
   const { active } = useSelector((state) => state.user);
   useEffect(() => { dispatch(getActiveUser()) }, [dispatch]);

   return (
      <div className="rightbar">
         <div className="rightContainer">
            <div className="rightTop">
               <PaperClipIcon className="icons" />
               <span>Selamat Datang</span>
            </div>
            <div className="rightBottom">
               Hai {currentUser.name}, selamat datang di ask.UST, Mau tau kamu bisa apa aja disini 😝 ?
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
               {active.map((item) => (
                  <div className="rightItem" key={item._id}>
                     <div className="rigthUserInfo">
                        <img src={item.profilePicture ? `${IMG_URI}/${item.profilePicture}` : "/profile.svg"} alt="" />
                        <span>{item.name}</span>
                     </div>
                     <CheckBadgeIcon className="icons" />
                  </div>
               ))
               }
            </div>
         </div>
      </div>
   );
};

export default Rightbar;
