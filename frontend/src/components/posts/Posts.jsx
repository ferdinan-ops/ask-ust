import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../config/redux/features/postSlice";
import { InfiniteScroll } from "../../components";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
   const [isNew, setIsNew] = useState(true);
   const [posts, setPosts] = useState([]);
   const [page, setPage] = useState(3);

   const dispatch = useDispatch();
   const { posts: postsData, counts, isLoading } = useSelector((state) => state.post);

   useEffect(() => {
      dispatch(getPosts(page));
   }, [page, dispatch]);

   useEffect(() => {
      setIsNew(true);
      setPosts(postsData);
   }, [postsData]);

   const setTabs = (e) => {
      e.preventDefault();
      if (isNew) {
         const filteredPost = postsData.filter((post) => post?.answersCount === 0);
         setPosts(filteredPost);
         setIsNew(false);
      } else {
         setPosts(postsData);
         setIsNew(true);
      }
   }

   const loadHandler = (e) => {
      e.preventDefault();
      setPage(page + 3);
   }

   return (
      <div className="posts">
         <div className="postsWrapper">
            <div className="postsTabs">
               <button className={isNew ? "active" : ""} onClick={setTabs}>Terbaru</button>
               <button className={!isNew ? "active" : ""} onClick={setTabs}>Belum terjawab</button>
            </div>
            <div className="postWrapper">
               {posts.map((post) => (<Post post={post} key={post._id} />))}
               {posts.length > 3 && <InfiniteScroll counts={counts} dataLength={posts.length} isLoading={isLoading} loadMoreHandler={loadHandler} />}
            </div>
         </div>
      </div>
   );
};

export default Posts;
