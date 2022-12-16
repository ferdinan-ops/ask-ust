import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';
import Tag from '../../components/tag/Tag';

import "./tags.scss";

const Tags = () => {
   const random = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

   return (
      <div className='tagsPages'>
         <div className="container">
            <div className="heading">
               <h1>Tags</h1>
               <span>Tag adalah kata kunci atau label yang mengkategorikan pertanyaan Anda dengan pertanyaan serupa lainnya. Menggunakan tag yang tepat memudahkan orang lain menemukan dan menjawab pertanyaan Anda.</span>
            </div>
            <div className="searchBar">
               <MagnifyingGlassIcon className="icons" />
               <input placeholder="Cari berdasarkan nama tag" />
            </div>
            <div className="content">
               {random.map((item) => (
                  <Tag key={item} />
               ))}
            </div>
         </div>
      </div>
   )
}

export default Tags;