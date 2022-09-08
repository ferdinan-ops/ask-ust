import Logo from "./Logo";
import Menu from "./Menu";
import Button from "./Button";
import Logout from "./Logout";

export default function Sidebar({ session }) {
  return (
    <div className="fixed hidden h-full flex-col items-center p-2 sm:flex xl:w-[340px] xl:items-start">
      <Logo />
      <Menu session={session} />
      <Button />
      <Logout session={session} />
    </div>
  );
}
