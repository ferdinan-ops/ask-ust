export default function Main({ children, title }) {
  return (
    <div className="max-w-2xl flex-grow border-l-2 border-r-2 border-[#EBEEF0] text-white sm:ml-[73px] xl:ml-[370px]">
      <div className="sticky top-0 bg-white flex items-center border-b-2 border-[#EBEEF0] p-3 text-font sm:justify-between">
        <h2 className="text-lg font-bold sm:text-xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}
