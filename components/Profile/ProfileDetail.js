import { CalendarIcon } from "@heroicons/react/outline";
import { formatDate } from "utils/formatDate";

export default function ProfileDetail({ user, questions, bio, isUserHave }) {
  const tag = user.username.split(" ").join("").toLocaleLowerCase();

  return (
    <div className="pt-3 pb-6 px-4 border-b-2 text-font">
      <div className="h-20">
        {isUserHave && (
          <button className="block ml-auto font-bold rounded-full border-2 py-2 px-4 text-sm hover:bg-gray-100">
            Edit Profile
          </button>
        )}
      </div>
      <div className="text-[15px]">
        <h1 className="font-bold text-xl">{user.username}</h1>
        <p className="text-gray-500 mb-3 font-medium -mt-1">@{tag}</p>
        {bio && <p className="font-medium">{bio}</p>}
        <p className="text-gray-500 font-medium flex items-center gap-2">
          <CalendarIcon className="h-5" />
          Bergabung {formatDate(user.created_at)}
        </p>
      </div>

      {/* Profile score */}
      <div className="flex font-bold gap-4 mt-3 text-sm text-font">
        <p>
          0 <span className="text-gray-500 font-medium">Poin</span>
        </p>
        <p>
          {questions}{" "}
          <span className="text-gray-500 font-medium">Pertanyaan</span>
        </p>
      </div>
    </div>
  );
}
