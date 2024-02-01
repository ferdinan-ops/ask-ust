import { Outlet, useNavigate } from 'react-router-dom'
import { HiCamera, HiOutlineCog6Tooth } from 'react-icons/hi2'

import { useGetMe } from '@/store/server/useUser'
import { Button } from '../ui/button'

export default function ProfileLayout() {
  const navigate = useNavigate()
  const { data: user, isLoading } = useGetMe()

  if (isLoading) return <p>Loading...</p>

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
        <div className="group relative -mt-12 h-24 w-24 cursor-pointer overflow-hidden rounded-full border-4 border-white dark:border-white/50 xl:-mt-[72px] xl:h-36 xl:w-36">
          <div className="absolute inset-0 z-20 flex bg-primary/60 opacity-0 transition-opacity group-hover:opacity-100">
            <HiCamera className="m-auto text-4xl text-white" />
          </div>
          <img
            src={user?.photo || 'https://github.com/shadcn.png'}
            alt={user?.fullname}
            className="relative z-10 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xl font-bold text-primary dark:text-white md:text-2xl">{user?.fullname}</p>
          <p className="text-sm font-medium text-zinc-400 md:text-base">@{user?.username}</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold md:text-sm">
          <p>{user?._count.forums} forum yang dibuat</p>
          <p>&bull;</p>
          <p>{user?._count.joined_forum} forum yang diikuti</p>
        </div>
      </div>
      <section className="mx-auto p-4 md:p-6 xl:w-10/12 xl:p-7">
        <Outlet />
      </section>
    </>
  )
}
