import React, { useState, useEffect } from "react";

import Post from "../post/Post";
import { postDummy } from "../../utils/dummy";

import "./posts.scss";

const Posts = () => {
   const [isNew, setIsNew] = useState(true);
   const [posts, setPosts] = useState([]);


   useEffect(() => {
      setIsNew(true);
      setPosts(postDummy);
   }, []);

   const setTabs = (e) => {
      e.preventDefault();
      if (isNew) {
         const filteredPost = postDummy.filter((post) => post.answers.length === 0);
         setPosts(filteredPost);
         setIsNew(false);
      } else {
         setPosts(postDummy);
         setIsNew(true);
      }
   }

   return (
      <div className="posts">
         <div className="postsWrapper">
            <div className="postsTabs">
               <button className={isNew ? "active" : ""} onClick={setTabs}>
                  Terbaru
               </button>
               <button className={!isNew ? "active" : ""} onClick={setTabs}>
                  Belum terjawab
               </button>
            </div>
            <div className="postWrapper">
               {posts.map((post) => (<Post post={post} key={post.id} />))}
            </div>
         </div>
      </div>
   );
};

export default Posts;
