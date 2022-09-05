export default function Layout({ children }) {
  return (
    <div className="w-full -z-20 absolute left-0 right-0 border-r-2 border-l-2 border-[#EBEEF0]">
      {children}
    </div>
  );
}
