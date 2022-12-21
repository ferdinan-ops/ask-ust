import React from "react";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";

import Router from "./config/Router";
import { AuthContext } from "./context/authContext";

const App = () => {
   const { currentUser } = useContext(AuthContext);
   return (
      <>
         <Router currentUser={currentUser} />
         <div><Toaster /></div>
      </>
   );
};

export default App;
