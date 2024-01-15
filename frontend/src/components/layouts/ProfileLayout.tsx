import { HiOutlineCog6Tooth } from 'react-icons/hi2'
import { Button } from '../ui/button'
import { Outlet, useNavigate } from 'react-router-dom'

export default function ProfileLayout() {
  const navigate = useNavigate()
  return (
    <>
      <div className="h-28 w-full bg-[url('@/assets/images/profile-bg.webp')] bg-cover xl:h-48" />
      <div className="relative mx-auto flex flex-col gap-5 border-b px-4 pb-5 dark:border-white/10 md:px-6 xl:w-10/12 xl:px-7">
        <Button
          variant="outline"
          className="absolute right-4 top-4 gap-3 rounded-full md:right-6 md:top-6 xl:right-7 xl:top-7"
          onClick={() => navigate('/me/edit')}
        >
          <HiOutlineCog6Tooth className="text-lg" />
          <p className="hidden md:flex">Pengaturan</p>
        </Button>
        <div className="-mt-12 h-24 w-24 overflow-hidden rounded-full border-4 border-white dark:border-white/50 xl:-mt-[72px] xl:h-36 xl:w-36">
          <img
            src="https://ui-avatars.com/api/?background=E8E8E9&color=363E4D&bold=true&name=Ferdinan"
            alt="profile"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xl font-bold text-primary dark:text-white md:text-2xl">Ferdinan Imanuel Tumanggor</p>
          <p className="text-sm font-medium text-zinc-400 md:text-base">@ferdinan-ops</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold md:text-sm">
          <p>20 forum yang dibuat</p>
          <p>&bull;</p>
          <p>20 forum yang diikuti</p>
        </div>
      </div>
      <section className="mx-auto p-4 md:p-6 xl:w-10/12 xl:p-7">
        <Outlet />
      </section>
    </>
  )
}
