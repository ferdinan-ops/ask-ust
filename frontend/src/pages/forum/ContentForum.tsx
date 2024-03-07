import { useParams } from 'react-router-dom'
import { HiHashtag } from 'react-icons/hi2'

import { MediaMenu, MemberCard, Messages } from '@/components/organism'
import { Loading, SearchMember } from '@/components/atoms'

import { useGetDetailForum } from '@/store/server/useForum'
import { MemberType } from '@/lib/types/member.type'
import { useTitle } from '@/hooks'

export default function ContentForum() {
  const { slug } = useParams<{ slug: string }>()
  const { data: forum, isLoading } = useGetDetailForum(slug as string)
  useTitle(`Forum - ${forum?.title}`)

  if (isLoading) return <Loading />

  return (
    <section className="flex flex-col justify-between gap-7 lg:flex-row lg:p-7">
      <section className="rounded-lg border-[#E9E9E9] dark:border-white/10 dark:bg-primary lg:max-h-[calc(100vh-68px-56px)] lg:min-h-[calc(100vh-68px-56px)] lg:w-9/12 lg:border">
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
          <MediaMenu forumId={slug as string} invitedCode={forum?.invite_code as string} />
        </div>
        <Messages forumId={slug as string} />
      </section>
      <section className="hidden max-h-[calc(100vh-68px-56px)] min-h-[calc(100vh-68px-56px)] w-3/12 overflow-hidden rounded-lg border border-[#E9E9E9] dark:border-white/10 lg:block">
        <article className="flex flex-col">
          <div className="flex items-center justify-between border-b border-[#E9E9E9] p-4 dark:border-white/10">
            <h4 className="text-sm font-semibold">{forum?._count.members} Anggota</h4>
            <SearchMember
              forumId={slug as string}
              admin={forum?.admin as MemberType}
              moderators={forum?.moderators as MemberType[]}
            />
          </div>
          <div className="scroll-custom flex max-h-[calc(100vh-68px-56px-67px)] min-h-[calc(100vh-68px-56px-67px)] flex-col gap-4 overflow-y-auto p-4">
            {forum?.members.map((member, i) => (
              <MemberCard
                key={i}
                member={member}
                forumId={forum.id}
                moderators={forum.moderators}
                admin={forum.admin as MemberType}
              />
            ))}
          </div>
        </article>
      </section>
    </section>
  )
}
