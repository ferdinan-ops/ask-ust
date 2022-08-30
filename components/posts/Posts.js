import React from "react";
import { ArrowSmUpIcon, ChatAlt2Icon } from "@heroicons/react/outline";
import Moment from "react-moment";

function Posts({ title, username, image, timestamp, answered }) {
  return (
    <div className="flex cursor-pointer border-b-2 border-[#EBEEF0] px-3 py-6 items-center group hover:bg-slate-50">
      <div className="text-gray-600 border-2 rounded-full flex font-medium px-2.5 py-1 gap-x-2 items-center justify-center">
        <ArrowSmUpIcon className="h-5 w-5 min-w-[20px]" />
        <span>10</span>
      </div>
      <div className="ml-4">
        <h2 className="font-bold text-lg group-hover:underline mb-2">
          {title}
        </h2>
        <div className="flex gap-x-2">
          <img
            src={image !== null ? image : "/profile.jpg"}
            alt=""
            className="w-5 h-5 rounded-full"
          />
          <p className="text-sm text-gray-500 font-medium">
            {username} &bull; <Moment fromNow>{timestamp}</Moment>{" "}
            {answered === 1 && (
              <>
                &bull; <span className="text-[#2D8A48]">answered</span>
              </>
            )}
          </p>
        </div>
      </div>
      <div className="ml-auto flex gap-x-5 items-center text-gray-500">
        <p className="flex gap-x-2 items-center font-medium">
          <ChatAlt2Icon className="h-6 w-6" />
          <span>10</span>
        </p>
      </div>
    </div>
  );
}

export default Posts;
