import { Loading, Image, Title, BackButton } from '@/components/atoms'
import { Alert } from '@/components/organism'
import { Button } from '@/components/ui/button'
import { useTitle } from '@/hooks'
import { alertConfig, titleConfig } from '@/lib/config'
import { useGetMember, useKickMember, useUpdateMember } from '@/store/server/useMember'
import { useGetReports } from '@/store/server/useReport'
import { useNavigate, useParams } from 'react-router-dom'

const titleConf = titleConfig.manageMember
const alertConf = alertConfig.manageMember

export default function ManageMember() {
  useTitle('Manajemen Anggota')
  const navigate = useNavigate()
  const { memberId, slug } = useParams<{ slug: string; memberId: string }>()

  const { data: member, isLoading } = useGetMember(memberId as string)
  const { data: reports, isLoading: isLoadingReport } = useGetReports(memberId as string, slug as string)

  const { mutate: kickMember, isLoading: isLoadingKick } = useKickMember()
  const { mutate: updateMember, isLoading: isLoadingUpdate } = useUpdateMember()

  const handleKickMember = () => {
    const fields = { forumId: slug as string, memberId: memberId as string }
    kickMember(fields, {
      onSuccess: () => {
        navigate(`/forums/${slug}/members`)
      }
    })
  }

  const handleUpdateMember = (role: 'GUEST' | 'MODERATOR') => {
    updateMember({ forumId: slug as string, memberId: memberId as string, role })
  }

  if (isLoading || isLoadingReport) return <Loading />

  return (
    <section className="mx-auto w-full md:w-8/12">
      <BackButton />
      <Title heading={titleConf.heading} desc={titleConf.desc} />
      <article className="mt-8 flex flex-col justify-between gap-5 rounded-lg bg-zinc-100 px-4 py-3 dark:bg-white/10 md:flex-row md:items-center md:gap-4">
        <div className="flex flex-col items-center gap-2 md:flex-row md:items-start md:gap-4">
          <div className="relative">
            <Image src={member?.user.photo} alt={member?.user.fullname as string} className="h-12 w-12 rounded-lg" />
          </div>
          <div className="flex flex-col text-center md:text-left">
            <p className="truncate-1 flex items-center gap-1 font-medium md:text-lg">{member?.user.fullname}</p>
            <span className="text-xs font-medium text-zinc-400 dark:text-white/40 md:text-sm">
              @{member?.user.username}
            </span>
          </div>
        </div>
        {member?.role !== 'ADMIN' && (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              loading={isLoadingUpdate}
              className="flex-1 text-xs md:flex-none md:text-sm"
              onClick={() => handleUpdateMember(member?.role === 'GUEST' ? 'MODERATOR' : 'GUEST')}
            >
              Jadikan {member?.role === 'GUEST' ? 'Moderator' : 'Guest'}
            </Button>
            <Alert title={alertConf.title} desc={alertConf.desc} btnText={alertConf.btnTxt} action={handleKickMember}>
              <Button variant="destructive" loading={isLoadingKick} className="flex-1 text-xs md:flex-none md:text-sm">
                Keluarkan
              </Button>
            </Alert>
          </div>
        )}
      </article>

      <ul className="mt-6 flex flex-col gap-2 md:mt-8">
        <h2 className="bg-primary py-2 text-center text-sm font-semibold text-white dark:bg-white dark:text-primary md:text-base">
          Laporan
        </h2>
        {reports?.map((report) => (
          <li className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-white/10">
            <span className="text-sm font-medium">{report.title}</span>
            <span className="rounded bg-red-200 px-2 py-1 text-xs dark:bg-red-900">{report.value} laporan</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
