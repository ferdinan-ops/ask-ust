import { XMarkIcon } from '@heroicons/react/20/solid';
import { Ring } from '@uiball/loaders';
import React from 'react';
import "./modal.scss";

const Modal = ({ children, title, isModalShow, setIsModalShow, modalSubmit, isLoading }) => {

   return (
      <div className={`modals ${isModalShow ? "show" : ""}`} onClick={() => setIsModalShow(false)}>
         <div className={`modalsContainer ${isModalShow ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="modalsTop">
               <XMarkIcon className='icons' onClick={(e) => setIsModalShow(false)} />
               <span>{title}</span>
               <button onClick={modalSubmit} className={isLoading ? "loading" : ""}>
                  {isLoading ? <Ring size={16} lineWeight={8} speed={2} color="#fff" /> : "Simpan"}
               </button>
            </div>
            <div className="modalsBottom">
               {children}
            </div>
         </div>
      </div>
   )
}

export default Modal;