import { useTitle } from '@/hooks'
import { useGetRequestedMembers, useUpdateMemberStatus } from '@/store/server/useMember'
import { useParams } from 'react-router-dom'
import { BackButton, Loading, Title } from '@/components/atoms'
import { titleConfig } from '@/lib/config'
import { MemberCard } from '@/components/organism'
import { Button } from '@/components/ui/button'

const titleConf = titleConfig.requestedMember

export default function RequestMember() {
  useTitle('Permintaan untuk bergabung')
  const { slug } = useParams<{ slug: string }>()
  const { data: members, isSuccess } = useGetRequestedMembers(slug as string)
  const { mutate: updateMemberStatus, isLoading } = useUpdateMemberStatus()

  const handleUpdateStatus = (memberId: string) => {
    updateMemberStatus(memberId)
  }

  if (!isSuccess) return <Loading />

  return (
    <section className="mx-auto w-full md:w-6/12">
      <BackButton />
      <Title heading={titleConf.heading} desc={titleConf.desc} />
      <div className="mt-8 flex flex-col gap-4">
        {members.length > 0 ? (
          members.map((member, i) => (
            <MemberCard key={i}>
              <MemberCard.Name
                fullname={member.user.fullname}
                username={member.user.username}
                photo={member.user.photo}
              />

              <div className="ml-auto">
                <Button
                  loading={isLoading}
                  className="h-fit px-2 md:text-[10px]"
                  disabled={member.is_accepted}
                  onClick={() => handleUpdateStatus(member.id)}
                >
                  Tambahkan
                </Button>
              </div>
            </MemberCard>
          ))
        ) : (
          <p className="text-sm font-semibold italic text-primary/60 dark:text-white/60">
            Tidak ada permintaan untuk bergabung
          </p>
        )}
      </div>
    </section>
  )
}
