import TinyEditor from "@components/create/TinyEditor";
import LoadingBtn from "@components/loading/LoadingBtn";
import React from "react";

function InputAnswer({
  content,
  setContent,
  answerHandler,
  isLoading,
  edit,
  setEdit,
  cancelHandler
}) {
  return (
    <form className="px-6 py-9">
      <h1 className="text-xl text-font font-semibold mb-10">
        Ayo Berikan Jawabanmu 😁
      </h1>
      <TinyEditor content={content} setContent={setContent} />
      <div className="flex justify-end mt-10 gap-x-4">
        <button
          className="hover:bg-slate-300 bg-slate-200 text-slate-500 button-create"
          onClick={cancelHandler}
        >
          Batal
        </button>
        <button
          className="bg-primary text-white hover:bg-[#C21D28] button-create"
          disabled={isLoading}
          onClick={answerHandler}
        >
          {isLoading ? (
            <LoadingBtn />
          ) : edit ? (
            "Simpan Perubahan"
          ) : (
            "Kirim Jawaban"
          )}
        </button>
      </div>
    </form>
  );
}

export default InputAnswer;
