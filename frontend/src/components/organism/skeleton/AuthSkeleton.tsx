import { Skeleton } from '@/components/ui/skeleton'

export default function AuthSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="h-3 w-[160px]" />
      <Skeleton className="h-2 w-[90px]" />
    </div>
  )
}
