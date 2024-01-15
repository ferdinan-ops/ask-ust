import { HiOutlineUser } from 'react-icons/hi2'

export default function Rightbar() {
  return (
    <aside className="flex h-screen w-72 flex-col gap-6 border-l border-[#E9E9E9] p-5 text-primary dark:border-white/10 dark:bg-primary dark:text-white">
      <article className="flex flex-col gap-3">
        <h4 className="px-1 py-2 text-sm font-semibold">Notifikasi</h4>
        <div className="flex flex-col gap-4">
          {[...Array(6)].map((_, i) => (
            <div className="flex items-start gap-2" key={i}>
              <div className="flex h-6 w-7 rounded-lg bg-zinc-100 dark:bg-zinc-700">
                <HiOutlineUser className="m-auto" />
              </div>
              <div className="flex flex-col">
                <p className="truncate-1 text-sm font-medium">You have a bug that needs to be fixed.</p>
                <span className="text-xs font-medium text-zinc-400">Baru saja</span>
              </div>
            </div>
          ))}
        </div>
      </article>
      <article className="flex flex-col gap-3">
        <h4 className="px-1 py-2 text-sm font-semibold">Aktivitas</h4>
        <div className="flex flex-col gap-4">
          {[...Array(6)].map((_, i) => (
            <div className="flex items-start gap-2" key={i}>
              <img src="https://source.unsplash.com/random?people" alt="profile" className="h-6 w-6 rounded-lg" />
              <div className="flex flex-col">
                <p className="truncate-1 text-sm font-medium">You have a bug that needs to be fixed.</p>
                <span className="text-xs font-medium text-zinc-400">Baru saja</span>
              </div>
            </div>
          ))}
        </div>
      </article>
    </aside>
  )
}
