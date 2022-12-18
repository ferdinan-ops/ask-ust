import React, { useContext, useState, useEffect } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { ThemeContext } from "../../context/themeContext";

import "./warning.scss";

const Warning = ({ name }) => {
   const { isThemeClicked } = useContext(ThemeContext);
   const [isTop, setIsTop] = useState(false);

   useEffect(() => {
      document.title = "Ayo Buat Pertanyaan 😀 | ask.UST";
      const scrollHandler = () => setIsTop(window.pageYOffset <= 20);
      window.addEventListener("scroll", scrollHandler);
      scrollHandler();
      return () => window.removeEventListener("scroll", scrollHandler);
   }, []);

   return (
      isThemeClicked &&
      <div className="createWarningCard">
         <div className="leftWarning">
            <ExclamationTriangleIcon className="icons" />
         </div>
         <div className="rightWarning">
            <span>Mohon maaf, <b>{name}</b> kamu harus me-reload ulang halaman ini dikarenakan telah mengganti tema. Hal ini hanya terjadi di halaman buat pertanyaan dan halaman detail.</span>
            <span>Klik <b onClick={() => window.location.reload(false)}>disini</b> untuk me-reload halaman dengan mudah.</span>
            {!isTop && (
               <div className="warningFix" onClick={() => window.scrollTo(0, 0)}>
                  <ExclamationTriangleIcon className="icons" />
                  <span>Scroll ke atas</span>
               </div>
            )}
         </div>
      </div>
   )
}

export default Warning;