import { ServerImage, Title } from '@/components/atoms'
import { Alert } from '@/components/organism'
import { Button } from '@/components/ui/button'
import { useTitle } from '@/hooks'
import { alertConfig, titleConfig } from '@/lib/config'
import { useGetMember, useKickMember, useUpdateMember } from '@/store/server/useMember'
import { useNavigate, useParams } from 'react-router-dom'

const titleConf = titleConfig.manageMember
const alertConf = alertConfig.manageMember

export default function ManageMember() {
  useTitle('Manajemen Anggota')
  const navigate = useNavigate()
  const { memberId, slug } = useParams<{ slug: string; memberId: string }>()

  const { data: member, isLoading } = useGetMember(memberId as string)
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

  if (isLoading) return <p>Loading...</p>

  return (
    <section className="mx-auto w-full md:w-8/12">
      <Title heading={titleConf.heading} desc={titleConf.desc} />
      <article className="mt-8 flex items-center justify-between rounded-lg bg-zinc-100 px-4 py-3 dark:bg-white/10">
        <div className="flex items-start gap-4">
          <div className="relative">
            <ServerImage
              src={member?.user.photo}
              alt={member?.user.fullname as string}
              className="h-12 w-12 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <p className="truncate-1 flex items-center gap-1 text-lg font-medium">{member?.user.fullname}</p>
            <span className="text-sm font-medium text-zinc-400 dark:text-white/40">@{member?.user.username}</span>
          </div>
        </div>
        {member?.role !== 'ADMIN' && (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              loading={isLoadingUpdate}
              onClick={() => handleUpdateMember(member?.role === 'GUEST' ? 'MODERATOR' : 'GUEST')}
            >
              Jadikan {member?.role === 'GUEST' ? 'Moderator' : 'Guest'}
            </Button>
            <Alert title={alertConf.title} desc={alertConf.desc} btnText={alertConf.btnTxt} action={handleKickMember}>
              <Button variant="destructive" loading={isLoadingKick}>
                Keluarkan
              </Button>
            </Alert>
          </div>
        )}
      </article>

      <ul className="mt-6 flex flex-col gap-2 md:mt-8">
        <h2 className="bg-primary py-2 text-center text-base font-semibold text-white dark:bg-white dark:text-primary">
          Laporan
        </h2>
        <li className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-white/10">
          <span className="text-sm font-medium">Pelecehan secara online</span>
          <span className="rounded bg-red-200 px-2 py-1 text-xs dark:bg-red-900">20 laporan</span>
        </li>
        <li className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-white/10">
          <span className="text-sm font-medium">Perilaku kebencian</span>
          <span className="rounded bg-red-200 px-2 py-1 text-xs dark:bg-red-900">12 laporan</span>
        </li>
        <li className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-white/10">
          <span className="text-sm font-medium">Ancaman kekerasan</span>
          <span className="rounded bg-red-200 px-2 py-1 text-xs dark:bg-red-900">0 laporan</span>
        </li>
        <li className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-white/10">
          <span className="text-sm font-medium">Mencelakai diri sendiri</span>
          <span className="rounded bg-red-200 px-2 py-1 text-xs dark:bg-red-900">0 laporan</span>
        </li>
        <li className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-white/10">
          <span className="text-sm font-medium">Spam</span>
          <span className="rounded bg-red-200 px-2 py-1 text-xs dark:bg-red-900">0 laporan</span>
        </li>
      </ul>
    </section>
  )
}
