import {
  BellIcon,
  BookmarkIcon,
  DotsCircleHorizontalIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import SidebarLink from "./SidebarLink";
import { useRouter } from "next/router";

function Sidebar({ session }) {
  const router = useRouter();
  const { username, image } = session;

  return (
    <div className="fixed hidden h-full flex-col items-center p-2 sm:flex xl:w-[340px] xl:items-start">
      {/* logo */}
      <div className="hoverLogo flex h-14 w-14 items-center justify-center p-0 xl:ml-24 ">
        <img src="/logo.svg" alt="" width={40} height={40} />
      </div>

      {/* list menu */}
      <div className="mt-4 mb-2.5 space-y-2.5 xl:ml-24">
        <SidebarLink
          href="/"
          text="Beranda"
          Icon={HomeIcon}
          active={router.pathname == "/" ? true : false}
        />
        <SidebarLink
          href="/notification"
          text="Notifikasi"
          Icon={BellIcon}
          active={router.pathname == "/notification" ? true : false}
        />
        <SidebarLink
          href="/bookmarks"
          text="Disimpan"
          Icon={BookmarkIcon}
          active={router.pathname == "/bookmarks" ? true : false}
        />
        <SidebarLink
          href="/profile"
          text="Profil"
          Icon={UserIcon}
          active={router.pathname == "/profile" ? true : false}
        />
        <SidebarLink
          href="/more"
          text="Lainnya"
          Icon={DotsCircleHorizontalIcon}
          active={router.pathname == "/more" ? true : false}
        />
      </div>

      {/* Make button */}
      <button className="ml-auto hidden h-[52px] w-56 rounded-full bg-primary text-base font-bold text-white shadow-md hover:bg-[#901211] xl:inline mt-10">
        Buat Pertanyaan
      </button>

      {/* Logout button */}
      <div className="hoverAnimation mt-auto flex max-w-[230px] items-center justify-center text-slate-800 xl:ml-auto group">
        <img
          src={image !== null ? image : "/images/profile-dasar.jpg"}
          alt=""
          className="h-10 w-10 rounded-full xl:mr-3"
          referrerPolicy="no-referrer"
        />
        <div className="hidden leading-5 xl:inline">
          <h4 className="max-w-[88px] truncate font-bold">{username}</h4>
          <p className="max-w-[88px] text-sm truncate text-green-500 font-medium">
            online &bull;
          </p>
        </div>
        <DotsHorizontalIcon className="ml-10 hidden h-5 xl:inline" />
      </div>
    </div>
  );
}

export default Sidebar;
