import { Button } from '@/components/ui/button'
import { useTitle } from '@/hooks'
import { useGetDetailForum } from '@/store/server/useForum'
import { useGetMe } from '@/store/server/useUser'
import * as React from 'react'
import {
  HiOutlineArrowLeftOnRectangle,
  HiOutlineArrowRightOnRectangle,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlinePencilSquare,
  HiOutlineUserGroup,
  HiTrash
} from 'react-icons/hi2'
import { LiaDoorOpenSolid } from 'react-icons/lia'
import { useNavigate, useParams } from 'react-router-dom'

export default function DetailForum() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()

  const { data: forum, isLoading } = useGetDetailForum(slug as string)
  const { data: user, isLoading: isLoadingUser } = useGetMe()
  useTitle(`Forum - ${forum?.title}`)

  if (isLoading || isLoadingUser) {
    return <p>loading....</p>
  }

  return (
    <section className="mx-auto md:w-10/12 xl:w-8/12">
      <h1 className="mb-4 text-2xl font-bold md:mb-5 md:text-3xl">{forum?.title}</h1>
      <p className="text-sm font-medium leading-relaxed text-zinc-700 dark:text-zinc-400 md:text-base">
        {forum?.description}
      </p>
      <div className="mt-5 flex flex-col gap-2 border-b pb-7 dark:border-white/10 md:mt-6">
        <div className="flex items-center gap-3">
          <HiOutlineUserGroup className="text-[22px] md:text-2xl" />
          <p className="text-[13px] font-medium md:text-[15px]">{forum?._count.members} anggota</p>
        </div>
        <div className="flex items-center gap-3">
          <HiOutlineChatBubbleBottomCenterText className="text-[22px] md:text-2xl" />
          <p className="text-[13px] font-medium md:text-[15px]">{forum?._count.messages} pesan</p>
        </div>
      </div>
      <h1 className="my-5 text-lg font-semibold">Aksi</h1>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Button className="gap-2" onClick={() => navigate(`/forum/${slug}/content`)}>
          <LiaDoorOpenSolid className="text-lg" />
          <span>Masuk ke Forum</span>
        </Button>
        {user?.id === forum?.user_id ? (
          <React.Fragment>
            <Button variant="outline" className="gap-2 border-zinc-300" onClick={() => navigate(`/forum/edit/${slug}`)}>
              <HiOutlinePencilSquare className="text-lg" />
              <span>Update Forum</span>
            </Button>
            <Button variant="destructive" className="gap-2">
              <HiTrash className="text-lg" />
              <span>Hapus Forum</span>
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button className="gap-2 border-zinc-300" onClick={() => navigate(`/forum/${slug}/content`)}>
              <HiOutlineArrowLeftOnRectangle className="text-lg" />
              <span>Bergabung dengan forum</span>
            </Button>
            <Button variant="destructive" className="gap-2">
              <HiOutlineArrowRightOnRectangle className="text-lg" />
              <span>Tinggalkan Forum</span>
            </Button>
          </React.Fragment>
        )}
      </div>
    </section>
  )
}
