import LoadingBtn from "@components/loading/LoadingBtn";
import Link from "next/link";
import React from "react";
import GoogleIcon from "../../public/icons/google.svg";

function Form({
  fields,
  isLogin,
  isLoading,
  isRegister,
  authGoogle,
  fieldHandler,
  handleSubmit,
}) {
  return (
    <div className="2xl:px-40 lg:w-1/2 w-full md:py-0 p-10 m-auto ">
      <h1 className="text-[32px] font-bold mb-[10px]">
        {isLogin ? "Masuk" : "Daftar"}
      </h1>
      <p className="text-black/60 mb-5 ">
        {isLogin
          ? "Anda dapat login dengan akun terdaftar Anda atau login cepat dengan akun Google Anda."
          : "Masukkan detail data Anda di bawah."}
      </p>

      {isLogin && (
        <>
          <button
            className="w-full border py-5 font-semibold flex justify-center gap-4 rounded-md hover:bg-gray-50 bg-white"
            onClick={authGoogle}
          >
            <GoogleIcon /> Masuk dengan Google
          </button>
          <div className="flex justify-between items-center mt-[35px]">
            <span className="h-[2px] bg-black w-full" />
            <span className="px-2 font-semibold">atau</span>
            <span className="h-[2px] bg-black w-full" />
          </div>
        </>
      )}

      <form className="mt-[38px] space-y-8" onSubmit={handleSubmit}>
        {isRegister && (
          <div className="flex flex-col font-semibold">
            <label htmlFor="name">Nama</label>
            <input
              type="text"
              id="username"
              placeholder="Masukkan Nama"
              className="input-auth"
              onChange={fieldHandler}
              value={fields.username}
            />
          </div>
        )}

        <div className="flex flex-col font-semibold">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Masukkan Email"
            className="input-auth"
            onChange={fieldHandler}
            value={fields.email}
          />
        </div>

        <div className="flex flex-col font-semibold">
          <div className="flex justify-between">
            <label htmlFor="password">Kata Sandi</label>
            {/* {isLogin && (
              <a href="#" className="text-primary">
                Lupa Kata Sandi?
              </a>
            )} */}
          </div>
          <input
            type="password"
            id="password"
            placeholder="Masukkan Password"
            className="input-auth"
            onChange={fieldHandler}
            value={fields.password}
          />
        </div>

        {isRegister && (
          <div className="flex flex-col font-semibold">
            <label className="relative flex items-center cursor-pointer gap-4 font-semibold">
              <input
                type="checkbox"
                name="remember"
                id="check-box"
                className="h-6 w-6 appearance-none rounded-sm bg-[#F3F4F6] transition checked:bg-primary cursor-pointer"
              />
              Setuju dengan syarat dan ketentuan
              <i className="fa-solid fa-check checked-icon absolute top-0 left-[5px] text-base text-white opacity-0 z-10"></i>
            </label>
          </div>
        )}

        <button
          className="w-full bg-primary text-white py-5 rounded-md font-semibold hover:shadow-2xl hover:shadow-primary/20 transition duration-300 ease-in-out"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <LoadingBtn /> : isLogin ? "Masuk" : "Mendaftar"}
        </button>
      </form>

      <p className="text-[#4B5563] font-semibold mt-14 text-center ">
        {isLogin ? "Belum punya akun?" : "Punya akun?"}{" "}
        <Link href={`${isLogin ? "register" : "login"}`}>
          <a className="text-primary">
            {isLogin ? "Daftar sekarang, gratis!" : "Masuk!"}
          </a>
        </Link>
      </p>
    </div>
  );
}

export default Form;
