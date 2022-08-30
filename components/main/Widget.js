import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import mockUser from "../../utils/dummyData.json";

function Widget() {
  const [topUser, setTopUser] = useState(mockUser);

  return (
    <div className="ml-8 hidden space-y-5 py-1 pb-4 lg:inline xl:w-[450px]">
      <div className="sticky top-0 z-50  py-1.5 xl:w-9/12">
        <div className="relative flex items-center bg-[#EBEEF0] rounded-full bg-[#] p-3">
          <SearchIcon className="z-50 h-5 text-gray-500" />
          <input
            type="text"
            className="absolute inset-0 h-full w-full rounded-full border border-transparent bg-transparent pl-11 text-font placeholder-gray-500 outline-none"
            placeholder="Search Twitter"
          />
        </div>
      </div>

      <div className="space-y-3 rounded-xl bg-[#F7F9FA] py-2 text-font xl:w-9/12">
        <h4 className="px-4 text-xl font-bold pb-2">Top Users</h4>
        {topUser.map((result) => (
          <div
            className="flex cursor-pointer items-center px-4 py-2 transition duration-200 ease-out hover:bg-[#EFF1F1]"
            key={result.id}
          >
            <img
              src={result.image}
              alt=""
              className="w-[50px] h-[50px] object-cover rounded-full"
            />
            <div className="group ml-4 leading-5">
              <h4 className="font-bold group-hover:underline">
                {result.username}
              </h4>
              <h5 className="text-[15px] text-[#5B7083] font-medium">
                {result.tag}
              </h5>
            </div>
            <button className="ml-auto rounded-full bg-primary py-1.5 px-3.5 text-sm font-bold text-white hidden xl:flex">
              🎖️ {result.score}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Widget;
