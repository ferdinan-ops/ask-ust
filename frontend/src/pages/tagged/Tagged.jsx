import { getPostByTag, getTag } from "../../config/redux/features/tagSlice";
import { InfiniteScroll, Post } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./tagged.scss";

const Tagged = () => {
   const [page, setPage] = useState(3);

   const { tag } = useParams();
   const dispatch = useDispatch();
   const { tagged, tag: tagData } = useSelector((state) => state.tag);
   const { data, isLoading, counts } = tagged;

   useEffect(() => { dispatch(getPostByTag({ page, tag })) }, [dispatch, page, tag]);
   useEffect(() => { dispatch(getTag(tag)) }, [dispatch, tag]);

   const loadHandler = (e) => {
      e.preventDefault();
      setPage(page + 3);
   }

   return (
      <div className="taggedPages">
         <div className="taggedContainer">
            <div className="pagesTitle">
               <h1>Tag <span># {tagData.name}</span></h1>
               <span>{tagData.desc}</span>
            </div>
            <div className="taggedPosts">
               {data.length > 0 ?
                  (data.map((post) => <Post post={post} key={post._id} />)) :
                  (<p className="nonePost">Maaf belum ada pertanyaan dengan tag <b>{tag}</b> 😔</p>)
               }
               {data.length > 2 && (
                  <InfiniteScroll
                     counts={counts}
                     dataLength={data.length}
                     isLoading={isLoading}
                     loadMoreHandler={loadHandler}
                  />
               )}
            </div>
         </div>
      </div>
   );
};

export default Tagged;
