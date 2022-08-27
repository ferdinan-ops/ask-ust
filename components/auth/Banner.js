import React from "react";

function Banner({ image, description }) {
  return (
    <div className="lg:w-1/2 bg-gradient-to-b from-[#3C0D0D] to-[#761D1D] lg:flex hidden relative overflow-hidden">
      <div className="m-auto">
        <img
          src={`/images/${image}.svg`}
          alt=""
          className="mb-16 w-full object-cover"
        />
        <div className="lg:px-12 xl:px-24 2xl:px-32">
          <p className="mb-3 text-sm font-semibold uppercase text-white/60">
            UDF.VERCEL.COM
          </p>
          <p className="text-2xl text-white">
            Diskusi secara online semakin mudah – tetap berdiskusi walaupun pake
            kuota dari Kemendikbud hehe~
          </p>
        </div>
      </div>

      <div className="absolute top-[434px] left-[282px] h-[700px] w-[700px] rounded-full bg-white/[1%]"></div>
      <div className="absolute top-[250px] left-[74px] h-[935px] w-[935px] rounded-full bg-white/[1%]"></div>
      <div className="absolute top-[66px] -left-[134px] h-[935px] w-[935px] rounded-full bg-white/[1%]"></div>
      <div className="absolute top-[73px] -left-[249px] h-[1090px] w-[1090px] rounded-full bg-white/[1%]"></div>
    </div>
  );
}

export default Banner;
