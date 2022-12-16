import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

import "./create.scss";
import { Modal } from "../../components";

const Create = () => {
   const [isModalShow, setIsModalShow] = useState(false);

   const modalShowHandler = (e) => {
      e.preventDefault();
      setIsModalShow(true);
   }

   return (
      <div className="create">
         <TagsModals isModalShow={isModalShow} setIsModalShow={setIsModalShow} />
         <div className="container">
            <h1>Ayo buat pertanyaan 😀</h1>
            <form>
               <div className="inputs">
                  <span>Judul</span>
                  <input placeholder="e.g. Bagaimana cara untuk custom margin pada ms.word?" />
               </div>
               <div className="inputs">
                  <div className="tags">
                     <span>Tags</span>
                     <button onClick={modalShowHandler}><PlusCircleIcon className="icons" />Tags baru</button>
                  </div>
                  <input placeholder="e.g. ms-word" />
               </div>
               <div className="inputs">
                  <span>Deskripsi</span>
                  <textarea placeholder="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, nulla!" />
               </div>
               <button>Kirim Pertanyaan</button>
            </form>
         </div>
      </div>
   );
};

const TagsModals = ({ isModalShow, setIsModalShow }) => {
   return (
      <Modal title="Buat Tag Baru" isModalShow={isModalShow} setIsModalShow={setIsModalShow}>
         <div className="modalsForm">
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
   )
}

export default Create;
