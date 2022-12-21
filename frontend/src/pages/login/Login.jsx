import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
   const { login } = useContext(AuthContext);

   useEffect(() => {
      document.title = "Masuk | ask.UST";
   }, []);

   return (
      <div className="login">
         <div className="left">
            <div className="wrapper">
               <div className="brand">
                  a<span className="logo">?</span>k<span>.</span>UST
               </div>
               <div className="heading">
                  <h1>Masuk ke akun kamu</h1>
                  <span>Ajukan pertanyaanmu dengan mudah di ask.UST, mulai temukan solusi dari masalah kamu!</span>
               </div>
               <form>
                  <label>
                     <span>Email</span>
                     <input type="email" required />
                  </label>
                  <label>
                     <span>Kata Sandi</span>
                     <input type="password" autoComplete="on" required />
                  </label>
                  <button onClick={login}>Masuk</button>
               </form>
               <p>
                  Belum punya akun?{" "}
                  <Link to="/register">Daftar sekarang, gratis!</Link>
               </p>
            </div>
         </div>
         <div className="right">
            <div className="wrapper">
               <img src="/login.svg" alt="" />
               <div className="desc">
                  <span>ASK-UST.VERCEL.APP</span>
                  <p>Diskusi secara online semakin mudah – tetap berdiskusi walaupun pake kuota dari Kemendikbud hehe~</p>
               </div>
            </div>
            <div className="rounded"></div>
            <div className="rounded"></div>
            <div className="rounded"></div>
         </div>
      </div>
   );
};

export default Login;
