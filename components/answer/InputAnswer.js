import TinyEditor from "@components/create/TinyEditor";
import LoadingBtn from "@components/loading/LoadingBtn";
import React from "react";

function InputAnswer({ content, setContent, commentHandler, isLoading }) {
  return (
    <form className="px-6 py-9" onSubmit={commentHandler}>
      <h1 className="text-xl text-font font-semibold mb-10">
        Ayo Berikan Jawabanmu 😁
      </h1>
      <TinyEditor content={content} setContent={setContent} />
      <button
        className="bg-primary text-white hover:bg-[#C21D28] button-create mt-10 ml-auto"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <LoadingBtn /> : "Kirim Jawaban"}
      </button>
    </form>
  );
}

export default InputAnswer;
