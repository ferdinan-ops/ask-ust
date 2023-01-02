import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ring } from '@uiball/loaders'

import { AuthContext } from "../../context/authContext";
import "./login.scss";
import { toast } from "react-hot-toast";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const navigate = useNavigate();
   const { login } = useContext(AuthContext);

   useEffect(() => {
      document.title = "Masuk | ask.UST";
   }, []);

   const submitHandler = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
         await login({ email, password });
         setIsLoading(false);
         toast.success("Berhasil masuk!");
         navigate("/forum/questions");
      } catch (error) {
         setIsLoading(false);
         console.log(error);
         toast.error(error.response.data.msg);
      }
   }

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
               <form onSubmit={submitHandler}>
                  <label>
                     <span>Email</span>
                     <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </label>
                  <label>
                     <span>Kata Sandi</span>
                     <input type="password" autoComplete="on" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  </label>
                  <button className={isLoading ? "loading" : ""}>
                     {isLoading ? <Ring size={22} lineWeight={8} speed={2} color="#fff" /> : "Masuk"}
                  </button>
               </form>
               <p>
                  Belum punya akun?{" "}
                  <Link to="/register">Daftar sekarang, gratis!</Link>
               </p>
            </div>
         </div>
         <div className="right">
            <div className="wrapper">
               <img src="/images/login.svg" alt="" />
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
