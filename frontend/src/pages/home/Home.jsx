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
            <Posts />
         </div>
      </div>
   );
};

export default Home;
