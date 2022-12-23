import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { getTags, searchTag } from '../../config/redux/features/tagSlice';
import "./tags.scss";

const Tags = () => {
   const [keyword, setKeyword] = useState("");
   const [searchParams] = useSearchParams();

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const params = searchParams.get("search");
   const { tags } = useSelector((state) => state.tag);

   useEffect(() => { document.title = "Tags | ask.UST" }, []);
   useEffect(() => {
      if (!params) {
         dispatch(getTags());
      } else {
         dispatch(searchTag(params))
      }
   }, [params, dispatch, keyword]);

   const searchHandler = (e) => {
      e.preventDefault();
      navigate({
         pathname: "/forum/tags",
         search: `?${createSearchParams({ search: keyword })}`
      });
   }

   return (
      <div className="tagsPages">
         <div className="tagsContainer">
            <div className="pagesTitle">
               <h1>Tags</h1>
               <span>Tag adalah kata kunci atau label yang mengkategorikan pertanyaan Anda dengan pertanyaan serupa lainnya. Menggunakan tag yang tepat memudahkan orang lain menemukan dan menjawab pertanyaan Anda.</span>
            </div>
            <form className="tagsSearchBar" onSubmit={searchHandler}>
               <MagnifyingGlassIcon className="icons" />
               <input placeholder="Cari berdasarkan nama tag" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            </form>
            <div className="tagsContent">
               {tags.map((tag) => (
                  <div className="tag" key={tag._id}>
                     <button># {tag.name}</button>
                     <span>{tag.desc}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Tags;