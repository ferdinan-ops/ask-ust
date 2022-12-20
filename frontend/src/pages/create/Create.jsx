import React, { useState, useContext, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

import { AuthContext } from "../../context/authContext";
import { Modal, TextEditor, Warning } from "../../components";
import "./create.scss";

const Create = () => {
   const [isModalShow, setIsModalShow] = useState(false);
   const { currentUser } = useContext(AuthContext);

   useEffect(() => {
      document.title = "Ayo buat pertanyaan 😀 | ask.UST"
   }, []);

   const modalShowHandler = (e) => {
      e.preventDefault();
      setIsModalShow(true);
   }

   return (
      <div className="create">
         <Modal title="Buat Tag Baru" isModalShow={isModalShow} setIsModalShow={setIsModalShow}>
            <div className="modalWrapper">
               <label>
                  <span>Nama tags</span>
                  <input placeholder="ms-word" />
               </label>
               <label>
                  <span>Deskripsi tags</span>
                  <textarea placeholder="Jelaskan sedikit mengenai tag baru ini" />
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
