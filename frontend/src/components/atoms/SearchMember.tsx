import { PiMagnifyingGlass } from 'react-icons/pi'
import * as React from 'react'

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { Button } from '../ui/button'

import { MemberSettings } from '../organism'
import { ServerImage } from '.'
import { useSearchMembers } from '@/store/server/useSearch'
import { useDebounce } from '@/hooks'
import { MemberType } from '@/lib/types/member.type'

interface SearchMemberProps {
  forumId: string
  admin: MemberType
  moderators: MemberType[]
}

export default function SearchMember({ forumId, admin, moderators }: SearchMemberProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [keyword, setKeyword] = React.useState('')

  const debounceKeyword = useDebounce(keyword, 500)
  const { data: members, isLoading } = useSearchMembers(debounceKeyword, forumId, isOpen)

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
        <CommandInput
          placeholder="Cari seluruh anggota disini"
          value={keyword}
          onValueChange={(search) => setKeyword(search)}
        />
        <CommandList className="scroll-custom">
          <CommandEmpty>Tidak ada hasil yang dapat ditemukan</CommandEmpty>
          <CommandGroup>
            {isLoading ? (
              <CommandItem className="flex items-center gap-3.5">Mengambil data...</CommandItem>
            ) : (
              members?.map((member, index) => (
                <CommandItem className="flex items-center gap-3.5" key={index}>
                  <ServerImage src={member.user.photo} alt={member.user.fullname} className="h-5 w-5 rounded-full" />
                  <span className="text-sm font-medium">{member.user.fullname}</span>
                  <div className="ml-auto">
                    <MemberSettings
                      memberUserId={member.user_id}
                      admin={admin}
                      moderators={moderators}
                      forumId={forumId}
                      memberId={member.id}
                    />
                  </div>
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </React.Fragment>
  )
}
