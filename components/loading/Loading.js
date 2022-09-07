function Loading() {
  return (
    <div className="fixed bg-white top-0 bottom-0 left-0 right-0 transition">
      <div className="flex min-h-screen ">
        <div className="m-auto relative">
          <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-full border-8 border-t-primary border-l-primary border-slate-300 mx-auto animate-spin"></div>
          <img
            src="/logo-2.svg"
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-20 lg:h-20"
          />
        </div>
      </div>
    </div>
  );
}

export default Loading;
