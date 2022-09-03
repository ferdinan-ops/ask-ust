import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";
import { menus } from "../../utils/menus";
import { PlusCircleIcon } from "@heroicons/react/solid";

function Sidebar({ session }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { username, image } = session;
  const tag = username.split(" ").join("").toLocaleLowerCase();

  const [show, setShow] = useState(false);

  const logoutHandler = (e) => {
    e.preventDefault();
    Cookies.remove("token");
    router.replace("/auth/login");
  };

  return (
    <div className="fixed hidden h-full flex-col items-center p-2 sm:flex xl:w-[340px] xl:items-start">
      {/* logo */}
      <div className="flex items-center gap-x-3">
        <div className="hoverLogo flex h-14 w-14 items-center justify-center p-0 xl:ml-24 ">
          <img src="/logo-2.svg" alt="" width={40} height={40} />
        </div>
        <span className="font-bold text-xl hidden xl:flex">UDF</span>
      </div>

      {/* list menu */}
      <div className="mt-4 mb-2.5 space-y-2.5 xl:ml-24">
        {menus.map((menu, index) => (
          <SidebarLink
            key={index}
            href={menu.href}
            text={menu.text}
            Icon={menu.Icon}
            active={router.pathname == menu.href ? true : false}
          />
        ))}
      </div>

      {/* Make button */}
      <button
        className="xl:ml-auto xl:h-[52px] xl:w-56 rounded-full text-primary hover:text-[#C21D28] xl:hover:text-white xl:bg-primary text-base font-bold xl:text-white shadow-md xl:hover:bg-[#C21D28] xl:inline mt-10"
        onClick={() => {
          router.push("/posts/create");
          dispatch({ type: "CHANGE_LOADING", value: true });
        }}
        title="Buat Pertanyaan"
      >
        <span className="hidden xl:inline">Buat Pertanyaan</span>
        <PlusCircleIcon className="h-10 m-auto block xl:hidden" />
      </button>

      {/* Logout button */}
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
    </div>
  );
}

export default Sidebar;
