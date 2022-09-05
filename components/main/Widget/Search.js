import { SearchIcon } from "@heroicons/react/outline";

export default function Search() {
  return (
    <div className="py-1.5 xl:w-9/12">
      <div className="relative flex items-center bg-[#EBEEF0] rounded-full bg-[#] p-3">
        <SearchIcon className="z-50 h-5 text-gray-500" />
        <input
          type="text"
          className="absolute inset-0 h-full w-full rounded-full border border-transparent bg-transparent pl-11 text-font placeholder-gray-500 outline-none"
          placeholder="Search Twitter"
        />
      </div>
    </div>
  );
}
