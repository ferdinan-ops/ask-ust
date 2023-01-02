import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Ring } from '@uiball/loaders';

import { getUsers, searchUser, setIsLoading } from '../../config/redux/features/userSlice';
import { InfiniteScroll } from '../../components';
import { IMG_URI } from '../../utils/dummy';
import "./users.scss";

const Users = () => {
   const [searchParams] = useSearchParams();
   const [keyword, setKeyword] = useState("");
   const [page, setPage] = useState(9);

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const params = searchParams.get("search");

   const { users, isLoading, counts } = useSelector((state) => state.user);

   useEffect(() => { document.title = "Pengguna | ask.UST" }, []);
   useEffect(() => {
      if (!params) {
         dispatch(getUsers(page));
      } else {
         dispatch(searchUser({ params, page }));
      }
   }, [dispatch, params, page]);

   const submitHandler = (e) => {
      e.preventDefault();
      navigate({
         pathname: "/forum/users",
         search: `?${createSearchParams({ search: keyword })}`
      });
      setIsLoading(true);
      setPage(9)
   }

   const loadHandler = (e) => {
      e.preventDefault();
      setPage(page + 3);
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
               <input
                  placeholder="Cari berdasarkan nama pengguna"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
               />
            </form>
            <div className="usersContent">
               {users.length > 0 ? (
                  users.map((user) => (
                     <div className="user" key={user._id} onClick={() => navigate(`/forum/users/${user._id}`)}>
                        <div className='userData'>
                           <div className="userDataImg">
                              <img src={user.profilePicture ? `${IMG_URI}/${user.profilePicture}` : "/profile.svg"} alt="" />
                           </div>
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
               {users.length > 8 && (
                  <InfiniteScroll
                     counts={counts}
                     dataLength={users.length}
                     isLoading={isLoading}
                     loadMoreHandler={loadHandler}
                  />
               )}
            </div>
         </div>
      </div>
   )
}

export default Users;