import { cn } from '@/lib/utils'
import * as React from 'react'

interface ContentBoxProps {
  children: React.ReactNode
  className?: string
}
export default function ContentBox({ children, className }: ContentBoxProps) {
  return (
    <section className={cn('flex max-h-[calc(100vh-68px-56px)] min-h-[calc(100vh-68px-56px)] flex-col', className)}>
      {children}
    </section>
  )
}

const Scroll = React.forwardRef<HTMLDivElement, ContentBoxProps>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={cn('scroll-custom flex flex-1 flex-col overflow-y-auto p-4', className)}>
      {children}
    </div>
  )
})

const Header = ({ children, className }: ContentBoxProps) => {
  return (
    <div className={cn('flex items-center justify-between gap-4 border-b p-2 dark:border-white/10 md:p-4', className)}>
      {children}
    </div>
  )
}

ContentBox.Scroll = Scroll
ContentBox.Header = Header
