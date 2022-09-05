export default function Logo() {
  return (
    <div className="flex items-center gap-x-3">
      <div className="hoverLogo flex h-14 w-14 items-center justify-center p-0 xl:ml-24 ">
        <img src="/logo-2.svg" alt="" width={40} height={40} />
      </div>
      <span className="font-bold text-xl hidden xl:flex">UDF</span>
    </div>
  );
}
