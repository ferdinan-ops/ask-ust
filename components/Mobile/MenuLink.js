import {
  BellIcon,
  BookmarkIcon,
  DotsCircleHorizontalIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/solid";

export default function MenuLink() {
  return (
    <section className="mt-6 space-y-6">
      <div className="flex items-center gap-4 rounded-full  py-2 px-4 font-bold">
        <HomeIcon className="h-[30px]" />
        <span>Beranda</span>
      </div>
      <div className="flex items-center gap-4 rounded-full  py-2 px-4 font-bold">
        <BellIcon className="h-[30px]" />
        <span>Notifikasi</span>
      </div>
      <div className="flex items-center gap-4 rounded-full  py-2 px-4 font-bold">
        <BookmarkIcon className="h-[30px]" />
        <span>Markah</span>
      </div>
      <div className="flex items-center gap-4 rounded-full  py-2 px-4 font-bold">
        <UserIcon className="h-[30px]" />
        <span>Profil</span>
      </div>
      <div className="flex items-center gap-4 rounded-full  py-2 px-4 font-bold">
        <DotsCircleHorizontalIcon className="h-[30px]" />
        <span>Lainnya</span>
      </div>
    </section>
  );
}
