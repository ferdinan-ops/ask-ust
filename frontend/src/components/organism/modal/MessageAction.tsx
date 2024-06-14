import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { MemberType } from '@/lib/types/member.type'
import { MessageType } from '@/lib/types/message.type'
import { cn } from '@/lib/utils'
import * as React from 'react'
import ReportMember from './ReportMember'

interface MessageActionProps {
  children: React.ReactNode
  forumId: string
  message: MessageType
  member: MemberType
  onEdit: (messageId: string, content: string) => void
  onDelete: (id: string, type: 'default' | 'role') => void
}

export default function MessageAction({ children, message, member, onEdit, onDelete, forumId }: MessageActionProps) {
  const [open, setOpen] = React.useState(false)

  const isMine = member?.id === message.member_id
  const isHasFile = message.file_url
  const isGuest = member?.role === 'GUEST'

  const handleDelete = (type: 'default' | 'role') => {
    onDelete(message.id, type)
    setOpen(false)
  }

  const handleEdit = () => {
    onEdit(message.id, message.content)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn('w-fit', (member?.id as string) === message.member_id && 'ml-auto')}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[90%] rounded-lg sm:max-w-lg">
        <DialogHeader className="mb-2 text-left">
          <DialogTitle className="text-xl font-bold text-primary dark:text-white">
            Pesan {isMine ? 'Anda' : message.member.user.username}
          </DialogTitle>
          <DialogDescription className="text-[13px] font-medium">"{message.content}"</DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex items-center justify-center gap-3">
          {isMine ? (
            <React.Fragment>
              {!isHasFile && <Button onClick={handleEdit}>Ubah</Button>}
              <Button variant="destructive" onClick={() => handleDelete('default')}>
                Hapus
              </Button>
            </React.Fragment>
          ) : isGuest ? (
            <ReportMember memberId={member.id} forumId={forumId}>
              <Button variant="destructive">Laporkan pesan ini</Button>
            </ReportMember>
          ) : (
            <Button variant="destructive" onClick={() => handleDelete('role')}>
              Hapus
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
