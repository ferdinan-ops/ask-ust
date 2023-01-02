import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { getPosts, searchPost } from "../../config/redux/features/postSlice";
import { InfiniteScroll } from "../../components";
import Post from "../post/Post";
import "./posts.scss";
import { Ring } from "@uiball/loaders";

const Posts = () => {
   const [isNew, setIsNew] = useState(true);
   const [posts, setPosts] = useState([]);
   const [page, setPage] = useState(3);
   const [searchParams] = useSearchParams();

   const dispatch = useDispatch();
   const params = searchParams.get("search");
   const { posts: postsData, counts, isLoading } = useSelector((state) => state.post);

   useEffect(() => {
      if (!params) {
         dispatch(getPosts(page));
      } else {
         dispatch(searchPost({ keyword: params, page }));
      }
   }, [page, dispatch, params]);

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
   };

   const loadHandler = (e) => {
      e.preventDefault();
      setPage(page + 3);
   };

   return (
      <>
         <div className="pagesTitle">
            <h1>{params ? `Pencarian: ${params}` : "Semua Pertanyaan"}</h1>
            <span>
               Kamu bisa mencari seluruh soal yang terbaru dan belum pernah di jawab oleh siapapun disini!
            </span>
         </div>
         <div className="posts">
            <div className="postsWrapper">
               <div className="postsTabs">
                  <button className={isNew ? "active" : ""} onClick={setTabs}>Terbaru</button>
                  <button className={!isNew ? "active" : ""} onClick={setTabs}>Belum terjawab</button>
               </div>
               {posts.length > 0 ? (
                  <div className="postWrapper">
                     {posts.map((post) => (
                        <Post post={post} key={post._id} />
                     ))}
                     {posts.length > 2 && (
                        <InfiniteScroll
                           counts={counts}
                           dataLength={posts.length}
                           isLoading={isLoading}
                           loadMoreHandler={loadHandler}
                        />
                     )}
                  </div>
               ) : (
                  !isLoading ? params ? (
                     <h4>Tidak dapat menemukan pertanyaan dengan kata kunci: {params} 😕</h4>
                  ) : (
                     <h4>Tidak ada pertanyaan yang belum terjawab 😕</h4>
                  ) : (
                     <div className="loadingPage">
                        <Ring size={40} lineWeight={8} speed={2} color="#00bac7" />
                     </div>
                  )
               )}
            </div>
         </div>
      </>
   );
};

export default Posts;
