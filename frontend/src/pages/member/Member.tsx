import { SearchMember, ServerImage, Title } from '@/components/atoms'
import { MemberSettings } from '@/components/organism'
import { useTitle } from '@/hooks'
import { titleConfig } from '@/lib/config'
import { MemberType } from '@/lib/types/member.type'
import { useGetDetailForum } from '@/store/server/useForum'
import { HiCheckBadge } from 'react-icons/hi2'
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
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3 dark:border-white/10" key={i}>
            <div className="flex items-start gap-3">
              <div className="relative">
                <ServerImage src={member.user.photo} alt={member.user.fullname} className="h-6 w-6 rounded-lg" />
              </div>
              <div className="flex flex-col">
                <p className="flex items-center gap-1 text-sm font-medium">
                  <span className="truncate-1">{member.user.fullname}</span>
                  {member.role === 'ADMIN' && <HiCheckBadge className="text-blue-500" />}
                  {member.role === 'MODERATOR' && <HiCheckBadge className="text-green-500" />}
                </p>
                <span className="text-xs font-medium text-zinc-400 dark:text-white/40">@{member.user.username}</span>
              </div>
            </div>

            <MemberSettings
              moderators={forum.moderators}
              admin={forum.admin as MemberType}
              forumId={slug as string}
              memberId={member.id}
              memberUserId={member.user_id}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
