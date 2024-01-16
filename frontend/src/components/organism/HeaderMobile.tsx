import { Logo } from '@/assets'
import { HiBars3 } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { ModeToggle } from '../mode-toggle'

interface HeaderMobileProps {
  action?: () => void
}

export default function HeaderMobile({ action }: HeaderMobileProps) {
  return (
    <header className="sticky inset-x-0 top-0 z-30 flex h-[68px] items-center border-b border-[#E9E9E9] bg-white px-4 dark:border-white/10 dark:bg-primary dark:text-white md:px-6 xl:hidden">
      <nav className="flex w-full items-center justify-between">
        <HiBars3 className="h-5 w-5" onClick={action} />
        <Link to="/" className="flex h-8 items-center gap-4">
          <img src={Logo} alt="api doc logo" className="h-full object-contain" />
          <p className="text-xl font-semibold">ASK.UST</p>
        </Link>
        <ModeToggle />
      </nav>
    </header>
  )
}
