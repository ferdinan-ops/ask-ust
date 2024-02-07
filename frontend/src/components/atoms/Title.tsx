import * as React from 'react'

interface TitleProps {
  heading: string
  desc: string
}

export default function Title({ heading, desc }: TitleProps) {
  return (
    <React.Fragment>
      <h1 className="mb-4 text-xl font-bold md:mb-5 md:text-2xl">{heading}</h1>
      <p className="-mt-3 text-[13px] md:text-[15px]">{desc}</p>
    </React.Fragment>
  )
}
