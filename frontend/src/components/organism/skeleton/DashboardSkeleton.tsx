import { Skeleton } from '@/components/ui/skeleton'
import { Table as TableUI, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function DashboardSkeleton({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function Box() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-7">
      {[...Array(4)].map((_, i) => (
        <Skeleton className="relative flex h-[116px] flex-col gap-2 rounded-2xl bg-[#E3F5FF]" key={i} />
      ))}
    </section>
  )
}

function Table() {
  return (
    <TableUI>
      <TableHeader>
        <TableRow>
          {[...Array(5)].map((_, i) => (
            <TableHead key={i}>
              <Skeleton className="h-7" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, i) => (
          <TableRow key={i}>
            {[...Array(5)].map((_, j) => (
              <TableCell key={j}>
                <Skeleton className="h-7" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableUI>
  )
}

function Chart() {
  return (
    <div className="flex flex-col gap-[55px]">
      <Skeleton className="mx-auto h-44 w-44 rounded-full" />
      <div className="grid grid-cols-1 content-between gap-3 xl:grid-cols-2">
        {[...Array(6)].map((_, i) => (
          <Skeleton className="h-5" key={i} />
        ))}
      </div>
    </div>
  )
}

DashboardSkeleton.Box = Box
DashboardSkeleton.Table = Table
DashboardSkeleton.Chart = Chart
