import React, { useState } from "react";
import {
  ArrowSmUpIcon,
  ChatAlt2Icon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";
import { CheckCircleIcon } from "@heroicons/react/solid";
import More from "@components/main/More";
import Router from "next/router";
import { useDispatch } from "react-redux";

function Posts({ post, sessionId, deleteHandler }) {
  const { title, username, userImage, updated_at, answered, userId, postId } =
    post;
  const [show, setShow] = useState(false);
  const tag = username.split(" ").join("").toLocaleLowerCase();
  const dispatch = useDispatch()

  return (
    <div
      className="flex cursor-pointer p-3 border-b-2 border-[#EBEEF0] hover:bg-slate-50 font-medium"
      onClick={() => {
        Router.push(`/posts/${postId}`)
        dispatch({ type: "CHANGE_LOADING", value: true });
      }}
    >
      <img
        src={userImage !== null ? userImage : "/profile.jpg"}
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
              &bull; <Moment fromNow>{updated_at}</Moment>
            </span>
            <p className="text-sm text-gray-500">@{tag}</p>
            <h1 className="my-5 text-lg text-font font-bold">{title}</h1>
          </div>
          <div
            className="icon group ml-auto flex-shrink-0 relative"
            onClick={(e) => {
              e.stopPropagation();
              setShow(!show);
            }}
          >
            <DotsHorizontalIcon className="h-5 text-gray-500" />
            {show && (
              <More
                isUserHave={sessionId === userId}
                deleteHandler={deleteHandler}
                postId={postId}
              />
            )}
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
