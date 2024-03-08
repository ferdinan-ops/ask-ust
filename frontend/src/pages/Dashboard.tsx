import { FollowedForumDashboard, ForumDashboard, MemberDashboard, NoTable, ReportDashboard } from '@/assets'
import { Image } from '@/components/atoms'
import { DashboardSkeleton, DoughnutChart } from '@/components/organism'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTitle } from '@/hooks'
import { cn, formatDate } from '@/lib/utils'
import { useGetReportsByForum, useGetDashboardCounts, useGetForumUser } from '@/store/server/useDashboard'
import { useGetMyForums } from '@/store/server/useUser'
import { useForm } from 'react-hook-form'
import * as React from 'react'

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
      forms.setValue('forumId', allForums?.[0].id as string)
    }
  }, [isSuccessAllForums, forms, allForums])

  return (
    <div className="flex flex-col gap-5 xl:gap-7">
      {isSuccessCounts ? (
        <section className="grid grid-cols-1 gap-6 text-primary md:grid-cols-2 xl:grid-cols-4 xl:gap-7">
          <article className="relative flex flex-col gap-2 rounded-2xl bg-[#E3F5FF] p-6">
            <p className="text-sm font-semibold">Total Forum</p>
            <p className="text-4xl font-bold">{dashboard?._count.my_forum}</p>
            <img src={ForumDashboard} className="absolute -bottom-3 -right-3 h-[75%]" />
          </article>
          <article className="relative flex flex-col gap-2 rounded-2xl bg-[#E5ECF6] p-6">
            <p className="text-sm font-semibold">Total Joined Forum</p>
            <p className="text-4xl font-bold">{dashboard?._count?.joined_forum}</p>
            <img src={FollowedForumDashboard} className="absolute -bottom-3 -right-3 h-[95%]" />
          </article>
          <article className="relative flex flex-col gap-2 rounded-2xl bg-[#E3F5FF] p-6">
            <p className="text-sm font-semibold">Total Reports</p>
            <p className="text-4xl font-bold">{dashboard?._count.report}</p>
            <img src={ReportDashboard} className="absolute -bottom-3 -right-3 h-[80%]" />
          </article>
          <article className="relative flex flex-col gap-2 rounded-2xl bg-[#E5ECF6] p-6">
            <p className="text-sm font-semibold">Total Members</p>
            <p className="text-4xl font-bold">{dashboard?._count.member}</p>
            <img src={MemberDashboard} className="absolute -bottom-3 -right-3 h-[95%]" />
          </article>
        </section>
      ) : (
        <DashboardSkeleton.Box />
      )}
      <section className="mt-3 grid grid-cols-1 gap-5 xl:grid-cols-5 xl:gap-7">
        <div className="flex flex-col gap-[55px] rounded-2xl bg-[#F7F9FB] p-6 dark:bg-white/5 xl:col-span-2">
          <div className="flex items-center">
            <h3 className="mb-1 text-sm font-bold">Persentase Laporan Kamu</h3>
            <Form {...forms}>
              <form className="flex-1">
                <FormField
                  control={forms.control}
                  name="forumId"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={async (data) => {
                          field.onChange(data)
                          await refetch()
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="ml-auto w-[65%]">
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
          </div>
          {isFetching || !isSuccessAllForums ? (
            <DashboardSkeleton.Chart />
          ) : (
            <DoughnutChart
              data={reportsChart?.map((item) => item.value) as number[]}
              labels={reportsChart?.map((item) => item.title) as string[]}
            />
          )}
        </div>
        <div className="rounded-2xl bg-[#F7F9FB] p-6 dark:bg-white/5 xl:col-span-3">
          <h3 className="mb-1 text-sm font-bold">Forum Milik Kamu</h3>
          {isSuccessTable ? (
            forums.data.length === 0 ? (
              <div className="m-auto flex h-full flex-col items-center justify-center gap-6">
                <img src={NoTable} alt="no forum" className="w-1/3" />
                <div className="flex flex-col items-center gap-1 text-center">
                  <h1 className="text-2xl font-bold">Yah, Kamu belum memiliki forum</h1>
                  <p>Yuk buat forum milikmu sendiri sekarang!</p>
                </div>
              </div>
            ) : (
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
            )
          ) : (
            <DashboardSkeleton.Table />
          )}
        </div>
      </section>
    </div>
  )
}
