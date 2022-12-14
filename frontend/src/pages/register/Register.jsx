import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { Gap } from "../../components";
import "./register.scss";

const Register = () => {
   useEffect(() => {
      document.title = "Masuk | ask.UST";
   }, []);

   return (
      <div className="register">
         <div className="left">
            <div className="wrapper">
               <div className="brand">
                  a<span className="logo">?</span>k<span>.</span>UST
               </div>
               <div className="heading">
                  <h1>Buat akun baru</h1>
                  <span>
                     Nggak susah kok, kamu cuma tinggal masukin beberapa data
                     aja terus langsung jadi deh!
                  </span>
               </div>
               <Gap height={45} />
               <form>
                  <label>
                     <span>Username</span>
                     <input required />
                  </label>
                  <label>
                     <span>Email</span>
                     <input type="email" required />
                  </label>
                  <label>
                     <span>Kata Sandi</span>
                     <input type="password" autoComplete="on" required />
                  </label>
                  <button>Mendaftar</button>
               </form>
               <Gap height={45} />
               <p>
                  Udah punya akun? <Link to="/login">Login!</Link>
               </p>
            </div>
         </div>
         <div className="right">
            <div className="brand">
               a<span className="logo">?</span>k<span>.</span>UST
            </div>
            <div className="wrapper">
               <img src="/register.svg" alt="" />
               <div className="desc">
                  <span>ASK-UST.VERCEL.APP</span>
                  <p>
                     Ayo mendaftar dan rajin berdiskusi di sini supaya masalah
                     Anda cepat terselesaikan biar gak stress mulu~
                  </p>
               </div>
            </div>
            <div className="rounded"></div>
            <div className="rounded"></div>
            <div className="rounded"></div>
         </div>
      </div>
   );
};

export default Register;
