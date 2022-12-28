import { useDispatch, useSelector } from "react-redux";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Ring } from "@uiball/loaders";

import { getAnswer, getAnswers } from "../../config/redux/features/answerSlice";
import { createAnswerAPI, updateAnswerAPI } from "../../config/api";
import { AuthContext } from "../../context/authContext";
import TextEditor from "../textEditor/TextEditor";
import Answer from "../answer/Answer";
import "./answers.scss";

const Answers = ({ postId, bestAnswerId, userPostId }) => {
   const [desc, setDesc] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const dispatch = useDispatch();
   const { answers, answer, isUpdate } = useSelector((state) => state.answer);
   const { currentUser } = useContext(AuthContext);

   useEffect(() => { dispatch(getAnswers(postId)) }, [dispatch, postId]);
   useEffect(() => { if (isUpdate) dispatch(getAnswer(isUpdate)) }, [isUpdate, dispatch]);
   useEffect(() => { if (answer && isUpdate) setDesc(answer.desc) }, [answer, isUpdate]);

   const submitHandler = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      if (!desc) return toast.error("Jawaban tidak boleh kosong");
      if (isUpdate) {
         await update();
      } else {
         await create();
      }
      setDesc("");
      setIsLoading(false);
   }

   const update = async () => {
      await updateAnswerAPI(isUpdate, { desc });
      dispatch(getAnswers(postId));
      toast.success("Jawaban berhasil diubah");
   }

   const create = async () => {
      await createAnswerAPI({ desc, postId, userPostId });
      dispatch(getAnswers(postId));
      toast.success("Jawaban berhasil dibuat");
   }

   return (
      postId && (
         <>
            <div className="answers">
               {answers.length > 0 ? (
                  <>
                     <h3>Semua Jawaban ({answers.length})</h3>
                     {answers.map((answer) => (
                        <Answer
                           key={answer._id}
                           answer={answer}
                           bestAnswerId={bestAnswerId === answer._id}
                           userPostId={userPostId}
                           postId={postId}
                        />
                     ))}
                  </>
               ) : (
                  <h3 className='not'>Belum Ada Jawaban 😔</h3>
               )}
            </div>
            {currentUser._id !== userPostId && (
               <div className="yourAnswer">
                  <h2>Ayo berikan jawaban kamu! 😁</h2>
                  <form onSubmit={submitHandler}>
                     <TextEditor content={desc} setContent={setDesc} />
                     <button className={`submit ${isLoading ? "loading" : ""}`}>
                        {isLoading ? <Ring size={16} lineWeight={8} speed={2} color="#fff" /> : isUpdate ? "Simpan" : "Kirim Jawaban"}
                     </button>
                  </form>
               </div>
            )}
         </>
      )
   )
}

export default Answers;