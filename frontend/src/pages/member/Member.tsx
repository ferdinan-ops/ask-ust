import { SearchMember, Title } from '@/components/atoms'
import { MemberCard } from '@/components/organism'
import { useTitle } from '@/hooks'
import { titleConfig } from '@/lib/config'
import { MemberType } from '@/lib/types/member.type'
import { useGetDetailForum } from '@/store/server/useForum'
import { useParams } from 'react-router-dom'

const titleConf = titleConfig.member

export default function Member() {
  useTitle('Anggota Forum')
  const { slug } = useParams<{ slug: string }>()
  const { data: forum, isLoading } = useGetDetailForum(slug as string)

  if (isLoading) return <p>Loading...</p>

  return (
    <section className="mx-auto w-full md:w-8/12">
      <Title heading={`${titleConf.heading} ${forum?.title}`} desc={titleConf.desc} />

      <div className="mt-8 flex items-center justify-between border-b border-[#E9E9E9] pb-4 dark:border-white/10">
        <h4 className="text-sm font-semibold">Total {forum?._count.members} Anggota</h4>
        <SearchMember
          forumId={slug as string}
          admin={forum?.admin as MemberType}
          moderators={forum?.moderators as MemberType[]}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {forum?.members?.map((member, i) => (
          <MemberCard
            key={i}
            member={member}
            forumId={forum.id}
            admin={forum.admin as MemberType}
            moderators={forum.moderators}
            className="border-b border-zinc-200 pb-3 dark:border-white/10"
          />
        ))}
      </div>
    </section>
  )
}
