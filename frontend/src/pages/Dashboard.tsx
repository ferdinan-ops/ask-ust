import { FollowedForumDashboard, ForumDashboard, MemberDashboard, ReportDashboard } from '@/assets'
import { Image } from '@/components/atoms'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTitle } from '@/hooks'
import { cn, formatDate } from '@/lib/utils'
import { useGetMembersCount, useGetReportsCount } from '@/store/server/useDashboard'
import { useGetForum } from '@/store/server/useForum'
import { useGetProfileForumsCount } from '@/store/server/useUser'

export default function Dashboard() {
  useTitle('Dashboard')

  const { data: count } = useGetProfileForumsCount()
  const { data: forums } = useGetForum()
  const { data: reportsCount } = useGetReportsCount()
  const { data: membersCount } = useGetMembersCount()

  return (
    <div className="flex flex-col gap-5 xl:gap-7">
      <section className="grid grid-cols-1 gap-6 text-primary md:grid-cols-2 xl:grid-cols-4 xl:gap-7">
        <article className="relative flex flex-col gap-2 rounded-2xl bg-[#E3F5FF] p-6">
          <p className="text-sm font-semibold">Total Forum</p>
          <p className="text-4xl font-bold">{count?.my_forum}</p>
          <img src={ForumDashboard} className="absolute -bottom-3 -right-3 h-[75%]" />
        </article>
        <article className="relative flex flex-col gap-2 rounded-2xl bg-[#E5ECF6] p-6">
          <p className="text-sm font-semibold">Total Joined Forum</p>
          <p className="text-4xl font-bold">{count?.joined_forum}</p>
          <img src={FollowedForumDashboard} className="absolute -bottom-3 -right-3 h-[95%]" />
        </article>
        <article className="relative flex flex-col gap-2 rounded-2xl bg-[#E3F5FF] p-6">
          <p className="text-sm font-semibold">Total Reports</p>
          <p className="text-4xl font-bold">{reportsCount}</p>
          <img src={ReportDashboard} className="absolute -bottom-3 -right-3 h-[80%]" />
        </article>
        <article className="relative flex flex-col gap-2 rounded-2xl bg-[#E5ECF6] p-6">
          <p className="text-sm font-semibold">Total Members</p>
          <p className="text-4xl font-bold">{membersCount}</p>
          <img src={MemberDashboard} className="absolute -bottom-3 -right-3 h-[95%]" />
        </article>
      </section>
      <section className="mt-3 grid grid-cols-1 gap-5 xl:grid-cols-4 xl:gap-7">
        <div className="h-[230px] rounded-2xl bg-[#F7F9FB] p-6 dark:bg-white/5 xl:col-span-1">
          <h3 className="mb-1 text-sm font-bold">Persentase Laporan</h3>
        </div>
        <div className="rounded-2xl bg-[#F7F9FB] p-6 dark:bg-white/5 xl:col-span-3">
          <h3 className="mb-1 text-sm font-bold">Forum milik kamu</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Anggota</TableHead>
                <TableHead>Jumlah Pesan</TableHead>
                <TableHead>Jumlah Laporan</TableHead>
                <TableHead>Tanggal Dibuat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forums?.data.map((forum) => (
                <TableRow key={forum.id}>
                  <TableCell className="font-semibold"># {forum.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {forum.members.slice(0, 3).map((member, index) => (
                        <Image
                          key={member.id}
                          src={member?.user?.photo}
                          alt={member?.user?.fullname}
                          className={cn(
                            index !== 0 && '-ml-2',
                            'h-6 w-6 rounded-full border-2 border-[#F7F9FB] dark:border-black'
                          )}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{forum._count.messages} pesan</TableCell>
                  <TableCell>{forum._count.reports} laporan</TableCell>
                  <TableCell>{formatDate(forum.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  )
}
