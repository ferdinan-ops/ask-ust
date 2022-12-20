import React, { useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import "./tags.scss";

const Tags = () => {
   const random = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
   useEffect(() => {
      document.title = "Tags | ask.UST"
   }, []);

   return (
      <div className="tagsPages">
         <div className="tagsContainer">
            <div className="pagesTitle">
               <h1>Tags</h1>
               <span>Tag adalah kata kunci atau label yang mengkategorikan pertanyaan Anda dengan pertanyaan serupa lainnya. Menggunakan tag yang tepat memudahkan orang lain menemukan dan menjawab pertanyaan Anda.</span>
            </div>
            <div className="tagsSearchBar">
               <MagnifyingGlassIcon className="icons" />
               <input placeholder="Cari berdasarkan nama tag" />
            </div>
            <div className="tagsContent">
               {random.map((item) => (
                  <div className="tag">
                     <button># javascript</button>
                     <span>For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Keep in mind that JavaScript is NOT the same as Java! Include all labels that are relevant to your question; e.g., [node.js], [jQuery], [JSON], [ReactJS], [angular], [ember.js], [vue.js], [typescript], [svelte], etc.</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Tags;