import { PiMagnifyingGlass } from 'react-icons/pi'
import * as React from 'react'

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { Button } from '../ui/button'

import { useGetMembers } from '@/store/server/useMember'
import { ReportMember } from '../organism'

interface SearchMemberProps {
  forumId: string
}

export default function SearchMember({ forumId }: SearchMemberProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const { data: members, isLoading } = useGetMembers(forumId)

  if (isLoading) return <p>Loading...</p>

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
            {members?.map((member, index) => (
              <CommandItem className="flex items-center gap-3.5" key={index}>
                <img
                  src={member.user.photo || 'https://github.com/shadcn.png'}
                  alt={member.user.fullname}
                  className="h-5 w-5 rounded-full"
                />
                <span className="text-sm font-medium">{member.user.fullname}</span>
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
