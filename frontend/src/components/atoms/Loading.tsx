import { cn } from '@/lib/utils'
import { ImSpinner2 } from 'react-icons/im'

interface LoadingProps {
  className?: string
}

export default function Loading({ className }: LoadingProps) {
  return (
    <div className={cn('flex flex-1 text-6xl lg:min-h-[calc(100vh-68px)]', className)}>
      <ImSpinner2 className="m-auto animate-spin text-primary dark:text-white" />
    </div>
  )
}
