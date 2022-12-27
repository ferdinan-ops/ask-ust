import { EllipsisHorizontalIcon, CheckBadgeIcon, FlagIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import { getAnswers, setIsUpdate } from "../../config/redux/features/answerSlice";
import { deletePost, getPosts } from "../../config/redux/features/postSlice";
import { AuthContext } from "../../context/authContext";
import { deleteAnswerAPI } from "../../config/api";
import "./more.scss";

const More = ({ isPost, isMine, id, userPostId, postId }) => {
   const [isShow, setIsShow] = useState(false);

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { currentUser } = useContext(AuthContext);

   const updateHandler = (e) => {
      e.preventDefault();
      if (isPost) return navigate(`/forum/update/${id}`);
      dispatch(setIsUpdate(id));
   }

   const deleteHandler = async (e) => {
      e.preventDefault();
      const ask = window.confirm(`Anda yakin ingin menghapus ${isPost ? "pertanyaan" : "jawaban"} ini?`);
      if (ask) {
         if (isPost) {
            dispatch(deletePost(id));
            dispatch(getPosts(3));
            navigate("/forum/questions");
         } else {
            const { data } = await deleteAnswerAPI(id);
            toast.success(data.msg);
            dispatch(getAnswers(postId));
         }
      }
   }

   const canMakeBestAnswer = (userPostId === currentUser._id) && !isPost;

   return (
      <div className="more" onClick={() => setIsShow(!isShow)}>
         <div className="iconWrapper">
            <EllipsisHorizontalIcon className="icons" />
         </div>
         <ul className={isShow ? "active" : ""}>
            {canMakeBestAnswer &&
               <li>
                  <CheckBadgeIcon className="icons" />
                  <span>Jadikan jawaban terbaik</span>
               </li>
            }
            {isMine && (
               <>
                  <li onClick={updateHandler}>
                     <PencilIcon className="icons" />
                     <span>Ubah</span>
                  </li>
                  <li className="danger" onClick={deleteHandler}>
                     <TrashIcon className="icons" />
                     <span>Hapus</span>
                  </li>
               </>
            )}
            {!isMine && (
               <li className="danger">
                  <FlagIcon className="icons" />
                  <span>Laporkan</span>
               </li>
            )}
         </ul>
      </div>
   )
}

export default More;