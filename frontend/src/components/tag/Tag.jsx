import React from 'react';
import { useEffect } from 'react';
import "./tag.scss";

const Tag = () => {
   useEffect(() => {
      document.title = "Tags | ask.UST";
   }, []);
   return (
      <div className='tagContent'>
         <div className="tagWrapper">
            <button># javascript</button>
            <span>For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Keep in mind that JavaScript is NOT the same as Java! Include all labels that are relevant to your question; e.g., [node.js], [jQuery], [JSON], [ReactJS], [angular], [ember.js], [vue.js], [typescript], [svelte], etc.</span>
         </div>
      </div>
   )
}

export default Tag;