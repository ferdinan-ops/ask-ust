import { useNavigate, useParams } from 'react-router-dom'
import { HiHashtag, HiOutlineUserPlus } from 'react-icons/hi2'

import { MediaMenu, MemberCard, MemberRole, MemberSettings, Messages, OnBoardingForum } from '@/components/organism'
import { ContentBox, Loading, SearchMember } from '@/components/atoms'

import { useGetDetailForum } from '@/store/server/useForum'
import { MemberType } from '@/lib/types/member.type'
import { useGetDevices, useTitle } from '@/hooks'
import { Button } from '@/components/ui/button'
import { useGetMemberLogin, useGetMembers } from '@/store/server/useMember'

export default function ContentForum() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()
  const { data: forum, isSuccess } = useGetDetailForum(slug as string)
  const { data: members, isSuccess: successMembers } = useGetMembers(slug as string)
  const { data: member, isSuccess: successMember } = useGetMemberLogin(slug as string)

  const { isDesktop } = useGetDevices()

  useTitle(`Forum - ${forum?.title}`)

  const navToRequestedMember = () => navigate(`/forums/${slug}/member/requested`)

  if (!isSuccess || !successMembers || !successMember) return <Loading />

  return (
    <section className="flex flex-1 flex-col justify-between gap-7 lg:flex-row lg:p-7">
      {isDesktop && <OnBoardingForum />}
      <ContentBox className="flex flex-1 flex-col overflow-hidden rounded-none border-[#E9E9E9] dark:border-white/10 dark:bg-primary lg:w-9/12 lg:rounded-lg lg:border">
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
          <MediaMenu
            forumId={slug as string}
            invitedCode={forum?.invite_code as string}
            privacy={forum?.privacy as string}
          />
        </ContentBox.Header>
        <Messages forumId={slug as string} />
      </ContentBox>

      <ContentBox className="hidden w-3/12 overflow-hidden rounded-lg border border-[#E9E9E9] dark:border-white/10 lg:block">
        <article className="flex flex-col">
          <ContentBox.Header>
            <h4 className="text-sm font-semibold">{members.data.length} Anggota</h4>
            <div className="flex items-center gap-2">
              {member?.role === 'ADMIN' && (
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
              <SearchMember
                forumId={slug as string}
                admin={members?.admin as MemberType}
                moderators={members?.moderators as MemberType[]}
              />
            </div>
          </ContentBox.Header>
          <ContentBox.Scroll className="gap-4">
            {members.data.map((member, i) => (
              <MemberCard key={i}>
                <MemberCard.Name
                  fullname={member.user.fullname}
                  username={member.user.username}
                  photo={member.user.photo}
                >
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
          </ContentBox.Scroll>
        </article>
      </ContentBox>
    </section>
  )
}
