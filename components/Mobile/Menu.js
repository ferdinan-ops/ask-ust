import MenuLink from "./MenuLink";

export default function Menu() {
  return (
    <section className="h-screen w-2/12 p-3">
      <div className="flex items-center gap-4">
        <img src="/images/logo/logo.svg" alt="" className="w-10" />
        <span className="text-2xl font-bold">UDF</span>
      </div>
      <MenuLink />
      <button className="mt-10 w-full rounded-full bg-primary py-2 font-bold text-white">
        Buat Pertanyaan
      </button>
    </section>
  );
}
