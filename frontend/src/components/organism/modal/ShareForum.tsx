import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'

import * as React from 'react'
import { HiCheck } from 'react-icons/hi2'
import { MdContentCopy } from 'react-icons/md'

interface ShareForumProps {
  inviteCode: string
  children: React.ReactNode
}

export default function ShareForum({ inviteCode, children }: ShareForumProps) {
  const [open, setOpen] = React.useState(false)
  const [isCopied, setIsCopied] = React.useState(false)

  const { toast } = useToast()

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/invite-code/${inviteCode}`)
    setIsCopied(true)
    toast({ description: 'Tautan berhasil disalin' })
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-bold text-primary dark:text-white">Undang Teman Anda</DialogTitle>
          <DialogDescription className="text-[13px] font-medium">
            Salin tautan di bawah ini dan bagikan ke teman Anda, untuk mengundang mereka bergabung ke forum ini
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <p className="mb-2 text-sm font-medium leading-none dark:text-white">Tautan</p>
          <div className="flex h-10 w-full items-center justify-between gap-3 rounded-md border border-zinc-200 bg-white py-2 pl-3 text-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-white">
            <p className="truncate-1">
              {window.location.origin}/invite-code/${inviteCode}
            </p>
            <Button variant="secondary" size="icon" className="border-none dark:bg-primary" onClick={handleShare}>
              {isCopied ? <HiCheck /> : <MdContentCopy />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
