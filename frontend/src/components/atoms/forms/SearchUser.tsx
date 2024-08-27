import { Button } from '@/components/ui/button'
import { useDebounce } from '@/hooks'
import { useSearchUsers } from '@/store/server/useSearch'
import * as React from 'react'

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../ui/command'
import { MemberCard } from '@/components/organism'
import { useCreateMember } from '@/store/server/useMember'

interface SearchUserProps {
  forumId: string
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SearchUser({ forumId, children, isOpen, setIsOpen }: SearchUserProps) {
  const [keyword, setKeyword] = React.useState('')

  const debounceKeyword = useDebounce(keyword, 500)
  const { data: users, isLoading } = useSearchUsers(debounceKeyword, isOpen)
  const { mutate: createMember, isLoading: loadingCreateMember } = useCreateMember()

  const handleCreate = (userId: string) => {
    createMember({ forum_id: forumId, user_id: userId })
  }

  return (
    <React.Fragment>
      {children}
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="Cari seluruh pengguna disini"
          value={keyword}
          onValueChange={(search) => setKeyword(search)}
        />
        <CommandList className="scroll-custom">
          <CommandEmpty>Tidak ada hasil yang dapat ditemukan</CommandEmpty>
          <CommandGroup>
            {isLoading ? (
              <CommandItem className="flex items-center gap-3.5">Mengambil data...</CommandItem>
            ) : (
              users?.map((user, index) => (
                <CommandItem key={index}>
                  <MemberCard className="w-full">
                    <MemberCard.Name fullname={user.fullname} photo={user.photo} className="w-bg-black" />
                    <div className="ml-auto">
                      <Button
                        loading={loadingCreateMember}
                        className="h-fit px-2 py-1 text-[10px] dark:disabled:text-primary md:py-2 md:text-[10px]"
                        disabled={user.members?.[0]?.is_accepted}
                        onClick={() => handleCreate(user.id)}
                      >
                        Undang
                      </Button>
                    </div>
                  </MemberCard>
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </React.Fragment>
  )
}
