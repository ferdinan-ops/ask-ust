import { Ring } from "@uiball/loaders";
import React from "react";

import "./infiniteScroll.scss";

const InfiniteScroll = ({ counts, dataLength, isLoading, loadMoreHandler }) => {
   let content = null;

   if (counts === dataLength) {
      content = <p className="end">Anda telah melihat semuanya 🙂</p>
   } else if (isLoading) {
      content = (
         <div className="loadingPage">
            <Ring size={40} lineWeight={6} speed={2} color="#00bac7" />
         </div>
      )
   } else {
      content = <button onClick={loadMoreHandler} className="infiniteButton">Load More</button>
   }

   return (
      <div className="infinite">{content}</div>
   )
}

export default InfiniteScroll;