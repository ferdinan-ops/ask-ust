import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import { postDummy } from "../../utils/dummy";

import "./detail.scss";

const Detail = () => {
   const { id } = useParams();
   const [post, setPost] = useState({});

   useEffect(() => {
      const getDetailPost = postDummy.filter((post) => post.id === parseInt(id));
      setPost(getDetailPost[0]);
   }, [id]);

   useEffect(() => {
      document.title = post.title + " | ask.UST";
   }, [post]);

   console.log({ post });

   return (
      <div className="detail">
         <div className="detailWrapper">
            <div className="top">
               <h1>{post.title}</h1>
               <div className="userInfo">
                  <p>Author: </p>
                  <img src={post?.user?.profilePic} alt="" />
                  <span>{post?.user?.name}</span>
                  &bull;
                  <span className="date">{post?.createdAt}</span>
               </div>
            </div>
            <div className="details">
               <div className="description">{post.desc}</div>
               <div className="allTags">
                  {post?.tags?.map((item) => (
                     <button key={item}># {item}</button>
                  ))}
               </div>
               <div className="actions">
                  <div className="item">
                     <HeartIcon className="icons" />
                     <span>{post?.likes?.length}</span>
                  </div>
                  <div className="item">
                     <BookmarkIcon className="icons" />
                     <span>{post?.likes?.length}</span>
                  </div>
                  <button>Beri Komentar</button>
               </div>
            </div>
            <div className="answer">

            </div>
         </div>
      </div >
   );
};

export default Detail;
