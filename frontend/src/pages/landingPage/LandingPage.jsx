import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

import { ArrowRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";

import { features, links, teams } from "../../utils/dummy";
import "./landingPage.scss";

const LandingPage = () => {
   const [top, setTop] = useState(false);
   const [isShow, setIsShow] = useState(false);

   useEffect(() => {
      document.title = "ask.UST"
   }, []);

   useEffect(() => {
      const scrollHandler = () => setTop(window.pageYOffset <= 20);
      window.addEventListener("scroll", scrollHandler);
      scrollHandler();
      return () => window.removeEventListener("scroll", scrollHandler);
   }, []);

   return (
      <div>
         <div className={`mobile-nav ${isShow ? "active" : ""}`}>
            <XMarkIcon className="icons" onClick={() => setIsShow(false)} />
            {links.map((item) => (
               <div className="nav-item" key={item}>
                  <ScrollLink to={item} activeClass="active" spy={true} smooth={true} offset={-80} duration={100} onClick={() => setIsShow(false)}>
                     {item}
                  </ScrollLink>
               </div>
            ))}
            <div className="buttons">
               <Link to="/register">Sign Up</Link>
               <Link to="/login">Sign In</Link>
            </div>
         </div>
         <header className={!top ? "not-top" : ""}>
            <div className="container">
               <div className="brand">
                  <p>a<span className="logo">?</span>k<span>.</span>UST</p>
               </div>
               <nav>
                  {links.map((item) => (
                     <div className="nav-item" key={item}>
                        <ScrollLink to={item} activeClass="active" spy={true} smooth={true} offset={-80} duration={100}>
                           {item}
                        </ScrollLink>
                     </div>
                  ))}
               </nav>
               <div className="buttons">
                  <Link to="/register">Sign Up</Link>
                  <Link to="/login">Sign In</Link>
               </div>
               <Bars3Icon className="icons" onClick={() => setIsShow(true)} />
            </div>
         </header>
         <main>
            <section className="home" id="home">
               <div className="container">
                  <div className="home-top">
                     <h1>Sebuah cara mudah dalam menjawab pertanyaan dan masalah kamu</h1>
                     <span>Memiliki kesulitan dalam mengerti pembelajaran di kampus, sudah tidak menjadi masalah dengan aplikasi ini kamu dapat bertanya keseluruh civitas akademik mengenai masalahmu dan temukan jawaban terbaikmu~</span>
                     <Link to="/register">
                        <span>Get Started</span>
                        <ArrowRightIcon className="icons" />
                     </Link>
                  </div>
                  <img src="/app.png" alt="" />
               </div>
            </section>
            <section className="features" id="features">
               <div className="container">
                  <div className="top">
                     <h1>Our Features</h1>
                     <p>Beberapa fitur terbaik dari aplikasi ask.UST yang bisa kamu dapatkan</p>
                  </div>
                  <div className="bottom">
                     {features.map((feature, index) => (
                        <div className="card" key={index}>
                           <div className="card-top">{feature.img}</div>
                           <div className="card-bottom">
                              <b>{feature.title}</b>
                              <span>{feature.desc}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </section>
            <section className="teams" id="teams">
               <div className="container">
                  <div className="top">
                     <h1>Our Teams</h1>
                     <span>Berikut orang-orang menarik yang membuat, merancang, dan membangun ask.UST yang menarik ini</span>
                  </div>
                  <div className="bottom">
                     {teams.map((team, index) => (
                        <div className="team-card" key={index}>
                           <div className="photos">
                              <img src={team.img} alt=" " />
                           </div>
                           <span>{team.name}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </section>
            <section className="last">
               <div className="container">
                  <h1>Mulai berdiskusi dan bertanya serta temukan jawaban terbaik dari permasalahan kamu</h1>
                  <span>Diskusi secara online semakin mudah dengan ask.UST – tetap berdiskusi walaupun pake kuota dari Kemendikbud hehe~. Jadi, tunggu apa lagi, ayo segera mendaftar dan rajin berdiskusi di sini supaya masalah Anda cepat terselesaikan biar gak stress mulu~</span>
                  <Link to="/register">
                     <span>Get Started</span>
                     <ArrowRightIcon className="icons" />
                  </Link>
               </div>
            </section>
            <footer>
               <div className="container">
                  <div className="brand">
                     <p>a<span className="logo">?</span>k<span>.</span>UST</p>
                  </div>
                  <span>
                     <span className="hide">develop</span> by {" "}
                     <a href="https://github.com/ferdinan-ops" target="_blank" rel="noreferrer">
                        Ferdinan Imanuel Tumanggor
                     </a>
                  </span>
               </div>
            </footer>
         </main>
      </div>
   )
}

export default LandingPage;