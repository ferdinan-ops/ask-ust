import React from 'react';
import { ArrowSmallDownIcon, ArrowSmallUpIcon, CheckIcon } from "@heroicons/react/24/outline";

import More from '../more/More';
import "./answers.scss";

const Answers = ({ post }) => {
   return (
      <div className="answers">
         {post?.answers?.length > 0 ? (
            <>
               <h3>Semua Jawaban ({post?.answers?.length})</h3>
               {post?.answers?.map((answer) => (
                  <div className="answer" key={answer.id}>
                     <div className="userAnswer">
                        <img src={answer?.user?.profilePic} alt="" />
                        <div className="infos">
                           <span>{answer?.user?.name}</span>
                           <span>{answer.createdAt}</span>
                        </div>
                        <div className="reactions">
                           {answer.isBestAnswer && <span className="bestAnswer">Jawaban Terbaik</span>}
                        </div>
                        <More />
                     </div>
                     <div className="descAnswer">{answer?.desc}</div>
                     <div className="answerActions">
                        <div className="itemAction">
                           <ArrowSmallUpIcon className="icons" />
                           <span>{answer?.likes?.length}</span>
                        </div>
                        <div className="itemAction">
                           <ArrowSmallDownIcon className="icons" />
                           <span>{answer?.dislikes?.length}</span>
                        </div>
                        <div className="reactions descBottom">
                           {answer.isBestAnswer && <span className="bestAnswer">Jawaban Terbaik</span>}
                        </div>
                     </div>
                  </div>
               ))}
            </>
         ) : (
            <h3 className='not'>Belum Ada Jawaban 😔</h3>
         )}
      </div>
   )
}

export default Answers;