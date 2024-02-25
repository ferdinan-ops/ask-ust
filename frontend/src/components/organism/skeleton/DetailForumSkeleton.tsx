import { Skeleton } from '@/components/ui/skeleton'

export default function DetailForumSkeleton() {
  return (
    <section className="mx-auto md:w-10/12 lg:w-8/12">
      <Skeleton className="mb-4 h-8 w-1/2" />
      <div className="flex flex-col gap-1">
        {[...Array(3)].map((_, index) => (
          <Skeleton className="h-4 w-full" key={index} />
        ))}
        <Skeleton className="h-4 w-8/12" />
      </div>
      <div className="mt-5 flex flex-col gap-2 border-b pb-7 dark:border-white/10 md:mt-6">
        {[...Array(2)].map((_, index) => (
          <div className="flex items-center gap-3" key={index}>
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-1/4" />
          </div>
        ))}
      </div>
    </section>
  )
}
