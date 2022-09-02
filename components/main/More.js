import {
  BookmarkIcon,
  FlagIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Router from "next/router";

function More({ isUserHave, deleteHandler, postId, isAnswer }) {
  return (
    <ul className="absolute z-10 top-8 text-font flex flex-col bg-white shadow-md right-0">
      {isUserHave && (
        <>
          <li
            className="flex items-center gap-x-3 hover:bg-slate-100 py-2 px-5 rounded-md"
            onClick={() => !isAnswer && Router.push(`/posts/update/${postId}`)}
          >
            <PencilAltIcon className="h-5" /> Edit
          </li>
          <li
            className="flex items-center gap-x-3 hover:bg-slate-100 py-2 px-5 rounded-md"
            onClick={!isAnswer && deleteHandler.bind(this, postId)}
          >
            <TrashIcon className="h-5" /> Delete
          </li>
        </>
      )}
      {!isAnswer && (
        <>
          <li className="flex items-center gap-x-3 hover:bg-slate-100 py-2 px-5 rounded-md">
            <FlagIcon className="h-5" /> Report
          </li>
          <li className="flex items-center gap-x-3 hover:bg-slate-100 py-2 px-5 rounded-md">
            <BookmarkIcon className="h-5" /> Save
          </li>
        </>
      )}
    </ul>
  );
}

export default More;
