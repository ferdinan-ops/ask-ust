import { InformationCircleIcon } from "@heroicons/react/24/solid";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import Prism from "prismjs";

import { getAnswers } from "../../config/redux/features/answerSlice";
import { dislikeAnswerAPI, likeAnswerAPI } from "../../config/api";
import { AuthContext } from "../../context/authContext";
import { IMG_URI } from "../../utils/dummy";
import More from "../more/More";

import "prismjs/themes/prism-dracula.css";
import "./answer.scss";

const Answer = ({ answer, bestAnswerId, userPostId, postId }) => {
   const [isLike, setIsLike] = useState(false);
   const [isDislike, setIsDislike] = useState(false);

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { currentUser } = useContext(AuthContext);
   const { _id: userId } = currentUser;

   useEffect(() => { Prism.highlightAll() });
   useEffect(() => { setIsLike(answer?.likes?.findIndex((id) => id === String(userId)) !== -1) }, [answer, userId]);
   useEffect(() => { setIsDislike(answer?.dislikes?.findIndex((id) => id === String(userId)) !== -1) }, [answer, userId]);
   const navigateUser = (id) => { navigate(`/forum/users/${id}`) };

   const likeHandler = async (e, id) => {
      e.preventDefault();
      await likeAnswerAPI(id);
      dispatch(getAnswers(postId));
   };

   const dislikeHandler = async (e, id) => {
      e.preventDefault();
      await dislikeAnswerAPI(id);
      dispatch(getAnswers(postId));
   };


   return (
      <div className="answer" key={answer._id}>
         <div className="userAnswer">
            <img
               alt=""
               src={answer?.user?.profilePicture ? `${IMG_URI}/${answer?.user?.profilePicture}` : "/profile.svg"}
               onClick={() => navigateUser(answer?.user?._id)}
            />
            <div className="infos">
               <span onClick={() => navigateUser(answer?.user?._id)}>{answer?.user?.name}</span>
               <Moment fromNow>{answer.createdAt}</Moment>
            </div>
            <div className="reactions">
               {bestAnswerId && <span className="bestAnswer">Jawaban Terbaik</span>}
            </div>
            <More
               id={answer._id}
               postId={postId}
               userPostId={userPostId}
               bestAnswerId={bestAnswerId}
               userAnswerId={answer?.user?._id}
               isMine={answer?.user?._id === userId}
            />
         </div>
         <div className="reactions descBottom">
            {bestAnswerId && (
               <span className="bestAnswer">
                  <InformationCircleIcon className="icons" />
                  Jawaban Terbaik
               </span>
            )}
         </div>
         <div dangerouslySetInnerHTML={{ __html: answer?.desc }} className="descAnswer" />
         <div className="answerActions">
            <div className={`itemAction ${isLike ? "up" : ""}`} onClick={(e) => likeHandler(e, answer._id)}>
               <p>👍</p>
               <span>{answer?.likes?.length}</span>
            </div>
            <div className={`itemAction ${isDislike ? "down" : ""}`} onClick={(e) => dislikeHandler(e, answer._id)}>
               <p>👎</p>
               <span>{answer?.dislikes?.length}</span>
            </div>
         </div>
      </div>
   );
};

export default Answer;
