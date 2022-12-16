import { XMarkIcon } from '@heroicons/react/20/solid';
import React from 'react';
import "./modal.scss";

const Modal = ({ children, title, isModalShow, setIsModalShow }) => {

   return (
      <div className={`modals ${isModalShow ? "show" : ""}`} onClick={() => setIsModalShow(false)}>
         <div className={`container ${isModalShow ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="top">
               <XMarkIcon className='icons' onClick={(e) => setIsModalShow(false)} />
               <span>{title}</span>
               <button>Simpan</button>
            </div>
            <div className="bottom">
               {children}
            </div>
         </div>
      </div>
   )
}

export default Modal;