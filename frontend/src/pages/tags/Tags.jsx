import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Ring } from '@uiball/loaders';

import { getTags, searchTag, setIsLoading } from '../../config/redux/features/tagSlice';
import { InfiniteScroll } from '../../components';
import "./tags.scss";

const Tags = () => {
   const [keyword, setKeyword] = useState("");
   const [page, setPage] = useState(9);
   const [searchParams] = useSearchParams();

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const params = searchParams.get("search");
   const { tags, counts, isLoading } = useSelector((state) => state.tag);

   useEffect(() => {
      document.title = "Tags | ask.UST"
   }, []);

   useEffect(() => {
      if (!params) {
         dispatch(getTags(page));
      } else {
         dispatch(searchTag({ params, page }))
      }
   }, [params, dispatch, keyword, page]);

   const searchHandler = (e) => {
      e.preventDefault();
      navigate({
         pathname: "/forum/tags",
         search: `?${createSearchParams({ search: keyword })}`
      });
      setIsLoading(true);
      setPage(9);
   }

   const loadHandler = (e) => {
      e.preventDefault();
      setPage(page + 3);
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
               <input
                  placeholder="Cari berdasarkan nama tag"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
               />
            </form>
            <div className="tagsContent">
               {tags.length > 0 ? tags.map((tag) => (
                  <div className="tag" key={tag._id} onClick={() => navigate(`/forum/tags/${tag.name}`)}>
                     <button># {tag.name}</button>
                     <span>{tag.desc}</span>
                  </div>
               )) : (
                  isLoading ? (
                     <div className='loadingPage'>
                        <Ring size={30} lineWeight={6} speed={2} color="#00bac7" />
                     </div>
                  ) : (
                     params && <p>Maaf tag <b><i>{params}</i></b> tidak ditemukan 😔</p>
                  )
               )}
               {tags.length > 8 && (
                  <InfiniteScroll
                     counts={counts}
                     dataLength={tags.length}
                     isLoading={isLoading}
                     loadMoreHandler={loadHandler}
                  />
               )}
            </div>
         </div>
      </div>
   )
}

export default Tags;