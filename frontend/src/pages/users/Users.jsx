import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Ring } from '@uiball/loaders';

import { getUsers, searchUser } from '../../config/redux/features/userSlice';
import "./users.scss";

const Users = () => {
   const [searchParams] = useSearchParams();
   const [keyword, setKeyword] = useState("");

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const params = searchParams.get("search");

   const { users, isLoading } = useSelector((state) => state.user);

   useEffect(() => { document.title = "Pengguna | ask.UST" }, []);
   useEffect(() => {
      if (!params) {
         dispatch(getUsers());
      } else {
         dispatch(searchUser(params));
      }
   }, [dispatch, params]);

   const submitHandler = (e) => {
      e.preventDefault();
      navigate({
         pathname: "/forum/users",
         search: `?${createSearchParams({ search: keyword })}`
      });
   }

   return (
      <div className="users">
         <div className="usersContainer">
            <div className="pagesTitle">
               <h1>Pengguna</h1>
               <span>Kamu bisa mencari seluruh pengguna yang memakai layanan <b>ask.UST</b> yang dimulai dari pengguna yang sangat aktif sampai pengguna yang tidak aktif di <b>ask.UST</b></span>
            </div>
            <form className="usersSearchBar" onSubmit={submitHandler}>
               <MagnifyingGlassIcon className="icons" />
               <input placeholder="Cari berdasarkan nama pengguna" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            </form>
            <div className="usersContent">
               {users.length > 0 ? (
                  users.map((user) => (
                     <div className="user" key={user._id}>
                        <div className='userData'>
                           <img src={user.profilPicture || "/profile.svg"} alt="" />
                           <div className="usersDetails">
                              <span>{user.name}</span>
                              <span>{user.postsCount} pertanyaan</span>
                           </div>
                        </div>
                        <span className='userScore'>{user.score} poin</span>
                     </div>
                  ))
               ) : (
                  isLoading ? (
                     <div className='loadingPage'>
                        <Ring size={30} lineWeight={8} speed={2} color="#00bac7" />
                     </div>
                  ) : (
                     params && <p>Maaf pengguna <b><i>{params}</i></b> tidak ditemukan 😔</p>
                  )
               )}{users.length > 0 ? (
                  users.map((user) => (
                     <div className="user" key={user._id}>
                        <div className='userData'>
                           <img src={user.profilPicture || "/profile.svg"} alt="" />
                           <div className="usersDetails">
                              <span>{user.name}</span>
                              <span>{user.postsCount} pertanyaan</span>
                           </div>
                        </div>
                        <span className='userScore'>{user.score} poin</span>
                     </div>
                  ))
               ) : (
                  isLoading ? (
                     <div className='loadingPage'>
                        <Ring size={30} lineWeight={8} speed={2} color="#00bac7" />
                     </div>
                  ) : (
                     params && <p>Maaf pengguna <b><i>{params}</i></b> tidak ditemukan 😔</p>
                  )
               )}{users.length > 0 ? (
                  users.map((user) => (
                     <div className="user" key={user._id}>
                        <div className='userData'>
                           <img src={user.profilPicture || "/profile.svg"} alt="" />
                           <div className="usersDetails">
                              <span>{user.name}</span>
                              <span>{user.postsCount} pertanyaan</span>
                           </div>
                        </div>
                        <span className='userScore'>{user.score} poin</span>
                     </div>
                  ))
               ) : (
                  isLoading ? (
                     <div className='loadingPage'>
                        <Ring size={30} lineWeight={8} speed={2} color="#00bac7" />
                     </div>
                  ) : (
                     params && <p>Maaf pengguna <b><i>{params}</i></b> tidak ditemukan 😔</p>
                  )
               )}{users.length > 0 ? (
                  users.map((user) => (
                     <div className="user" key={user._id}>
                        <div className='userData'>
                           <img src={user.profilPicture || "/profile.svg"} alt="" />
                           <div className="usersDetails">
                              <span>{user.name}</span>
                              <span>{user.postsCount} pertanyaan</span>
                           </div>
                        </div>
                        <span className='userScore'>{user.score} poin</span>
                     </div>
                  ))
               ) : (
                  isLoading ? (
                     <div className='loadingPage'>
                        <Ring size={30} lineWeight={8} speed={2} color="#00bac7" />
                     </div>
                  ) : (
                     params && <p>Maaf pengguna <b><i>{params}</i></b> tidak ditemukan 😔</p>
                  )
               )}{users.length > 0 ? (
                  users.map((user) => (
                     <div className="user" key={user._id}>
                        <div className='userData'>
                           <img src={user.profilPicture || "/profile.svg"} alt="" />
                           <div className="usersDetails">
                              <span>{user.name}</span>
                              <span>{user.postsCount} pertanyaan</span>
                           </div>
                        </div>
                        <span className='userScore'>{user.score} poin</span>
                     </div>
                  ))
               ) : (
                  isLoading ? (
                     <div className='loadingPage'>
                        <Ring size={30} lineWeight={8} speed={2} color="#00bac7" />
                     </div>
                  ) : (
                     params && <p>Maaf pengguna <b><i>{params}</i></b> tidak ditemukan 😔</p>
                  )
               )}
            </div>
         </div>
      </div>
   )
}

export default Users;