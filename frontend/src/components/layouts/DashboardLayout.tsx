import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, HeaderMobile, Leftbar } from '../organism'
import { useGetDevices } from '@/hooks'

export default function DashboardLayout() {
  const [isOpenLeftBar, setIsOpenLeftBar] = React.useState(false)

  const { isMobile, isTablet } = useGetDevices()

  return (
    <section className="flex">
      <Leftbar isShow={isOpenLeftBar} setIsShow={setIsOpenLeftBar} />
      <main className="flex-1">
        {isMobile || isTablet ? <HeaderMobile action={() => setIsOpenLeftBar(true)} /> : <Header />}

        <section className="min-h-[calc(100vh-68px-12px)] flex-1 bg-white text-primary dark:bg-primary dark:text-white md:min-h-[calc(100vh-68px-12px)] xl:min-h-[calc(100vh-68px)]">
          <Outlet />
        </section>
      </main>

      {/* {isExpanded && <Rightbar />} */}
    </section>
  )
}
