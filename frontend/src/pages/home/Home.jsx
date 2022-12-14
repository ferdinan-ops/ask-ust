import React from "react";
import { useEffect } from "react";
import { Posts } from "../../components";

import "./home.scss";

const Home = () => {
   useEffect(() => {
      document.title = "Semua Pertanyaan | ask.UST"
   }, []);

   return (
      <div className="home">
         <div className="homeWrapper">
            <h1>Semua Pertanyaan</h1>
            <span>
               Kamu bisa mencari seluruh soal yang terbaru dan belum pernah di jawab oleh siapapun disini!
            </span>
            <Posts />
         </div>
      </div>
   );
};

export default Home;
