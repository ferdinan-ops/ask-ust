import {
  BookmarkIcon,
  FlagIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";

function More() {
  return (
    <ul className="absolute top-8 text-font flex flex-col bg-white shadow-md right-0">
      <li className="flex items-center gap-x-3 hover:bg-slate-100 py-2 px-5 rounded-md">
        <PencilAltIcon className="h-5" /> Edit
      </li>
      <li className="flex items-center gap-x-3 hover:bg-slate-100 py-2 px-5 rounded-md">
        <TrashIcon className="h-5" /> Delete
      </li>
      <li className="flex items-center gap-x-3 hover:bg-slate-100 py-2 px-5 rounded-md">
        <FlagIcon className="h-5" /> Report
      </li>
      <li className="flex items-center gap-x-3 hover:bg-slate-100 py-2 px-5 rounded-md">
        <BookmarkIcon className="h-5" /> Save
      </li>
    </ul>
  );
}

export default More;
