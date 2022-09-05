import { ArrowSmDownIcon, ArrowSmUpIcon, ShieldExclamationIcon } from "@heroicons/react/outline";

export default function AnswerReact() {
   return (
      <div className="flex gap-x-4 mt-6 cursor-pointer items-center">
         <div className="flex gap-x-1 border-2 text-green-700 pl-2 pr-3 py-1 border-green-700 rounded-full hover:bg-green-700 hover:text-white">
            <ArrowSmUpIcon className="h-6" />
            <span>0</span>
         </div>
         <div className="flex gap-x-1 border-2 text-red-700 pl-2 pr-3 py-1 border-red-700 rounded-full hover:bg-red-700 hover:text-white">
            <ArrowSmDownIcon className="h-6" />
            <span>0</span>
         </div>
         <div className="ml-auto text-gray-500 cursor-pointer flex items-center pr-4  group">
            <div className="w-9 h-9 rounded-full group-hover:bg-gray-500/10 flex">
               <ShieldExclamationIcon className="h-6 m-auto" />
            </div>
            <span className="hidden xl:flex font-medium">Laporkan Konten ini</span>
         </div>
      </div>
   );
}
