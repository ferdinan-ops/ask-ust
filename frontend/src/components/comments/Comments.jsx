import React from "react";

import More from "../more/More";
import "./comments.scss";

const Comments = ({ comments }) => {
   console.log({ comments });
   return (
      <div className="comments">
         <h4>Komentar</h4>
         {comments.map((comment, index) => (
            <div className="comment" key={index}>
               <div className="commentUserInfo">
                  <img src={comment?.user?.profilePic} alt="" />
                  <div className="infos">
                     <span>{comment?.user?.name}</span>
                     <span>{comment?.createdAt}</span>
                  </div>
                  <More />
               </div>
               <p className="commentDesc">{comment.desc}</p>
            </div>
         ))}
         <form className='commentForm'>
            <textarea placeholder='Beri komentar kamu disini' />
            <button>Kirim</button>
         </form>
      </div>
   )
}

export default Comments;