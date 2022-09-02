import React, { useEffect, useState } from "react";
import ImageHeader from "./ImageHeader";
import PostReaction from "./PostReaction";

function DetailPost({ post, render }) {
  const { title, content, updated_at, image, username } = post;

  return (
    <div className="flex flex-col p-4 xl:px-6 border-b-2 border-[#EBEEF0] font-medium text-font">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <ImageHeader {...post} />

      {render && (
        <div
          className="mt-5 prose text-font detail"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      <PostReaction />
    </div>
  );
}

export default DetailPost;
