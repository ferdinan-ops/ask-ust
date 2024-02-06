import { ServerImage } from '@/components/atoms'
import { Button } from '@/components/ui/button'
import { useTitle } from '@/hooks'
import { useGetMember } from '@/store/server/useMember'
import { useParams } from 'react-router-dom'

export default function ManageMember() {
  useTitle('Manajemen Anggota')
  const { memberId } = useParams<{ slug: string; memberId: string }>()
  const { data: member, isLoading } = useGetMember(memberId as string)

  if (isLoading) return <p>Loading...</p>

  return (
    <section className="mx-auto w-full md:w-8/12">
      <h1 className="mb-4 text-xl font-bold md:mb-5 md:text-2xl">Manajemen Anggota</h1>
      <p className="-mt-3 text-[13px] md:text-[15px]">
        Anda dapat melihat laporan dari anggota yang melanggar aturan forum disini. Anda juga dapat mengubah status dari
        anggota, serta mengeluarkan anggota dari forum.
      </p>
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
            <Button variant="outline">Jadikan {member?.role === 'GUEST' ? 'Moderator' : 'Guest'}</Button>
            <Button variant="destructive">Keluarkan</Button>
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
