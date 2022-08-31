import React, { useState } from "react";
import {
  ArrowSmUpIcon,
  ChatAlt2Icon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";
import { CheckCircleIcon } from "@heroicons/react/solid";
import More from "@components/main/More";

function Posts({ title, username, image, timestamp, answered }) {
  const [show, setShow] = useState(false);
  const tag = username.split(" ").join("").toLocaleLowerCase();

  return (
    <div className="flex cursor-pointer p-3 border-b-2 border-[#EBEEF0] hover:bg-slate-50 font-medium">
      <img
        src={image !== null ? image : "/profile.jpg"}
        alt="Profile Picture"
        className="mr-4 h-11 w-11 rounded-full"
        referrerPolicy="no-referrer"
      />

      <div className="flex w-full flex-col space-y-2">
        <div className="flex">
          <div className="text-font">
            <div className="group inline-block">
              <h4 className="text-[15px] font-bold text-font/80 text-secondary group-hover:underline sm:text-base inline-block">
                {username}
              </h4>
            </div>
            <span className="ml-1 text-sm hover:underline sm:text-[15px] text-gray-500">
              &bull; <Moment fromNow>{timestamp}</Moment>
            </span>
            <p className="text-sm text-gray-500">@{tag}</p>
            <h1 className="my-5 text-lg text-font font-bold">{title}</h1>
          </div>
          <div
            className="icon group ml-auto flex-shrink-0 relative"
            onClick={() => setShow(!show)}
          >
            <DotsHorizontalIcon className="h-5 text-gray-500" />
            {show && <More />}
          </div>
        </div>

        <div className="flex w-10/12 gap-x-3 items-center">
          <div className="text-gray-600 border-2 rounded-full flex font-medium px-2.5 py-1 gap-x-2 items-center w-fit">
            <ArrowSmUpIcon className="h-5 group-hover:text-primary" />
            <span>0</span>
          </div>
          <div className="text-gray-600 border-2 rounded-full flex font-medium px-2.5 py-1 gap-x-2 items-center w-fit">
            <ChatAlt2Icon className="h-5 group-hover:text-primary" />
            <span>0</span>
          </div>
          {answered === 1 && (
            <div className="text-white bg-green-700  rounded-full flex font-medium px-3 py-1.5 gap-x-1 items-center w-fit">
              <CheckCircleIcon className="h-5" />
              <span className="text-sm">Terjawab</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;

// <div className="cursor-pointer border-b-2 border-[#EBEEF0] px-3 py-4 group hover:bg-slate-50">
//   <div className="flex items-center ">
//     <img
//       src={image !== null ? image : "/profile.jpg"}
//       alt=""
//       className="mr-4 h-11 w-11 rounded-full"
//     />
//     <div className="flex flex-col">
//       <p className="text-[15px] font-bold text-font group-hover:underline sm:text-base inline-block">
//         {username}
//       </p>
//       <span className="text-sm sm:text-[15px]">@ferdinan</span>
//     </div>
//     <div className="icon group ml-auto flex-shrink-0">
//       <DotsHorizontalIcon className="h-5 text-font hover:text-primary" />
//     </div>
//   </div>
//   <div className="ml-[60px] mt-2">
//     <h1 className="font-bold text-lg text-font">{title}</h1>
//     <div className="mt-3 flex gap-x-4">
//       <div className="text-gray-600 border-2 rounded-full flex font-medium px-2.5 py-1 gap-x-2 items-center w-fit">
//         <ArrowSmUpIcon className="h-5 w-5 min-w-[20px]" />
//         <span>10</span>
//       </div>
//       <div className="text-gray-600 border-2 rounded-full flex font-medium px-2.5 py-1 gap-x-2 items-center w-fit">
//         <ChatAlt2Icon className="h-5 w-5 min-w-[20px]" />
//         <span>10</span>
//       </div>
//     </div>
//   </div>
// </div>
