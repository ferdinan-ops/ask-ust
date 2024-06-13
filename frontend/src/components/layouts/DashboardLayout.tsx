import { Outlet } from 'react-router-dom'
import * as React from 'react'

import { DashboardHeader, Leftbar } from '../organism'
import { useGetDevices } from '@/hooks'
import { HiBars3 } from 'react-icons/hi2'
import { Brand, ModeToggle } from '../atoms'

export default function DashboardLayout() {
  const [isOpenLeftBar, setIsOpenLeftBar] = React.useState(false)

  const { isMobile, isTablet, isDesktop } = useGetDevices()

  return (
    <section className="flex">
      <Leftbar isShow={isOpenLeftBar} setIsShow={setIsOpenLeftBar} />
      <main className="flex flex-1 flex-col">
        {(isMobile || isTablet) && <HeaderMobile action={() => setIsOpenLeftBar(true)} />}
        {isDesktop && <DashboardHeader />}

        <section className="relative flex min-h-[calc(100vh-68px)] flex-1 flex-col text-primary dark:bg-primary dark:text-white lg:min-h-0">
          <Outlet />
        </section>
      </main>
    </section>
  )
}

interface HeaderMobileProps {
  action?: () => void
}

function HeaderMobile({ action }: HeaderMobileProps) {
  return (
    <header className="sticky inset-x-0 top-0 z-30 flex h-[68px] items-center border-b border-[#E9E9E9] bg-white px-4 dark:border-white/10 dark:bg-primary dark:text-white md:px-6 lg:hidden">
      <nav className="flex w-full items-center justify-between">
        <HiBars3 className="h-5 w-5" onClick={action} />
        <Brand className="h-8 gap-4 text-xl" imageClassName="h-full object-contain" />
        <ModeToggle />
      </nav>
    </header>
  )
}
