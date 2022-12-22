import React, { useState, useContext, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";

import { AuthContext } from "../../context/authContext";
import { Modal, TextEditor, Warning } from "../../components";
import { createTag } from "../../config/redux/features/tagSlice";
import "./create.scss";

const Create = () => {
   const [isModalShow, setIsModalShow] = useState(false);
   const [nameTag, setNameTag] = useState("");
   const [descTag, setDescTag] = useState("");

   const dispatch = useDispatch();
   const { currentUser } = useContext(AuthContext);
   const { isLoading } = useSelector(state => state.tag);

   useEffect(() => {
      document.title = "Ayo buat pertanyaan 😀 | ask.UST"
   }, []);

   const modalShowHandler = (e) => {
      e.preventDefault();
      setIsModalShow(true);
   }

   const createTagHandler = (e) => {
      e.preventDefault();
      dispatch(createTag({ name: nameTag, desc: descTag }));
   }

   return (
      <div className="create">
         <Modal title="Buat Tag Baru" isModalShow={isModalShow} setIsModalShow={setIsModalShow} modalSubmit={createTagHandler} isLoading={isLoading}>
            <div className="modalWrapper">
               <label>
                  <span>Nama tags</span>
                  <input placeholder="ms-word" required value={nameTag} onChange={(e) => setNameTag(e.target.value)} />
               </label>
               <label>
                  <span>Deskripsi tags</span>
                  <textarea placeholder="Jelaskan sedikit mengenai tag baru ini" required value={descTag} onChange={(e) => setDescTag(e.target.value)} />
               </label>
            </div>
         </Modal>

         <div className="createContainer">
            <Warning name={currentUser.name} />
            <h1>Ayo buat pertanyaan 😀</h1>

            <form>
               <div className="createInput">
                  <span>Judul</span>
                  <input placeholder="e.g. Bagaimana cara untuk custom margin pada ms.word?" />
               </div>
               <div className="createInput">
                  <div className="createTags">
                     <span>Tags</span>
                     <button className="primary-button" onClick={modalShowHandler}>
                        <PlusCircleIcon className="icons" />Tags baru
                     </button>
                  </div>
                  <input placeholder="e.g. ms-word" />
               </div>
               <div className="createInput">
                  <span>Deskripsi</span>
                  <TextEditor />
               </div>
               <button className="primary-button">Kirim Pertanyaan</button>
            </form>

         </div>
      </div>
   );
};

export default Create;
