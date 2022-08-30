import TextEditor from "./TextEditor";

export default function Input() {
  return (
    <form className="text-font p-5">
      {/* title */}
      <div className="flex flex-col">
        <label htmlFor="judul" className="label">
          Judul
        </label>
        <input
          placeholder="Masukkan Judul Pertanyaan Anda..."
          className="input-create"
          id="judul"
        />
      </div>

      {/* editor */}
      <div className="flex flex-col">
        <label className="label mt-[30px]">Deskripsi</label>
        {/* <textarea className="input-create" /> */}
        <TextEditor />
      </div>

      {/* Submit and cancel */}
      <div className="flex items-center mt-[30px] justify-end gap-x-3">
        <button className="hover:bg-slate-300 bg-slate-200 text-slate-500 button-create">
          Batal
        </button>
        <button
          className="bg-primary text-white hover:bg-[#C21D28] button-create"
          type="submit"
        >
          Kirim Pertanyaan Anda
        </button>
      </div>
    </form>
  );
}
