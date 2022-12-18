import { BookmarkIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import React, { useState, useContext, useEffect } from 'react';

import Post from '../../components/post/Post';
import { AuthContext } from '../../context/authContext';
import { postDummy } from '../../utils/dummy';
import { Modal } from "../../components"
import "./profile.scss";

const Profile = () => {
   const { currentUser } = useContext(AuthContext);
   const [isSaveTabs, setIsSaveTabs] = useState(false);
   const [isModalShow, setIsModalShow] = useState(false);

   useEffect(() => {
      document.title = currentUser.name + " | ask.UST";
   }, [currentUser]);

   return (
      <div className="profile">
         <div className="profileWrapper">
            <div className="profileHeading">
               <div className="profileUserInfo">
                  <img src={currentUser.profilPic} alt="" />
                  <span>{currentUser.name}</span>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex esse rerum vel animi! Aliquam eius debitis odit molestiae repellendus in dolorum excepturi obcaecati ullam, non temporibus labore veniam repellat alias?</p>
               </div>
               <div className="profileButtons">
                  <button onClick={(e) => { e.preventDefault(); setIsModalShow(true) }}>Ubah Profil</button>
                  <button>Keluar</button>
               </div>
            </div>

            <div className="profileContents">
               <div className="profileTabs">
                  <button className={isSaveTabs ? "" : "active"} onClick={() => setIsSaveTabs(false)}>
                     <QuestionMarkCircleIcon className={isSaveTabs ? "icons" : "icons active"} />
                  </button>
                  <button className={isSaveTabs ? "active" : ""} onClick={() => setIsSaveTabs(true)}>
                     <BookmarkIcon className={isSaveTabs ? "icons active" : "icons"} />
                  </button>
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