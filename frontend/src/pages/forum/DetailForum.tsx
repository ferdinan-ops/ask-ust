import { Button } from '@/components/ui/button'
import { useTitle } from '@/hooks'
import {
  // HiOutlineArrowLeftOnRectangle,
  HiOutlineArrowRightOnRectangle,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineUserGroup
} from 'react-icons/hi2'
import { LiaDoorOpenSolid } from 'react-icons/lia'
import { useNavigate, useParams } from 'react-router-dom'

export default function DetailForum() {
  const { slug } = useParams<{ slug: string }>()
  useTitle(`Forum - ${slug}`)

  const navigate = useNavigate()

  return (
    <section className="mx-auto md:w-10/12 xl:w-8/12">
      <h1 className="mb-4 text-2xl font-bold md:mb-5 md:text-3xl">Teknologi</h1>
      <p className="text-sm font-medium leading-relaxed md:text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis deleniti, sint enim veniam voluptatem
        exercitationem ex fugiat a reprehenderit illum dicta molestiae doloremque similique neque nihil, iste, pariatur
        sequi libero?
      </p>
      <div className="mt-5 flex flex-col gap-2 border-b pb-7 dark:border-white/10 md:mt-6">
        <div className="flex items-center gap-3">
          <HiOutlineUserGroup className="text-[22px] md:text-2xl" />
          <p className="text-[13px] font-medium md:text-[15px]">30 anggota</p>
        </div>
        <div className="flex items-center gap-3">
          <HiOutlineChatBubbleBottomCenterText className="text-[22px] md:text-2xl" />
          <p className="text-[13px] font-medium md:text-[15px]">100+ pesan</p>
        </div>
      </div>
      <h1 className="my-5 text-lg font-semibold">Aksi</h1>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {/* <Button className="gap-2 border-zinc-300" onClick={() => navigate(`/forum/${slug}/content`)}>
          <HiOutlineArrowLeftOnRectangle className="text-lg" />
          <span>Bergabung dengan forum</span>
        </Button> */}
        <Button variant="outline" className="gap-2 border-zinc-300" onClick={() => navigate(`/forum/${slug}/content`)}>
          <LiaDoorOpenSolid className="text-lg" />
          <span>Masuk ke Forum</span>
        </Button>
        <Button variant="destructive" className="gap-2">
          <HiOutlineArrowRightOnRectangle className="text-lg" />
          <span>Tinggalkan Forum</span>
        </Button>
        {/* <Button variant="destructive" className="gap-2">
          <HiTrash className="text-lg" />
          <span>Hapus Forum</span>
        </Button> */}
      </div>
    </section>
  )
}
