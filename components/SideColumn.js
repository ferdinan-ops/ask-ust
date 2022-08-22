function SideColumn() {
   return (
      <div className='w-3/12'>
         {/* <input placeholder="Cari Diskusi" className="text-base bg-search bg-transparent placeholder:text-[#5B7083]" /> */}
         <input className="bg-[#EBEEF0] py-2 px-4 w-full rounded-full bg-search pl-12 border-none outline-none placeholder:text-[#5B7083]" placeholder="Search..." />
         <div className="bg-[#F7F9FA] my-4 text-[#0F1419] py-3 px-4 rounded-lg min-h-[300px]">
            <h2 className="font-bold text-xl">Top Users</h2>
            <ul>
               <li><a href="#"></a></li>
            </ul>
         </div>
         <div className="bg-[#F7F9FA] my-4 text-[#0F1419] py-3 px-4 rounded-lg min-h-[250px]">
            <h2 className="font-bold text-xl">Kategori</h2>
            <ul>
               <li><a href="#"></a></li>
            </ul>
         </div>
      </div>
   );
}

export default SideColumn;