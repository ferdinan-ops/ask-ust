import { Outlet } from 'react-router-dom'
import * as React from 'react'

import { Header, HeaderMobile, Leftbar } from '../organism'
import { useGetDevices } from '@/hooks'

export default function DashboardLayout() {
  const [isOpenLeftBar, setIsOpenLeftBar] = React.useState(false)

  const { isMobile, isTablet, isDesktop } = useGetDevices()

  return (
    <section className="flex">
      <Leftbar isShow={isOpenLeftBar} setIsShow={setIsOpenLeftBar} />
      <main className="flex-1">
        {(isMobile || isTablet) && <HeaderMobile action={() => setIsOpenLeftBar(true)} />}
        {isDesktop && <Header />}

        {/* <section className="min-h-[calc(100vh-68px-12px)] flex-1 bg-white text-primary dark:bg-primary dark:text-white md:min-h-[calc(100vh-68px-12px)] lg:min-h-[calc(100vh-68px)]"> */}
        <section className="relative min-h-[calc(100vh-68px)] flex-1 bg-white text-primary dark:bg-primary dark:text-white lg:min-h-0">
          <Outlet />
        </section>
      </main>

      {/* {isExpanded && <Rightbar />} */}
    </section>
  )
}
