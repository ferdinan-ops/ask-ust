import React from "react";
import { useContext } from "react";
import Router from "./config/Router";
import { AuthContext } from "./context/authContext";

const App = () => {
   const { currentUser } = useContext(AuthContext);
   return <Router currentUser={currentUser} />;
};

export default App;
