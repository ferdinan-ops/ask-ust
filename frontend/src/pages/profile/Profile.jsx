import { BookmarkIcon, CameraIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Post from '../../components/post/Post';
import { AuthContext } from '../../context/authContext';
import { postDummy } from '../../utils/dummy';
import { Modal } from "../../components"
import "./profile.scss";

const Profile = () => {
   const [isSaveTabs, setIsSaveTabs] = useState(false);
   const [isModalShow, setIsModalShow] = useState(false);
   const [isCurrentUser, setIsCurrentUser] = useState(false);
   const [user, setUser] = useState({});

   const ref = useRef();
   const navigate = useNavigate();
   const { id } = useParams();
   const { currentUser, logout } = useContext(AuthContext);

   useEffect(() => {
      if (currentUser._id === id) {
         setIsCurrentUser(true)
         setUser(currentUser);
      } else {
         setIsCurrentUser(false);
         setUser(currentUser);
      }
   }, [currentUser, id]);

   useEffect(() => {
      document.title = user.name + " | ask.UST"
   }, [user]);

   const logoutHandler = async (e) => {
      e.preventDefault();
      const ask = window.confirm("Anda yakin ingin keluar dari aplikasi?");
      if (ask) {
         try {
            await logout();
            navigate("/login");
         } catch (error) {
            console.log(error);
         }
      }
   }

   return (
      <div className="profile">
         <div className="profileWrapper">
            <div className="profileHeading">
               <div className="profileUserInfo">
                  <img src={user.profilPicture || "/profile.svg"} alt="" />
                  <span>{user.name}</span>
                  <p>{user.bio || "Belum memiliki bio"}</p>
                  {/* <p>{user.score}</p> */}
               </div>
               {isCurrentUser && (
                  <div className="profileButtons">
                     <button onClick={(e) => { e.preventDefault(); setIsModalShow(true) }}>Ubah Profil</button>
                     <button onClick={logoutHandler}>Keluar</button>
                  </div>
               )}
            </div>

            <div className="profileContents">
               <div className="profileTabs">
                  <button className={isSaveTabs ? "" : "active"} onClick={() => setIsSaveTabs(false)}>
                     <QuestionMarkCircleIcon className={isSaveTabs ? "icons" : "icons active"} />
                  </button>
                  {isCurrentUser && (
                     <button className={isSaveTabs ? "active" : ""} onClick={() => setIsSaveTabs(true)}>
                        <BookmarkIcon className={isSaveTabs ? "icons active" : "icons"} />
                     </button>
                  )}
               </div>
               <div className="profilePosts">
                  {postDummy.map((post) => (
                     <Post key={post.id} post={post} />
                  ))}
               </div>
            </div>
         </div>

         <Modal title="Ubah Profil" isModalShow={isModalShow} setIsModalShow={setIsModalShow}>
            <div className='modalWrapper'>
               <div className="imagesWrapper">
                  <img src={user.profilPicture || "/profile.svg"} alt="" />
                  <div className='iconsWrapper' onClick={() => ref.current.click()}>
                     <CameraIcon className='icons' />
                  </div>
                  <input type="file" accept='image/*' hidden ref={ref} />
               </div>
               <label>
                  <span>Username</span>
                  <input placeholder="Your username" />
               </label>
               <label>
                  <span>Bio</span>
                  <textarea placeholder='Maksimal 200 kata' />
               </label>
            </div>
         </Modal>
      </div>
   )
}

export default Profile;