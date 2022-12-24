import { Ring } from "@uiball/loaders";
import React from "react";

import "./infiniteScroll.scss";

const InfiniteScroll = ({ counts, dataLength, isLoading, loadMoreHandler }) => {
   return (
      <div className="infinite">
         {counts === dataLength ? (
            <p className="end">
               Anda telah melihat semuanya 🙂
            </p>
         ) : (
            isLoading ? (
               <div className="loadingPage">
                  <Ring size={40} lineWeight={8} speed={2} color="#00bac7" />
               </div>
            ) : (
               <button onClick={loadMoreHandler} className="infiniteButton">Load More</button>
            )
         )}
      </div>
   )
}

export default InfiniteScroll;