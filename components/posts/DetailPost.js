import {
  ArrowSmDownIcon,
  ArrowSmUpIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/outline";
import React from "react";

function DetailPost() {
  return (
    <div className="flex flex-col p-3 border-b-2 border-[#EBEEF0] font-medium text-font">
      <h1 className="text-2xl font-semibold">
        Play Vimeo Videos on Hover (player.js) updated
      </h1>

      <div className="mt-6 flex items-center font-medium">
        <img
          //   src={userImage !== null ? userImage : "/profile.jpg"}
          src="/ayank.jpg"
          alt="Profile Picture"
          className="mr-4 h-11 w-11 rounded-full"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">
            Ferdinan Imanuel Tumanggor
          </span>
          <span className="text-sm text-gray-500">2 Days Ago</span>
        </div>
      </div>

      <div className="mt-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad harum fuga,
        ex illo aliquam incidunt sed, quas enim quis, obcaecati qui tenetur.
        Cumque, suscipit at? Nulla delectus magni dolore quisquam. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Accusantium reiciendis
        voluptatem aliquid incidunt. Cupiditate quae eveniet sapiente ipsum
        suscipit quod sunt ipsam, illum eos ratione exercitationem excepturi
        maxime soluta placeat!
      </div>

      <div className="flex gap-x-4 mt-6 cursor-pointer items-center">
        <div className="flex gap-x-1 border-2 text-green-700 pl-2 pr-3 py-1 border-green-700 rounded-full hover:bg-green-700 hover:text-white">
          <ArrowSmUpIcon className="h-6" />
          <span>10</span>
        </div>
        <div className="flex gap-x-1 border-2 text-red-700 pl-2 pr-3 py-1 border-red-700 rounded-full hover:bg-red-700 hover:text-white">
          <ArrowSmDownIcon className="h-6" />
          <span>10</span>
        </div>
        <div className="ml-auto text-gray-500 cursor-pointer flex items-center pr-4  group">
          <div className="w-9 h-9 rounded-full group-hover:bg-gray-500/10 flex">
            <ShieldExclamationIcon className="h-6 m-auto" />
          </div>
          <span className="hidden xl:flex">Laporkan Konten ini</span>
        </div>
      </div>
    </div>
  );
}

export default DetailPost;
