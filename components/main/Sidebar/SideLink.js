import Link from "next/link";

export default function SideLink({ Icon, text, active, href }) {
  return (
    <Link href={href}>
      <a className="block">
        <div
          className={`hoverAnimation flex items-center justify-center space-x-3 text-xl xl:justify-start ${
            active ? "font-bold text-primary" : "text-font font-medium"
          }`}
        >
          <Icon className="h-7" />
          <span className="hidden xl:inline">{text}</span>
        </div>
      </a>
    </Link>
  );
}
