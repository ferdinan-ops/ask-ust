import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import "./notification.scss";

const Notification = () => {
   const { currentUser } = useContext(AuthContext);
   return (
      <div className='notification'>
         <div className="notifWrapper">
            <div className="pagesTitle">
               <h1>Notifikasi</h1>
               <span>Disini anda bisa melihat semua notifikasi berhubungan dengan topik yang terkait dengan anda.</span>
               <p><b>Klik notifikasinya untuk menuju ke topik.</b></p>
            </div>
            <div className="notifContent">
               <div className="notifCard">
                  <div className="notifUserInfo">
                     <img src={currentUser.profilPic} alt="" />
                     <div className='notifDetails'>
                        <span>{currentUser.name} <span className="notifDesc">menjawab pertanyaan Anda</span></span>
                        <span className="notifDate">1 hari yang lalu</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Notification;