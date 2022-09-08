import { AllLinks } from "utils/menus";
import SideLink from "./SideLink";
import { useRouter } from "next/router";

export default function Menu({ session }) {
  const router = useRouter();
  const menus = AllLinks(session.id);
  return (
    <div className="mt-4 mb-2.5 space-y-2.5 xl:ml-24">
      {menus.map((menu, index) => (
        <SideLink
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
