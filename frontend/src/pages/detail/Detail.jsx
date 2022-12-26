import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import Prism from "prismjs";

import { Answers, More, TextEditor, Warning } from "../../components";
import { getPost } from "../../config/redux/features/postSlice";
import { AuthContext } from "../../context/authContext";

import "prismjs/themes/prism-dracula.css";
import "./detail.scss";

const Detail = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { post } = useSelector((state) => state.post);

   const { currentUser } = useContext(AuthContext);

   useEffect(() => {
      if (typeof window !== "undefined") Prism.highlightAll();
   });
   useEffect(() => { dispatch(getPost(id)) }, [id, dispatch]);
   useEffect(() => { document.title = post.title + " | ask.UST" }, [post]);

   return (
      <div className="detail">
         <div className="detailWrapper">
            <Warning name={currentUser.name} />
            <div className="detailHead">
               <h1>{post.title}</h1>
               <div className="detailUserInfo">
                  <span>Author: </span>
                  <img src={post?.user?.profilePicture || "/profile.svg"} alt="" />
                  <span className="name">{post?.user?.name}</span>
                  &bull;
                  <Moment fromNow><span className="date">{post?.createdAt}</span></Moment>
                  <More isPost isMine={currentUser._id === post?.user?._id} id={post._id} />
               </div>
            </div>
            <div className="detailContent">
               <div className="descWrapper">
                  <div dangerouslySetInnerHTML={{ __html: post.desc }} className="detailDesc" />
               </div>

               <div className="detailAllTags">
                  {post?.tags?.map((item) => (
                     <button key={item}># {item}</button>
                  ))}
               </div>
               <div className="detailActions">
                  <div className="detailItem">
                     <HeartIcon className="icons" />
                     <span>{post?.likes?.length}</span>
                  </div>
                  <div className="detailItem">
                     <BookmarkIcon className="icons" />
                     <span>{post?.likes?.length}</span>
                  </div>
               </div>
            </div>
            {/* <Answers post={post} /> */}
            <div className="yourAnswer">
               <h2>Ayo berikan jawaban kamu! 😁</h2>
               <form>
                  <TextEditor />
                  <button className="submit">Kirim Jawaban</button>
               </form>
            </div>
         </div>
      </div >
   );
};

export default Detail;
