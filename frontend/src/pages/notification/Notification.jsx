import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import "./notification.scss";

const Notification = () => {
   const { currentUser } = useContext(AuthContext);
   return (
      <div className='notification'>
         <div className="container">
            <div className="heading">
               <h1>Notifikasi</h1>
               <span>Disini anda bisa melihat semua notifikasi berhubungan dengan topik yang terkait dengan anda.</span>
               <p><b>Klik notifikasinya untuk menuju ke topik.</b></p>
            </div>
            <div className="content">
               <div className="card">
                  <div className="userInfo">
                     <img src={currentUser.profilPic} alt="" />
                     <div className='details'>
                        <span>{currentUser.name} <span className="desc">menjawab pertanyaan Anda</span></span>
                        <span className="date">1 hari yang lalu</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Notification;