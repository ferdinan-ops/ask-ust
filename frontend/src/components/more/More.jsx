import React, { useState } from "react";
import { EllipsisHorizontalIcon, CheckBadgeIcon, FlagIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deletePost, getPost, getPosts } from "../../config/redux/features/postSlice";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./more.scss";

const More = ({ isPost, isMine, id }) => {
   const [isShow, setIsShow] = useState(false);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const updateHandler = (e) => {
      e.preventDefault();
      if (isPost) return navigate(`/forum/update/${id}`);
   }

   const deleteHandler = (e) => {
      e.preventDefault();
      const ask = window.confirm(`Anda yakin ingin menghapus ${isPost ? "pertanyaan" : "jawaban"} ini?`);
      if (ask) {
         if (isPost) {
            dispatch(deletePost(id));
            dispatch(getPosts(3));
            navigate("/forum/questions");
         } else {
            dispatch(getPost());
         }
      }
   }

   return (
      <div className="more" onClick={() => setIsShow(!isShow)}>
         <div className="iconWrapper">
            <EllipsisHorizontalIcon className="icons" />
         </div>
         <ul className={isShow ? "active" : ""}>
            {!isPost &&
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
                  <span>Laporkan jawaban</span>
               </li>
            )}
         </ul>
      </div>
   )
}

export default More;