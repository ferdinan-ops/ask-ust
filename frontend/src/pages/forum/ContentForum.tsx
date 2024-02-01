import {
  HiHashtag,
  HiOutlinePaperAirplane,
  HiOutlinePhone,
  HiOutlineShare,
  HiOutlineVideoCamera
} from 'react-icons/hi2'
import { useParams } from 'react-router-dom'

import { ReportMember, UploadFile } from '@/components/organism'
import { SearchMember } from '@/components/atoms'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useGetDetailForum } from '@/store/server/useForum'
import { useTitle } from '@/hooks'

export default function ContentForum() {
  const { slug } = useParams<{ slug: string }>()
  const { data: forum, isLoading } = useGetDetailForum(slug as string)

  useTitle(`Forum - ${forum?.title}`)

  if (isLoading) {
    return <p>loading...</p>
  }

  return (
    <section className="flex flex-col justify-between gap-7 xl:flex-row xl:p-7">
      <section className="rounded-lg border-[#E9E9E9] dark:border-white/10 dark:bg-primary xl:max-h-[calc(100vh-68px-56px)] xl:min-h-[calc(100vh-68px-56px)] xl:w-9/12 xl:border">
        <div className="flex items-center justify-between gap-4 border-b p-2 dark:border-white/10 md:p-4">
          <article className="flex items-start gap-3">
            <div className="flex h-8 w-8 rounded-full border-none bg-zinc-100 dark:bg-zinc-800 md:h-10 md:w-10">
              <HiHashtag className="m-auto text-lg md:text-xl" />
            </div>
            <div className="flex flex-col">
              <p className="text-base font-bold md:text-lg">{forum?.title}</p>
              <p className="text-[11px] font-medium text-zinc-600 md:text-[13px]">
                {forum?._count.messages === 0
                  ? 'Belum ada pesan yang masuk'
                  : `${forum?._count.messages} Pesan telah masuk`}
              </p>
            </div>
          </article>
          <article className="flex items-center gap-0 md:gap-2">
            <Button variant="outline" size="icon" className="rounded-full border-none dark:bg-primary">
              <HiOutlineVideoCamera className="text-lg md:text-xl" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-none dark:bg-primary">
              <HiOutlinePhone className="text-lg md:text-xl" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-none dark:bg-primary">
              <HiOutlineShare className="text-lg md:text-xl" />
            </Button>
          </article>
        </div>
        <div className="flex max-h-[calc(100vh-68px-57px)] flex-col xl:max-h-[calc(100vh-68px-56px-80px)] xl:min-h-[calc(100vh-68px-56px-80px)]">
          <article className="scroll-custom flex flex-col gap-4 overflow-y-scroll p-4 md:gap-5 md:px-5 md:py-7">
            <div className="flex items-start gap-2">
              <img
                src="https://source.unsplash.com/random?man"
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
              <div className="flex flex-col gap-1 rounded-b-2xl rounded-r-2xl bg-[#E5ECF6] px-3 pb-3 pt-2">
                <div className="flex items-center gap-2">
                  <p className="truncate-1 text-sm font-bold text-primary">John Doe</p>
                  <p className="text-primary/60">&bull;</p>
                  <p className="text-xs font-medium text-primary/60">21 Agustus 2023, 12:36</p>
                </div>
                <span className="max-w-[calc(100vw-32px-28px-8px-65px)] text-[15px] font-medium leading-relaxed text-primary/90 md:max-w-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod sit, libero temporibus minima labore
                  reiciendis deleniti placeat? <span className="text-xs text-primary/60">(diubah)</span>
                </span>
              </div>
            </div>
            <div className="flex flex-row-reverse items-start justify-start gap-2">
              <img
                src="https://source.unsplash.com/random?people"
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
              <div className="flex flex-col gap-1 rounded-b-2xl rounded-l-2xl bg-[#95A4FC] px-3 pb-3 pt-2">
                <div className="flex items-center gap-2">
                  <p className="truncate-1 text-sm font-bold text-white">You</p>
                  <p className="text-white/60">&bull;</p>
                  <p className="text-xs font-medium text-white/70">21 Agustus 2023, 12:36</p>
                </div>
                <span className="max-w-[calc(100vw-32px-28px-8px-65px)] text-[15px] font-medium leading-relaxed text-white/90 md:max-w-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <img
                src="https://source.unsplash.com/random?woman"
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
              <div className="flex w-fit flex-col gap-1 rounded-b-2xl rounded-r-2xl bg-[#E5ECF6] px-3 pb-3 pt-2">
                <div className="flex items-center gap-2">
                  <p className="truncate-1 text-sm font-bold text-primary">Mercy Round</p>
                  <p className="text-primary/60">&bull;</p>
                  <p className="text-xs font-medium text-primary/60">21 Agustus 2023, 13:40</p>
                </div>
                <span className="max-w-[calc(100vw-32px-28px-8px-65px)] text-[15px] font-medium leading-relaxed text-primary/90 md:max-w-lg">
                  <span className="italic text-primary/60">Pesan ini telah dihapus</span>
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <img
                src="https://source.unsplash.com/random?man"
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
              <div className="flex w-fit flex-col gap-1 rounded-b-2xl rounded-r-2xl bg-[#E5ECF6] px-3 pb-3 pt-2">
                <div className="flex items-center gap-2">
                  <p className="truncate-1 text-sm font-bold text-primary">John Doe</p>
                  <p className="text-primary/60">&bull;</p>
                  <p className="text-xs font-medium text-primary/60">21 Agustus 2023, 13:50</p>
                </div>
                <span className="max-w-[calc(100vw-32px-28px-8px-65px)] text-[15px] font-medium leading-relaxed text-primary/90 md:max-w-lg">
                  Blanditiis, similique temporibus dolorum ex optio quod enim voluptates officiis, delectus fugit illum
                  suscipit iusto iste, est cumque amet quam praesentium molestias! Nesciunt totam accusantium sequi quis
                  dolore quibusdam perferendis soluta a beatae consequatur unde non, in minima maiores? Fugiat nulla
                  ipsa, amet ex tenetur, nihil tempora nam molestiae quam ad esse accusantium ut culpa!
                </span>
              </div>
            </div>
          </article>
          <article className="px-4 pb-4 pt-1 md:px-5 md:pb-7">
            <div className="sticky bottom-0 mt-auto flex w-full items-center justify-between gap-2 self-end rounded-3xl bg-[#F7F9FB] px-3 py-2 dark:bg-white/5 md:gap-4 md:px-5 md:py-[14px]">
              <div>
                <UploadFile />
              </div>
              <Input
                className="w-full border-none bg-transparent p-0 outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
                placeholder="Ketik pesan"
              />
              <div>
                <Button variant="messageIcon" size="icon">
                  <HiOutlinePaperAirplane className="text-lg md:text-xl" />
                </Button>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className="hidden max-h-[calc(100vh-68px-56px)] min-h-[calc(100vh-68px-56px)] w-3/12 overflow-hidden rounded-lg border border-[#E9E9E9] dark:border-white/10 xl:block">
        <article className="flex flex-col">
          <div className="flex items-center justify-between border-b border-[#E9E9E9] p-4 dark:border-white/10">
            <h4 className="text-sm font-semibold">{forum?._count.members} Anggota Forum</h4>
            <SearchMember forumId={slug as string} />
          </div>
          <div className="scroll-custom flex max-h-[calc(100vh-68px-56px-67px)] min-h-[calc(100vh-68px-56px-67px)] flex-col gap-4 overflow-y-scroll p-4">
            {forum?.members.map((member, i) => (
              <div className="flex items-center justify-between" key={i}>
                <div className="flex items-start gap-3">
                  <img
                    src={member.user.photo || 'https://github.com/shadcn.png'}
                    alt="profile"
                    className="h-6 w-6 rounded-lg"
                  />
                  <div className="flex flex-col">
                    <p className="truncate-1 text-sm font-medium">{member.user.fullname}</p>
                    <span className="text-xs font-medium text-zinc-400 dark:text-white/40">
                      @{member.user.username}
                    </span>
                  </div>
                </div>
                <div>
                  <ReportMember />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </section>
  )
}
