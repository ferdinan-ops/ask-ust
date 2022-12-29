import localization from "moment/locale/id";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import moment from "moment";
import React from "react";

import { AuthContext } from "./context/authContext";
import Router from "./config/Router";

const App = () => {
   const { currentUser } = useContext(AuthContext);
   moment.updateLocale("id", localization);

   return (
      <>
         <Router currentUser={currentUser} />
         <div><Toaster /></div>
      </>
   );
};

export default App;
