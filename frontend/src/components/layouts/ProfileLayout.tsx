import { Outlet, useNavigate } from 'react-router-dom'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'

import { Button } from '../ui/button'

import { UploadPhoto } from '../organism'
import { UserType } from '@/lib/types/user.type'
import { useGetMe } from '@/store/server/useUser'

export default function ProfileLayout() {
  const navigate = useNavigate()
  const { data: user, isLoading } = useGetMe()

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <div className="h-28 w-full bg-[url('@/assets/images/profile-bg.webp')] bg-cover lg:h-48" />
      <div className="relative mx-auto flex flex-col gap-5 border-b px-4 pb-5 dark:border-white/10 md:px-6 lg:w-10/12 lg:px-7">
        <Button
          variant="outline"
          className="absolute right-4 top-4 gap-3 rounded-full md:right-6 md:top-6 lg:right-7 lg:top-7"
          onClick={() => navigate('/me/edit')}
        >
          <HiOutlineCog6Tooth className="text-lg" />
          <p className="hidden md:flex">Pengaturan</p>
        </Button>
        <UploadPhoto user={user as UserType} />
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
      <section className="mx-auto p-4 md:p-6 lg:w-10/12 lg:p-7">
        <Outlet />
      </section>
    </>
  )
}
