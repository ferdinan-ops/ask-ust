import { cn } from '@/lib/utils'
import * as React from 'react'

interface TitleProps {
  heading: string
  desc: string
  className?: string
}

export default function Title({ heading, desc, className }: TitleProps) {
  return (
    <React.Fragment>
      <h2 className={cn('mb-2 text-2xl font-bold text-primary dark:text-white md:text-[32px]', className)}>
        {heading}
      </h2>
      <p className={cn('text-[13px] font-medium text-zinc-500 md:text-sm', className)}>{desc}</p>
    </React.Fragment>
  )
}
