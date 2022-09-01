import {
  BellIcon,
  BookmarkIcon,
  DotsCircleHorizontalIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/solid";
export const menus = [
  {
    href: "/",
    text: "Beranda",
    Icon: HomeIcon,
  },
  {
    href: "/notification",
    text: "Notifikasi",
    Icon: BellIcon,
  },
  {
    href: "/bookmarks",
    text: "Disimpan",
    Icon: BookmarkIcon,
  },
  {
    href: "/profile",
    text: "Profil",
    Icon: UserIcon,
  },
  {
    href: "/more",
    text: "Lainnya",
    Icon: DotsCircleHorizontalIcon,
  },
];
