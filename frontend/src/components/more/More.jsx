import { EllipsisHorizontalIcon, CheckBadgeIcon, FlagIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";

import { deleteAnswerAPI, makeBestAnswerAPI, reportAnswerAPI, reportPostAPI } from "../../config/api";
import { deletePost, getPost, getPosts } from "../../config/redux/features/postSlice";
import { getAnswers, setIsUpdate, setLoadingBest } from "../../config/redux/features/answerSlice";
import { AuthContext } from "../../context/authContext";
import Modal from "../modal/Modal";
import "./more.scss";

const More = ({ isPost, isMine, id, userPostId, postId, userAnswerId, bestAnswerId }) => {
   const [isShow, setIsShow] = useState(false);
   const [modal, setModal] = useState(false);
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState("");

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { mutate } = useSWRConfig();
   const { currentUser } = useContext(AuthContext);

   const updateHandler = (e) => {
      e.preventDefault();
      if (isPost) return navigate(`/forum/update/${id}`);
      dispatch(setIsUpdate(id));
   }

   const deleteHandler = async (e) => {
      e.preventDefault();
      const ask = window.confirm(
         `Anda yakin ingin menghapus ${isPost ? "pertanyaan" : "jawaban"} ini?`
      );
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

   const setBestAnswerHandler = async () => {
      try {
         setLoadingBest(true);
         await makeBestAnswerAPI(postId, { answerId: id, userAnswerId });
         mutate("notif");
         dispatch(getAnswers(postId));
         dispatch(getPost(postId));
         setLoadingBest(false);
      } catch (error) {
         console.log(error);
      }
   }

   const reportHandler = async () => {
      let res = {};
      setLoading(true);
      try {
         if (isPost) {
            res = await reportPostAPI({ id, message, userPostId });
         } else {
            res = await reportAnswerAPI({ postId, message, userAnswerId });
         }
         mutate("notif");
         setLoading(false);
         setMessage("");
         toast.success(res.data.msg);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   }

   return (
      <>
         <Modal title={`Lapor ${isPost ? "Pertanyaan" : "Jawaban"}`} isLoading={loading}
            isModalShow={modal} setIsModalShow={setModal} modalSubmit={reportHandler}>
            <div className="modalWrapper">
               <div className="textWrapper">
                  <p>
                     Kami menanggapi laporan dengan serius. Jika kami menemukan pelanggaran
                     terhadap peraturan, kami akan meminta pembuat soal untuk menghapus soal
                     tersebut atau mengunci atau menangguhkan akun tersebut.
                  </p>
                  <p>
                     Jika ada bahaya langsung, selain membuat laporan, hubungi juga layanan
                     darurat setempat.
                  </p>
               </div>
               <label>
                  <span>Alasan laporan</span>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
               </label>
            </div>
         </Modal>
         <div className="more" onClick={() => setIsShow(!isShow)}>
            <div className="iconWrapper">
               <EllipsisHorizontalIcon className="icons" />
            </div>
            <ul className={isShow ? "active" : ""}>
               {((userPostId === currentUser._id) && !isPost) &&
                  <li onClick={setBestAnswerHandler} className={bestAnswerId ? "warning" : ""}>
                     {bestAnswerId ? <XMarkIcon className="icons" /> : <CheckBadgeIcon className="icons" />}
                     <span>{bestAnswerId ? "Hapus jawaban terbaik" : "Jadikan jawaban terbaik"}</span>
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
                  <li className="danger" onClick={() => setModal(true)}>
                     <FlagIcon className="icons" />
                     <span>Laporkan</span>
                  </li>
               )}
            </ul>
         </div>
      </>
   )
}

export default More;