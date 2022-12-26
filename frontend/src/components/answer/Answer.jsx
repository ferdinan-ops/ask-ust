import { ArrowSmallDownIcon, ArrowSmallUpIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from "react";
import Moment from 'react-moment';

import More from '../more/More';
import "./answer.scss";

const Answer = ({ answer, bestAnswerId }) => {
   const [isLike, setIsLike] = useState(false);
   const [isDislike, setIsDislike] = useState(false);

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
            <More />
         </div>
         <div className="reactions descBottom">
            {answer.isBestAnswer && (
               <span className="bestAnswer">
                  <InformationCircleIcon className='icons' />Jawaban Terbaik
               </span>
            )}
         </div>
         <div dangerouslySetInnerHTML={{ __html: answer?.desc }} className="descAnswer" />
         <div className="answerActions">
            <div className="itemAction">
               <ArrowSmallUpIcon className={`icons ${isLike && "up"}`} />
               <span>{answer?.likes?.length}</span>
            </div>
            <div className="itemAction">
               <ArrowSmallDownIcon className={`icons ${isDislike && "down"}`} />
               <span>{answer?.dislikes?.length}</span>
            </div>
         </div>
      </div>
   )
}

export default Answer;