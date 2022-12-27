import { BookmarkIcon as BookmarkSolidIcon, HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import Prism from "prismjs";

import { getPost } from "../../config/redux/features/postSlice";
import { likePostAPI, savePostAPI } from "../../config/api";
import { Answers, More, Warning } from "../../components";
import { AuthContext } from "../../context/authContext";

import "prismjs/themes/prism-dracula.css";
import "./detail.scss";

const Detail = () => {
   const [isSaved, setIsSaved] = useState(false);
   const [isLiked, setIsLiked] = useState(false);

   const { id } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { currentUser } = useContext(AuthContext);
   const { post } = useSelector((state) => state.post);
   const { _id: userId, name } = currentUser;

   useEffect(() => { Prism.highlightAll() });
   useEffect(() => { dispatch(getPost(id)) }, [id, dispatch, isLiked]);
   useEffect(() => { document.title = post.title + " | ask.UST" }, [post]);
   useEffect(() => { setIsLiked((post?.likes?.findIndex((id) => id === String(userId))) !== -1) }, [post, userId]);
   useEffect(() => { setIsSaved((post?.saved?.findIndex((id) => id === String(userId))) !== -1) }, [post, userId]);

   const likeHandler = async () => {
      await likePostAPI(id);
      dispatch(getPost(id));
   }

   const saveHandler = async () => {
      await savePostAPI(id);
      dispatch(getPost(id));
   }

   return (
      <div className="detail">
         <div className="detailWrapper">
            <Warning name={name} />
            <div className="detailHead">
               <h1>{post.title}</h1>
               <div className="detailUserInfo">
                  <span>Author: </span>
                  <img src={post?.user?.profilePicture || "/profile.svg"} alt="" />
                  <span className="name">{post?.user?.name}</span>
                  &bull;
                  <Moment fromNow>{post?.createdAt}</Moment>
                  <More isPost isMine={userId === post?.user?._id} id={post._id} />
               </div>
            </div>
            <div className="detailContent">
               <div className="descWrapper">
                  <div dangerouslySetInnerHTML={{ __html: post.desc }} className="detailDesc" />
               </div>

               <div className="detailAllTags">
                  {post?.tags?.map((item) => (
                     <button key={item} onClick={() => navigate(`/forum/tags/${item}`)}>
                        # {item}
                     </button>
                  ))}
               </div>
               <div className="detailActions">
                  <div className="detailItem">
                     <div className="detailIconWrapper" onClick={likeHandler}>
                        {isLiked ? <HeartSolidIcon className="icons liked" /> : <HeartIcon className="icons" />}
                     </div>
                     <span>{post?.likes?.length}</span>
                  </div>
                  <div className="detailItem">
                     <div className="detailIconWrapper" onClick={saveHandler}>
                        {isSaved ? <BookmarkSolidIcon className="icons saved" /> : <BookmarkIcon className="icons" />}
                     </div>
                     <span>{post?.saved?.length}</span>
                  </div>
               </div>
            </div>
            <Answers postId={post._id} bestAnswerId={post.bestAnswerId} userPostId={post?.user?._id} />
         </div>
      </div >
   );
};

export default Detail;
