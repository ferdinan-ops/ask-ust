import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Ring } from "@uiball/loaders";

import { toast } from "react-hot-toast";
import { registerAPI } from "../../config/api";
import "./register.scss";

const Register = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      document.title = "Masuk | ask.UST";
   }, []);

   const submitHandler = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
         const { data } = await registerAPI({ name, email, password });
         setIsLoading(false);
         toast.success(data.msg);
      } catch (error) {
         setIsLoading(false);
         toast.error(error.response.data.msg);
      }
   }

   return (
      <div className="register">
         <div className="left">
            <div className="wrapper">
               <div className="brand">
                  a<span className="logo">?</span>k<span>.</span>UST
               </div>
               <div className="heading">
                  <h1>Buat akun baru</h1>
                  <span>Nggak susah kok, kamu cuma tinggal masukin beberapa data aja terus langsung jadi deh!</span>
               </div>
               <form onSubmit={submitHandler}>
                  <label>
                     <span>Username</span>
                     <input required value={name} onChange={(e) => setName(e.target.value)} />
                  </label>
                  <label>
                     <span>Email</span>
                     <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </label>
                  <label>
                     <span>Kata Sandi</span>
                     <input type="password" autoComplete="on" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  </label>
                  <button className={isLoading ? "loading" : ""}>
                     {isLoading ? <Ring size={22} lineWeight={8} speed={2} color="#fff" /> : "Mendaftar"}
                  </button>
               </form>
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
                  <p>Ayo mendaftar dan rajin berdiskusi di sini supaya masalah Anda cepat terselesaikan biar gak stress mulu~</p>
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
