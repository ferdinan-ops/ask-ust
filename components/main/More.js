import {
  BookmarkIcon,
  FlagIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Router from "next/router";

function More({
  postId,
  setEdit,
  isAnswer,
  isUserHave,
  answerList,
  setContent,
  deleteHandler,
  isDetailPost,
}) {
  const editHandler = (id, e) => {
    if (!isAnswer) {
      Router.push(`/posts/update/${postId}`);
    } else {
      setContent(answerList.content);
      setEdit(answerList);
    }
  };

  return (
    <ul className="absolute z-10 top-8 text-font flex flex-col bg-white shadow-md right-0">
      {isUserHave && (
        <>
          <li
            className="flex items-center gap-x-3 hover:bg-slate-100 py-2 px-5 rounded-md"
            onClick={editHandler}
          >
            <PencilAltIcon className="h-5" /> Ubah
          </li>
          {!isDetailPost && (
            <li
              className="flex items-center gap-x-3 hover:bg-slate-100 py-2 px-5 rounded-md"
              onClick={
                !isAnswer
                  ? deleteHandler.bind(this, postId)
                  : deleteHandler.bind(this, answerList.id)
              }
            >
              <TrashIcon className="h-5" /> Hapus
            </li>
          )}
        </>
      )}

      {!isUserHave && (
        <li className="flex items-center gap-x-3 hover:bg-slate-100 py-2 px-5 rounded-md">
          <FlagIcon className="h-5" /> Laporkan
        </li>
      )}
      {!isAnswer && (
        <>
          <li className="flex items-center gap-x-3 hover:bg-slate-100 py-2 px-5 rounded-md">
            <BookmarkIcon className="h-5" /> Simpan
          </li>
        </>
      )}
    </ul>
  );
}

export default More;
