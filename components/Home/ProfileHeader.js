import More from "@components/main/More";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Moment from "react-moment";

export default function ProfileHeader(props) {
  const { username, image, updated_at } = props;
  const [show, setShow] = useState(false);
  const tag = username.split(" ").join("").toLocaleLowerCase();

  return (
    <div className="flex items-center font-medium w-full">
      <img
        src={image !== null ? image : "/profile.jpg"}
        alt="Profile Picture"
        className="mr-4 h-11 w-11 rounded-full"
        referrerPolicy="no-referrer"
      />
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800 truncate">
          {username} &bull;{" "}
          <span className="text-gray-500 text-sm">
            <Moment fromNow>{updated_at}</Moment>
          </span>
        </span>
        <span className="text-sm text-gray-500">@{tag}</span>
      </div>
      <div
        className="ml-auto icon relative"
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}
      >
        <DotsHorizontalIcon className="h-5 text-font" />
        {show && <More {...props} />}
      </div>
    </div>
  );
}
