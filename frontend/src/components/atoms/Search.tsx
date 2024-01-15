import * as React from 'react'
import { PiCommand, PiMagnifyingGlass } from 'react-icons/pi'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { MENU_FORUMS } from '@/lib/data'
import { CommandSeparator } from 'cmdk'
import { HiHashtag } from 'react-icons/hi2'
import { cn } from '@/lib/utils'

interface SearchProps {
  className?: string
  action?: () => void
}

export default function Search({ className, action }: SearchProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleClick = () => {
    setIsOpen((open) => !open)
    action && action()
  }

  return (
    <React.Fragment>
      <div
        onClick={handleClick}
        className={cn(
          'flex w-48 cursor-pointer items-center rounded-lg bg-black/5 px-2 py-1 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/5',
          className
        )}
      >
        <PiMagnifyingGlass className="text-black/40 dark:text-white/20" />
        <span className="ml-2 mr-2 flex-1 text-sm font-semibold text-black/40 dark:text-white/40">Search</span>
        <div className="flex items-center gap-[2px] text-black/30 dark:text-white/30">
          <PiCommand className="text-sm" />
          <span className="text-xs">+</span>
          <span className="text-xs">K</span>
        </div>
      </div>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Cari seluruh forum disini" />
        <CommandList className="scroll-custom">
          <CommandEmpty>Tidak ada hasil yang dapat ditemukan</CommandEmpty>
          <CommandGroup>
            {MENU_FORUMS.map((menu, index) => (
              <CommandItem className="flex items-center gap-3.5" key={index}>
                <HiHashtag className="text-xl" />
                {/* <img
                  src={`https://source.unsplash.com/random?${menu.name}`}
                  alt={menu.name}
                  className="w-5 h-5 rounded-full"
                /> */}
                <span className="text-sm font-medium">{menu.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          {/* <CommandGroup heading="Pertanyaan">
            {[...Array(5)].map((_, index) => (
              <CommandItem className="flex items-center gap-3.5" key={index}>
                <Hash />
                <span className="text-sm font-medium">Text overflow ellipsis on two lines [duplicate] {index + 1}</span>
              </CommandItem>
            ))}
          </CommandGroup> */}
          <CommandSeparator />
          {/* <CommandGroup heading="Anggota">
            {[...Array(5)].map((_, index) => (
              <CommandItem className="flex items-center gap-3.5" key={index}>
                <img
                  src={`https://source.unsplash.com/random?profile`}
                  alt="profile"
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-sm font-medium">Profile {index + 1}</span>
              </CommandItem>
            ))}
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </React.Fragment>
  )
}
