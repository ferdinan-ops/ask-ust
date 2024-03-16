import { useParams } from 'react-router-dom'
import { HiHashtag } from 'react-icons/hi2'

import { MediaMenu, MemberCard, Messages } from '@/components/organism'
import { ContentBox, Loading, SearchMember } from '@/components/atoms'

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
      <ContentBox className="rounded-lg border-[#E9E9E9] dark:border-white/10 dark:bg-primary lg:w-9/12 lg:border">
        <ContentBox.Header>
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
        </ContentBox.Header>
        <Messages forumId={slug as string} />
      </ContentBox>

      <ContentBox className="hidden w-3/12 overflow-hidden rounded-lg border border-[#E9E9E9] dark:border-white/10 lg:block">
        <article className="flex flex-col">
          <ContentBox.Header>
            <h4 className="text-sm font-semibold">{forum?._count.members} Anggota</h4>
            <SearchMember
              forumId={slug as string}
              admin={forum?.admin as MemberType}
              moderators={forum?.moderators as MemberType[]}
            />
          </ContentBox.Header>
          <ContentBox.Scroll className="gap-4">
            {forum?.members.map((member, i) => (
              <MemberCard
                key={i}
                member={member}
                forumId={forum.id}
                moderators={forum.moderators}
                admin={forum.admin as MemberType}
              />
            ))}
          </ContentBox.Scroll>
        </article>
      </ContentBox>
    </section>
  )
}
