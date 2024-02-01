import { HiOutlineHome, HiPlus } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'

import { Breadcrumbs, Search } from '../atoms'
import { ModeToggle } from '../mode-toggle'
import { Button } from '../ui/button'

export default function Header() {
  const navigate = useNavigate()
  return (
    <header className="sticky left-0 right-0 top-0 z-10 hidden h-[68px] w-full items-center border-b border-[#E9E9E9] bg-white text-primary dark:border-white/10 dark:bg-primary dark:text-white xl:flex">
      <div className="flex w-full items-center justify-between px-[22px]">
        <nav className="flex items-center gap-3">
          <div className="flex items-center">
            <Link to="/dashboard">
              <Button variant="outline" size="icon" className="rounded-full border-none dark:bg-primary">
                <HiOutlineHome className="text-xl" />
              </Button>
            </Link>
          </div>
          <Breadcrumbs />
        </nav>
        <nav className="flex items-center gap-4">
          <ModeToggle />
          <Search />
          <div className="flex items-center">
            <Button className="h-fit gap-2 p-0 px-3 py-2 text-xs" onClick={() => navigate('/forums/create')}>
              <HiPlus className="text-lg" />
              <span>Forum baru</span>
            </Button>
            {/* <Link to="/notification">
              <Button variant="outline" size="icon" className="rounded-full border-none dark:bg-primary">
                <PiBell className="text-xl" />
              </Button>
            </Link> */}
            {/* <Button
              variant="outline"
              size="icon"
              className="rounded-full border-none dark:bg-primary"
              onClick={rightbarAction}
            >
              <PiSidebar className="text-xl" />
            </Button> */}
          </div>
        </nav>
      </div>
    </header>
  )
}
