import React from "react";
import { useNavigate } from "react-router-dom";
import "./post.scss";

const Post = ({ post }) => {
   const navigate = useNavigate();

   return (
      <div className="post">
         <div className="postContainer" onClick={() => navigate(`/forum/questions/${post.id}`)}>
            <div className="info">
               <div className="postWrapper">
                  <p><span>{post?.likes?.length}</span> suka</p>
                  <p><span>{post?.saved?.length || 0}</span> disimpan</p>
                  <p><span>{post?.answers?.length}</span> jawaban</p>
               </div>
            </div>
            <div className="postContent">
               <div className="postTop">
                  <h2>{post.title}</h2>
                  <span>{post.desc}</span>
               </div>
               <div className="postBottom">
                  <div className="postTags">
                     {post?.tags?.map((tag, index) => (
                        <button key={index}># {tag}</button>
                     ))}
                  </div>
                  <div className="postUserInfo">
                     <img src={post?.user?.profilePic} alt="" />
                     <span>{post?.user?.name}</span>
                     <span>&bull;</span>
                     <span>{post.createdAt}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Post;
