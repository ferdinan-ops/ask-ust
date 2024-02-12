import * as React from 'react'

interface TitleProps {
  heading: string
  desc: string
}

export default function Title({ heading, desc }: TitleProps) {
  return (
    <React.Fragment>
      <h2 className="text-2xl font-bold text-primary dark:text-white md:text-[32px]">{heading}</h2>
      <p className="text-[13px] font-medium text-zinc-500 md:text-sm">{desc}</p>
    </React.Fragment>
  )
}
