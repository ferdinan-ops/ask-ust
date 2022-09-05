import { menus } from "utils/menus";
import SideLink from "./SideLink";
import { useRouter } from "next/router";

export default function Menu() {
  const router = useRouter();
  return (
    <div className="mt-4 mb-2.5 space-y-2.5 xl:ml-24">
      {menus.map((menu, index) => (
        <SideLink
          // active={router.pathname == menu.href ? true : false}
          // key={index}
          // {...menus}
          key={index}
          href={menu.href}
          text={menu.text}
          Icon={menu.Icon}
          active={router.pathname == menu.href ? true : false}
        />
      ))}
    </div>
  );
}
