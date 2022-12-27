import { ArrowSmallDownIcon, ArrowSmallUpIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import React, { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import Moment from "react-moment";
import Prism from "prismjs";

import { getAnswers } from "../../config/redux/features/answerSlice";
import { dislikeAnswerAPI, likeAnswerAPI } from "../../config/api";
import { AuthContext } from "../../context/authContext";
import More from "../more/More";

import "prismjs/themes/prism-dracula.css";
import "./answer.scss";

const Answer = ({ answer, bestAnswerId, userPostId, postId }) => {
   const [isLike, setIsLike] = useState(false);
   const [isDislike, setIsDislike] = useState(false);

   const dispatch = useDispatch();
   const { currentUser } = useContext(AuthContext);
   const { _id: userId } = currentUser;

   useEffect(() => {
      Prism.highlightAll();
   });

   useEffect(() => {
      setIsLike(answer?.likes?.findIndex((id) => id === String(userId)) !== -1);
   }, [answer, userId]);

   useEffect(() => {
      setIsDislike(
         answer?.dislikes?.findIndex((id) => id === String(userId)) !== -1
      );
   }, [answer, userId]);

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
            <img src={answer?.user?.profilePicture || "/profile.svg"} alt="" />
            <div className="infos">
               <span>{answer?.user?.name}</span>
               <Moment fromNow>{answer.createdAt}</Moment>
            </div>
            <div className="reactions">
               {bestAnswerId && <span className="bestAnswer">Jawaban Terbaik</span>}
            </div>
            <More
               isMine={answer?.user?._id === userId}
               id={answer._id}
               userPostId={userPostId}
               postId={postId}
            />
         </div>
         <div className="reactions descBottom">
            {answer.isBestAnswer && (
               <span className="bestAnswer">
                  <InformationCircleIcon className="icons" />
                  Jawaban Terbaik
               </span>
            )}
         </div>
         <div dangerouslySetInnerHTML={{ __html: answer?.desc }} className="descAnswer" />
         <div className="answerActions">
            <div className={`itemAction ${isLike ? "up" : ""}`} onClick={(e) => likeHandler(e, answer._id)}>
               <ArrowSmallUpIcon className="icons" />
               <span>{answer?.likes?.length}</span>
            </div>
            <div className={`itemAction ${isDislike ? "down" : ""}`} onClick={(e) => dislikeHandler(e, answer._id)}>
               <ArrowSmallDownIcon className="icons" />
               <span>{answer?.dislikes?.length}</span>
            </div>
         </div>
      </div>
   );
};

export default Answer;
