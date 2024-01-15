import * as React from 'react'
import { Button } from '../ui/button'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { MEMBERS } from '@/lib/data'
import { ReportMember } from '../organism'

export default function SearchMember() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <React.Fragment>
      <Button
        size="icon"
        variant="secondary"
        onClick={() => setIsOpen(true)}
        className="h-8 w-8 cursor-pointer rounded-lg bg-black/5 px-2 py-1 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/5"
      >
        <PiMagnifyingGlass className="text-lg text-black/40 dark:text-white" />
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Cari seluruh anggota disini" />
        <CommandList className="scroll-custom">
          <CommandEmpty>Tidak ada hasil yang dapat ditemukan</CommandEmpty>
          <CommandGroup>
            {MEMBERS.map((menu, index) => (
              <CommandItem className="flex items-center gap-3.5" key={index}>
                <img
                  src={`https://ui-avatars.com/api/?background=E8E8E9&color=363E4D&bold=true&name=${menu}`}
                  alt={menu}
                  className="h-5 w-5 rounded-full"
                />
                <span className="text-sm font-medium">{menu}</span>
                <div className="ml-auto">
                  <ReportMember />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </React.Fragment>
  )
}
