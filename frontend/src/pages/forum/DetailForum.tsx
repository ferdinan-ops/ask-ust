import {
  HiOutlineArrowLeftOnRectangle,
  HiOutlineArrowRightOnRectangle,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlinePencilSquare,
  HiOutlineUserGroup,
  HiTrash
} from 'react-icons/hi2'
import * as React from 'react'
import { LiaDoorOpenSolid } from 'react-icons/lia'
import { useNavigate, useParams } from 'react-router-dom'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { useTitle } from '@/hooks'
import { useGetMe } from '@/store/server/useUser'
import { useDeleteForum, useGetDetailForum, useJoinForum, useLeaveForum } from '@/store/server/useForum'

export default function DetailForum() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()

  const { data: user, isLoading: isLoadingUser } = useGetMe()
  const { data: forum, isLoading } = useGetDetailForum(slug as string)
  const { mutate: joinForum, isLoading: isLoadingJoin } = useJoinForum()
  const { mutate: leaveForum, isLoading: isLoadingLeave } = useLeaveForum()
  const { mutate: deleteForum, isLoading: isLoadingDelete } = useDeleteForum()

  useTitle(`Forum - ${forum?.title}`)

  const handleDelete = () => {
    deleteForum(slug as string, {
      onSuccess: () => {
        navigate('/forums')
      }
    })
  }

  const handleJoin = () => {
    joinForum(slug as string, {
      onSuccess: () => {
        navigate(`/forum/${slug}/content`)
      }
    })
  }

  const handleLeave = () => {
    leaveForum(slug as string)
  }

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
        {forum?.members.filter((member) => member.user_id === user?.id).length !== 0 && (
          <Button className="gap-2" onClick={() => navigate(`/forum/${slug}/content`)}>
            <LiaDoorOpenSolid className="text-lg" />
            <span>Masuk ke Forum</span>
          </Button>
        )}
        {user?.id === forum?.user_id ? (
          <React.Fragment>
            <Button variant="outline" className="gap-2 border-zinc-300" onClick={() => navigate(`/forum/edit/${slug}`)}>
              <HiOutlinePencilSquare className="text-lg" />
              <span>Update Forum</span>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="gap-2" variant="destructive" loading={isLoadingDelete}>
                  <HiTrash className="text-lg" />
                  <span>Hapus Forum</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Anda yakin untuk menghapus forum?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus forum ini secara permanen dari
                    sistem.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="text-xs">Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-500 text-xs hover:bg-red-600 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90"
                  >
                    Ya, Hapus forum
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {forum?.members.filter((member) => member.user_id === user?.id).length !== 0 ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="gap-2" loading={isLoadingLeave}>
                    <HiOutlineArrowRightOnRectangle className="text-lg" />
                    <span>Tinggalkan Forum</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Anda yakin keluar dari forum?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini tidak dapat dibatalkan. Tindakan ini akan mengeluarkan Anda secara permanen dari
                      forum ini.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-xs">Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLeave}
                      className="bg-red-500 text-xs hover:bg-red-600 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90"
                    >
                      Ya, Keluar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button className="gap-2 border-zinc-300" loading={isLoadingJoin} onClick={handleJoin}>
                <HiOutlineArrowLeftOnRectangle className="text-lg" />
                <span>Bergabung dengan forum</span>
              </Button>
            )}
          </React.Fragment>
        )}
      </div>
    </section>
  )
}
