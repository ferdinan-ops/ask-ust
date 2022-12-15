import React from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

import "./create.scss";

const Create = () => {
   return (
      <div className="create">
         <div className="container">
            <div className="heading">
               <h1>Ayo buat pertanyaan 😀</h1>
               <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque, totam?</span>
            </div>
            <form>
               <div className="inputs">
                  <span>Judul</span>
                  <input placeholder="e.g. Bagaimana cara untuk custom margin pada ms.word?" />
               </div>
               <div className="inputs">
                  <div className="tags">
                     <span>Tags</span>
                     <button><PlusCircleIcon className="icons" />Tags baru</button>
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

export default Create;
