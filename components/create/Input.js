import LoadingBtn from "@components/loading/LoadingBtn";
import TinyEditor from "./TinyEditor";

export default function Input({
  setContent,
  content,
  setTitle,
  title,
  createHandler,
  isLoading,
}) {
  return (
    <form className="text-font p-5" onSubmit={createHandler}>
      {/* title */}
      <div className="flex flex-col">
        <label htmlFor="judul" className="label">
          Judul
        </label>
        <input
          placeholder="Masukkan Judul Pertanyaan Anda..."
          className="input-create"
          id="judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* editor */}
      <div className="flex flex-col gap-y-[10px]">
        <label className="label mt-[30px]">Deskripsi</label>
        <TinyEditor setContent={setContent} content={content} />
      </div>

      {/* Submit and cancel */}
      <div className="flex items-center mt-[30px] justify-end gap-x-3">
        <button className="hover:bg-slate-300 bg-slate-200 text-slate-500 button-create">
          Batal
        </button>
        <button
          className="bg-primary text-white hover:bg-[#C21D28] button-create"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <LoadingBtn /> : "Kirim Pertanyaan Anda"}
        </button>
      </div>
    </form>
  );
}
