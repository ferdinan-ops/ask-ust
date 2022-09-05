import Search from "./Search";
import TopUser from "./TopUser";

export default function Widget() {
  return (
    <div className="2xl:fixed 2xl:right-14 2xl:inline hidden space-y-5 py-1 pb-4 xl:w-[450px]">
      <Search />
      <TopUser />
    </div>
  );
}
