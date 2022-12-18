import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { Answers, More, TextEditor, Warning } from "../../components";
import { AuthContext } from "../../context/authContext";
import { postDummy } from "../../utils/dummy";
import "./detail.scss";

const Detail = () => {
   const [post, setPost] = useState({});

   const { id } = useParams();
   const { currentUser } = useContext(AuthContext);

   useEffect(() => {
      const getDetailPost = postDummy.filter((post) => post.id === parseInt(id));
      setPost(getDetailPost[0]);
   }, [id]);

   useEffect(() => {
      document.title = post.title + " | ask.UST";
   }, [post]);

   return (
      <div className="detail">
         <div className="detailWrapper">
            <Warning name={currentUser.name} />
            <div className="detailHead">
               <h1>{post.title}</h1>
               <div className="detailUserInfo">
                  <span>Author: </span>
                  <img src={post?.user?.profilePic} alt="" />
                  <span className="name">{post?.user?.name}</span>
                  &bull;
                  <span className="date">{post?.createdAt}</span>
                  <More />
               </div>
            </div>
            <div className="detailContent">
               <div className="detailDesc">{post.desc}</div>
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
            <Answers post={post} />
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
