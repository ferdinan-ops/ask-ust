import {
  ArrowSmUpIcon,
  ChatAlt2Icon,
  CheckCircleIcon,
} from "@heroicons/react/outline";

export default function PostReact({ answered }) {
  return (
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
  );
}
