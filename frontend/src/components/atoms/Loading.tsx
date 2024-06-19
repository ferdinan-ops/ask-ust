import { cn } from '@/lib/utils'
import { ImSpinner2 } from 'react-icons/im'

interface LoadingProps {
  className?: string
}

export default function Loading({ className }: LoadingProps) {
  return (
    <div className={cn('flex flex-1 text-6xl', className)}>
      <ImSpinner2 className="m-auto animate-spin text-zinc-400 dark:text-white" />
    </div>
  )
}
