import { HiBars3 } from 'react-icons/hi2'

import { Brand, ModeToggle } from '../atoms'

interface HeaderMobileProps {
  action?: () => void
}

export default function HeaderMobile({ action }: HeaderMobileProps) {
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
