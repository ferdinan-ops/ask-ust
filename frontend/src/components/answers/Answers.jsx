import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";

import { createAnswer, getAnswers } from "../../config/redux/features/answerSlice";
import TextEditor from "../textEditor/TextEditor";
import Answer from "../answer/Answer";
import "./answers.scss";

const Answers = ({ postId, bestAnswerId }) => {
   const [desc, setDesc] = useState("");

   const dispatch = useDispatch();
   const { answers, isLoadingPost, isUpdate } = useSelector((state) => state.answer);

   useEffect(() => { dispatch(getAnswers(postId)) }, [dispatch, postId]);

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(createAnswer({ desc, postId }));
      !isLoadingPost && setDesc("");
   }

   return (
      <>
         {postId && (
            <>
               <div className="answers">
                  {answers.length > 0 ? (
                     <>
                        <h3>Semua Jawaban ({answers.length})</h3>
                        {answers.map((answer) => <Answer answer={answer} bestAnswerId={bestAnswerId === answer._id} />)}
                     </>
                  ) : (
                     <h3 className='not'>Belum Ada Jawaban 😔</h3>
                  )}
               </div>
               <div className="yourAnswer">
                  <h2>Ayo berikan jawaban kamu! 😁</h2>
                  <form onSubmit={submitHandler}>
                     <TextEditor content={desc} setContent={setDesc} />
                     <button className="submit">
                        {isLoadingPost ? <Ring size={16} lineWeight={8} speed={2} color="#fff" /> : isUpdate ? "Simpan" : "Kirim Jawaban"}
                     </button>
                  </form>
               </div>
            </>
         )}
      </>
   )
}

export default Answers;