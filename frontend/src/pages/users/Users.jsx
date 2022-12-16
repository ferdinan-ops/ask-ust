import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { AuthContext } from "../../context/authContext"

import "./users.scss";

const Users = () => {
   const random = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
   const { currentUser } = useContext(AuthContext);

   useEffect(() => {
      document.title = "Pengguna | ask.UST";
   }, []);

   return (
      <div className='users'>
         <div className="container">
            <div className="heading">
               <h1>Pengguna</h1>
               <span>Kamu bisa mencari seluruh pengguna yang memakai layanan <b>ask.UST</b> yang dimulai dari pengguna yang sangat aktif sampai pengguna yang tidak aktif di <b>ask.UST</b></span>
            </div>
            <div className="searchBar">
               <MagnifyingGlassIcon className="icons" />
               <input placeholder="Cari berdasarkan nama pengguna" />
            </div>
            <div className="content">
               {random.map((item) => (
                  <div className="user" key={item}>
                     <img src={currentUser.profilPic} alt="" />
                     <div className="details">
                        <span>{currentUser.name}</span>
                        <span>1200 pertanyaan</span>
                        <span>120 poin</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Users;