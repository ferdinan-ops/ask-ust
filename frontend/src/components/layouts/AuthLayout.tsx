import * as React from 'react'
interface AuthLayoutProps {
  children: React.ReactNode
  desc: string
  bgImage?: string
}

export default function AuthLayout({ children, desc, bgImage }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen justify-center">
      <section className="flex w-full max-w-[440px] flex-1 items-center justify-center bg-white p-6 text-primary dark:bg-primary dark:text-primary xl:max-w-none xl:p-0">
        {children}
      </section>
      <section className="relative hidden overflow-hidden bg-gradient-to-b from-gray-700 to-zinc-900 xl:flex xl:flex-1">
        <div className="relative z-10 flex flex-col items-center justify-center gap-[67px]">
          <img src={bgImage} alt="auth" className="w-full" />
          <div className="flex flex-col gap-2 self-start px-[92px]">
            <p className="text-sm font-semibold leading-7 tracking-wider text-white/60">ASK.UST</p>
            <p className="text-3xl font-semibold leading-10 text-white">{desc}</p>
          </div>
        </div>
        <div className="absolute left-[250px] top-[74px] z-[1] h-[935px] w-[935px] rounded-full bg-gradient-to-br from-white to-white/0 opacity-[3%]" />
        <div className="absolute left-[66px] top-[-134px] z-[2] h-[935px] w-[935px] rounded-full bg-gradient-to-br from-white to-white/0 opacity-[2%]" />
        <div className="absolute left-[-73px] top-[-249px] z-[3] h-[1090px] w-[1090px] rounded-full bg-gradient-to-br from-white to-white/0 opacity-[3%]" />
        <div className="absolute left-[434px] top-[282px] z-[4] h-[700px] w-[700px] rounded-full bg-gradient-to-br from-white to-white/0 opacity-[1%]" />
      </section>
    </main>
  )
}
