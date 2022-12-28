import { BookmarkIcon, CameraIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

import { getMyPosts, getMySavedPosts } from '../../config/redux/features/userSlice';
import { getUserAPI, updateUserAPI, uploadAPI } from '../../config/api';
import { InfiniteScroll, Modal } from "../../components";
import { AuthContext } from '../../context/authContext';
import { IMG_URI } from "../../utils/dummy";
import Post from '../../components/post/Post';
import "./profile.scss";

const Profile = () => {
   const [isSaveTabs, setIsSaveTabs] = useState(false);
   const [isModalShow, setIsModalShow] = useState(false);
   const [isCurrentUser, setIsCurrentUser] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [page, setPage] = useState(3);

   const [user, setUser] = useState({});
   const [name, setName] = useState("");
   const [bio, setBio] = useState("");
   const [file, setFile] = useState(null);

   const ref = useRef();
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { currentUser, logout, updateUser } = useContext(AuthContext);
   const { myPosts, mySavedPosts } = useSelector((state) => state.user);
   const { posts, isLoading: isLoadingPosts, counts: countsPost } = myPosts;
   const { savedPosts, isLoading: isLoadingSaved, counts: countsSaved } = mySavedPosts;

   useEffect(() => {
      const getUser = async () => {
         const { data } = await getUserAPI(id);
         setUser(data);
         setName(data.name);
         setBio(data.bio);
      }
      getUser();
   }, [id]);

   useEffect(() => { if (currentUser._id === id) setIsCurrentUser(true) }, [currentUser, id]);
   useEffect(() => { dispatch(getMyPosts({ page, id })) }, [dispatch, page, id]);
   useEffect(() => { if (isCurrentUser) dispatch(getMySavedPosts(page)) }, [dispatch, page, isCurrentUser]);
   useEffect(() => { document.title = user.name + " | ask.UST" }, [user]);

   const logoutHandler = async (e) => {
      e.preventDefault();
      const ask = window.confirm("Anda yakin ingin keluar dari aplikasi?");
      if (ask) {
         await logout();
         navigate("/login");
      }
   }

   const loadHandler = (e) => {
      e.preventDefault();
      setPage(page + 3);
   }

   const uploadHandler = async () => {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await uploadAPI(formData);
      return data;
   }

   const submitHandler = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      let profilePicture = user.profilePicture;

      try {
         if (file) profilePicture = await uploadHandler();
         const fields = { name, bio, profilePicture }
         await updateUserAPI(fields);
         setTimeout(() => {
            toast.success("Data anda berhasil di ubah");
            updateUser({ ...currentUser, ...fields });
            setIsLoading(false);
         }, 1500);
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className="profile">
         <div className="profileWrapper">
            <div className="profileHeading">
               <div className="profileUserInfo">
                  <img src={user.profilePicture ? `${IMG_URI}/${user.profilePicture}` : "/profile.svg"} alt="" />
                  <span>{user.name}</span>
                  <p>{user.bio || "Belum memiliki bio"}</p>
               </div>
               {isCurrentUser && (
                  <div className="profileButtons">
                     <button onClick={() => setIsModalShow(true)}>Ubah Profil</button>
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
                  {!isSaveTabs ? (
                     <>
                        {posts.length > 0 ? posts.map((post) => (
                           <Post key={post._id} post={post} />
                        )) : (
                           <p className='nonePost'><i>Belum ada pertanyaan</i></p>
                        )}
                        {posts.length > 3 &&
                           <InfiniteScroll
                              counts={countsPost}
                              dataLength={posts.length}
                              isLoading={isLoadingPosts}
                              loadMoreHandler={loadHandler}
                           />
                        }
                     </>
                  ) : (
                     isCurrentUser &&
                     <>
                        {savedPosts.length > 0 ? savedPosts.map((post) => (
                           <Post key={post._id} post={post} />
                        )) : (
                           <p className='nonePost'><i>Belum ada pertanyaan yang disimpan</i></p>
                        )}
                        {savedPosts.length > 3 &&
                           <InfiniteScroll
                              counts={countsSaved}
                              dataLength={savedPosts.length}
                              isLoading={isLoadingSaved}
                              loadMoreHandler={loadHandler}
                           />
                        }
                     </>
                  )}
               </div>
            </div>
         </div>

         <Modal title="Ubah Profil" isModalShow={isModalShow} setIsModalShow={setIsModalShow} isLoading={isLoading} modalSubmit={submitHandler}>
            <div className='modalWrapper'>
               <div className="imagesWrapper">
                  {file ?
                     <img src={URL.createObjectURL(file)} alt="" /> :
                     <img src={user.profilePicture ? `${IMG_URI}/${user.profilePicture}` : "/profile.svg"} alt="" />}
                  <div className='iconsWrapper' onClick={() => ref.current.click()}>
                     <CameraIcon className='icons' />
                  </div>
                  <input type="file" accept='image/*' hidden ref={ref} onChange={(e) => setFile(e.target.files[0])} />
               </div>
               <label>
                  <span>Username</span>
                  <input placeholder="Your username" value={name} onChange={(e) => setName(e.target.value)} />
               </label>
               <label>
                  <span>Bio</span>
                  <textarea placeholder='Maksimal 200 kata' value={bio} onChange={(e) => setBio(e.target.value)} />
               </label>
            </div>
         </Modal>
      </div>
   )
}

export default Profile;