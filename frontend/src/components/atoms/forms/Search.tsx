import { PiCommand, PiMagnifyingGlass } from 'react-icons/pi'
import { HiHashtag } from 'react-icons/hi2'
import * as React from 'react'

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../ui/command'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks'
import { useSearchForums } from '@/store/server/useSearch'
import { useNavigate } from 'react-router-dom'

interface SearchProps {
  className?: string
  action?: () => void
}

export default function Search({ className, action }: SearchProps) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = React.useState(false)
  const [keyword, setKeyword] = React.useState('')

  const debounceKeyword = useDebounce(keyword, 500)
  const { data: forums, isLoading } = useSearchForums(debounceKeyword, isOpen)

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

  const handleNavigate = (forumId: string) => {
    navigate(`/forums/${forumId}`)
    setIsOpen(false)
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
        <CommandInput
          placeholder="Cari seluruh forum disini"
          value={keyword}
          onValueChange={(search) => setKeyword(search)}
        />
        <CommandList className="scroll-custom">
          <CommandEmpty>Tidak ada hasil yang dapat ditemukan</CommandEmpty>
          <CommandGroup>
            {isLoading ? (
              <CommandItem className="flex items-center gap-3.5">Mengambil data...</CommandItem>
            ) : (
              forums?.map((forum) => (
                <CommandItem key={forum.id}>
                  <button onClick={() => handleNavigate(forum.id)} className="flex flex-1 items-center gap-3.5">
                    <HiHashtag className="text-xl" />
                    <span className="text-sm font-medium">{forum.title}</span>
                  </button>
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </React.Fragment>
  )
}
