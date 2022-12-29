import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import React from "react";

import { IMG_URI } from "../../utils/dummy";
import "./post.scss";

const Post = ({ post }) => {
   const navigate = useNavigate();

   const tagNavigate = (e, tag) => {
      e.preventDefault();
      e.stopPropagation();
      navigate(`/forum/tags/${tag}`);
   }


   return (
      <div className="post">
         <div className="postContainer" onClick={() => navigate(`/forum/questions/${post._id}`)}>
            <div className="info">
               <div className="postWrapper">
                  <p><span>{post?.likesCount}</span> suka</p>
                  <p><span>{post?.savedCount}</span> disimpan</p>
                  <p className={post.bestAnswerId ? "haveBest" : ""}>
                     <span>{post.bestAnswerId && "✅"} {post?.answersCount}</span> jawaban
                  </p>
               </div>
            </div>
            <div className="postContent">
               <div className="postTop">
                  <h2>{post.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: post.desc }} className="postDesc" />
               </div>
               <div className="postBottom">
                  <div className="postTags">
                     {post?.tags?.map((tag, index) => (
                        <button key={index} onClick={(e) => tagNavigate(e, tag)}>
                           # {tag}
                        </button>
                     ))}
                  </div>
                  <div className="postUserInfo">
                     <img
                        src={post?.user?.profilePicture ? `${IMG_URI}/${post?.user?.profilePicture}` : "/profile.svg"}
                        alt=""
                     />
                     <span className="postName">{post?.user?.name}</span>
                     <span>&bull;</span>
                     <Moment fromNow>{post.createdAt}</Moment>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Post;
