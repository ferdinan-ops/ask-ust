import {
  BellIcon,
  BookmarkIcon,
  DotsCircleHorizontalIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/solid";

export function AllLinks(id_user) {
  return [
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
      href: `/profile/${id_user}`,
      text: "Profil",
      Icon: UserIcon,
    },
    {
      href: "/more",
      text: "Lainnya",
      Icon: DotsCircleHorizontalIcon,
    },
  ];
}
