import React, { useState } from "react";
import { EllipsisHorizontalIcon, CheckBadgeIcon, FlagIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import "./more.scss";

const More = () => {
   const [isShow, setIsShow] = useState(false);

   return (
      <div className="more" onClick={() => setIsShow(!isShow)}>
         <div className="iconWrapper">
            <EllipsisHorizontalIcon className="icons" />
         </div>
         <ul className={isShow ? "active" : ""}>
            <li>
               <CheckBadgeIcon className="icons" />
               <span>Jadikan jawaban terbaik</span>
            </li>
            <li className="danger">
               <FlagIcon className="icons" />
               <span>Laporkan jawaban</span>
            </li>
            <li>
               <PencilIcon className="icons" />
               <span>Ubah</span>
            </li>
            <li className="danger">
               <TrashIcon className="icons" />
               <span>Hapus</span>
            </li>
         </ul>
      </div>
   )
}

export default More;