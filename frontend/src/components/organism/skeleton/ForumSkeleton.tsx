import { Skeleton } from '@/components/ui/skeleton'

export default function ForumSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <Skeleton className="h-36 rounded-2xl p-6" key={index} />
      ))}
    </section>
  )
}
