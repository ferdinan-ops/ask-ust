import { FollowedDashboard, ForumDashboard, MemberDashboard, NoTable, ReportDashboard } from '@/assets'
import { Image } from '@/components/atoms'
import { DashboardSkeleton, DoughnutChart, NoChart, NoForum } from '@/components/organism'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTitle } from '@/hooks'
import { cn, formatDate } from '@/lib/utils'
import { useGetReportsByForum, useGetDashboardCounts, useGetForumUser } from '@/store/server/useDashboard'
import { useGetMyForums } from '@/store/server/useUser'
import { useForm } from 'react-hook-form'
import * as React from 'react'
import { ForumListType } from '@/lib/types/forum.type'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  useTitle('Dashboard')
  const forms = useForm<{ forumId: string }>()
  const forumId = forms.watch('forumId')

  const { data: forums, isSuccess: isSuccessTable } = useGetMyForums(1)
  const { data: allForums, isSuccess: isSuccessAllForums } = useGetForumUser()
  const { data: dashboard, isSuccess: isSuccessCounts } = useGetDashboardCounts()
  const { data: reportsChart, refetch, isFetching } = useGetReportsByForum(forumId)

  React.useEffect(() => {
    if (!forms.getValues('forumId') && isSuccessAllForums) {
      forms.setValue('forumId', allForums?.[0]?.id as string)
    }
  }, [isSuccessAllForums, forms, allForums])

  const handleChange = async (action: () => void) => {
    action()
    await refetch()
  }

  return (
    <div className="flex flex-1 flex-col gap-5 xl:gap-7">
      {isSuccessCounts ? (
        <section className="grid grid-cols-1 gap-6 text-primary md:grid-cols-2 xl:grid-cols-4 xl:gap-7">
          <InfoCard title="Forum" count={dashboard?._count.my_forum} src={ForumDashboard} bg="blue" />
          <InfoCard title="Anggota" count={dashboard?._count.member} src={MemberDashboard} />
          <InfoCard title="Laporan" count={dashboard?._count.report} src={ReportDashboard} bg="blue" />
          <InfoCard title="Forum Diikuti" count={dashboard?._count.joined_forum} src={FollowedDashboard} />
        </section>
      ) : (
        <DashboardSkeleton.Box />
      )}
      <section className="mt-3 grid flex-1 grid-cols-1 gap-5 xl:grid-cols-5 xl:gap-7">
        <div className="flex flex-col gap-8 rounded-2xl bg-[#F7F9FB] p-6 dark:bg-white/5 md:gap-[55px] xl:col-span-2">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-0">
            <h3 className="mb-1 text-center text-sm font-bold lg:text-left">Persentase Laporan Kamu</h3>
            {reportsChart?.length && reportsChart.length > 0 && (
              <Form {...forms}>
                <form className="flex-1">
                  <FormField
                    control={forms.control}
                    name="forumId"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <Select value={value} onValueChange={async (data) => await handleChange(() => onChange(data))}>
                          <FormControl>
                            <SelectTrigger className="ml-auto w-[130px] md:w-[65%]">
                              <SelectValue placeholder="Pilih Forum" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {allForums?.map((forum) => (
                              <SelectItem value={forum.id} key={forum.id}>
                                {forum.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}
          </div>
          {isFetching || !isSuccessAllForums ? (
            <DashboardSkeleton.Chart />
          ) : reportsChart?.length && reportsChart.length > 0 ? (
            <DoughnutChart
              data={reportsChart?.map((item) => item.value) as number[]}
              labels={reportsChart?.map((item) => item.title) as string[]}
            />
          ) : (
            <NoChart />
          )}
        </div>

        <div className="rounded-2xl bg-[#F7F9FB] p-6 dark:bg-white/5 xl:col-span-3">
          <h3 className="mb-1 text-sm font-bold">Forum Milik Kamu</h3>
          {isSuccessTable ? (
            forums.data.length === 0 ? (
              <NoForum imgSrc={NoTable} location="dashboard" type="mine" />
            ) : (
              <ForumTable forums={forums.data as ForumListType[]} />
            )
          ) : (
            <DashboardSkeleton.Table />
          )}
        </div>
      </section>
    </div>
  )
}

interface InfoCardProps {
  title: string
  count: number
  src: string
  bg?: 'blue' | 'default'
}

function InfoCard({ title, count, src, bg = 'default' }: InfoCardProps) {
  return (
    <article
      className={cn('relative flex flex-col gap-2 rounded-2xl bg-[#E5ECF6] p-6', bg === 'blue' && 'bg-[#E3F5FF]')}
    >
      <p className="text-sm font-semibold">Total {title}</p>
      <p className="text-4xl font-bold">{count}</p>
      <img src={src} className="absolute -bottom-3 -right-3 h-[75%]" />
    </article>
  )
}

interface ForumTableProps {
  forums?: ForumListType[]
}

function ForumTable({ forums }: ForumTableProps) {
  return (
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
        {forums?.map((forum) => (
          <TableRow key={forum.id}>
            <TableCell className="font-semibold">
              <Link to={`/forums/${forum.id}`} className="text-primary">
                # {forum.title}
              </Link>
            </TableCell>
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
  )
}
