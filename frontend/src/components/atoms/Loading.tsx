import { cn } from '@/lib/utils'
import { ImSpinner2 } from 'react-icons/im'

interface LoadingProps {
  className?: string
  type?: 'full' | 'inline'
}

export default function Loading({ className, type = 'inline' }: LoadingProps) {
  return type === 'inline' ? (
    <div className={cn('flex flex-1 text-6xl', className)}>
      <ImSpinner2 className="m-auto animate-spin text-zinc-400 dark:text-white" />
    </div>
  ) : (
    <section className="fixed inset-0 z-[999999999999999999999999999999999999999999999999999] bg-gray-900/30">
      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white">
        <ImSpinner2 className="m-auto animate-spin text-3xl text-primary" />
      </div>
    </section>
  )
}
