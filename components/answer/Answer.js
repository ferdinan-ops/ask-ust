import PostReaction from "@components/posts/PostReaction";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Moment from "react-moment";
import DOMPurify from "isomorphic-dompurify";

function Answer({ answerList, render, userId }) {
  const { username, image, content, updated_at, id_user } = answerList;
  const tag = username.split(" ").join("").toLocaleLowerCase();
  const detail = DOMPurify.sanitize(content);
  const [show, setShow] = useState(false);
  console.log(answerList);

  return (
    <div className="border-b-2 p-4 border-[#EBEEF0] xl:py-4 xl:px-6">
      <h1 className="text-xl font-semibold text-font">3 Jawaban</h1>

      <div className="mt-6 flex items-center font-medium">
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
        {userId == id_user && (
          <div className="ml-auto icon">
            <DotsHorizontalIcon className="h-5 text-font" />
          </div>
        )}
      </div>

      {render && (
        <div
          className="mt-5 prose text-font detail"
          dangerouslySetInnerHTML={{ __html: detail }}
        />
      )}

      <PostReaction />
    </div>
  );
}

export default Answer;
