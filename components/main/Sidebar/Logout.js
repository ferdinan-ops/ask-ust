import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Router from "next/router";
import Cookies from "js-cookie";

export default function Logout({ session }) {
  const { username, image } = session;
  const [show, setShow] = useState(false);
  const tag = username.split(" ").join("").toLocaleLowerCase();

  const logoutHandler = (e) => {
    e.preventDefault();
    Cookies.remove("token");
    Router.replace("/auth/login");
  };
  return (
    <div
      className="relative hoverAnimation mt-auto flex max-w-[230px] xl:min-w-[220px] items-center justify-center xl:justify-between text-slate-800 xl:ml-auto group"
      onClick={() => setShow(!show)}
    >
      <img
        src={image !== null ? image : "/profile.jpg"}
        alt=""
        className="h-10 w-10 rounded-full xl:mr-3"
        referrerPolicy="no-referrer"
      />
      <div className="hidden leading-5 xl:inline">
        <h4 className="max-w-[88px] truncate font-bold">{username}</h4>
        <p className="max-w-[88px] text-sm truncate text-[#5B7083] font-medium">
          @{tag}
        </p>
      </div>
      <DotsHorizontalIcon className="ml-10 hidden h-5 xl:inline" />

      {show && (
        <div
          className="left-0 -top-16 z-[99999] absolute shadow-lg bg-red-500 border-2 max-w-[220px] w-[220px] px-4 py-3 xl:-top-16 xl:left-1/2 xl:-translate-x-1/2 rounded-md"
          onClick={logoutHandler}
        >
          <p className="text-center font-semibold text-white">Keluar</p>
        </div>
      )}
    </div>
  );
}
