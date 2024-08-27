import { BackButton, Loading, SearchMember, Title } from '@/components/atoms'
import { MemberCard, MemberRole, MemberSettings } from '@/components/organism'
import { Button } from '@/components/ui/button'
import { useTitle } from '@/hooks'
import { titleConfig } from '@/lib/config'
import { MemberType } from '@/lib/types/member.type'
import { useGetMemberLogin, useGetMembers } from '@/store/server/useMember'
import { HiOutlineUserPlus } from 'react-icons/hi2'
import { useNavigate, useParams } from 'react-router-dom'

const titleConf = titleConfig.member

export default function Member() {
  const navigate = useNavigate()
  useTitle('Anggota Forum')
  const { slug } = useParams<{ slug: string }>()
  const { data: members, isSuccess } = useGetMembers(slug as string)
  const { data: member, isSuccess: successMember } = useGetMemberLogin(slug as string)

  if (!isSuccess || !successMember) return <Loading />

  const navToRequestedMember = () => navigate(`/forums/${slug}/member/requested`)

  return (
    <section className="mx-auto w-full md:w-8/12">
      <BackButton />
      <Title heading={titleConf.heading} desc={titleConf.desc} />
      <div className="mt-8 flex items-center justify-between border-b border-[#E9E9E9] pb-4 dark:border-white/10">
        <h4 className="text-sm font-semibold">Total {members.data.length} Anggota</h4>
        <div className="flex items-center gap-3">
          {member.role === 'ADMIN' && (
            <Button
              size="gray-icon"
              variant="gray-icon"
              type="button"
              onClick={navToRequestedMember}
              id="request-member"
            >
              <HiOutlineUserPlus />
            </Button>
          )}
          <MemberRole />
          <SearchMember forumId={slug as string} admin={members.admin as MemberType} moderators={members.moderators} />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {members.data.map((member, i) => (
          <MemberCard key={i} className="border-b border-zinc-200 pb-3 dark:border-white/10">
            <MemberCard.Name fullname={member.user.fullname} username={member.user.username} photo={member.user.photo}>
              <MemberCard.Badge role={member.role} />
            </MemberCard.Name>
            <MemberSettings
              moderators={members.moderators}
              admin={members.admin as MemberType}
              forumId={slug as string}
              memberId={member.id}
              memberUserId={member.user_id}
            />
          </MemberCard>
        ))}
      </div>
    </section>
  )
}
