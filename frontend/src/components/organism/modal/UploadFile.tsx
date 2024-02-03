import { HiOutlinePaperClip } from 'react-icons/hi2'
import * as React from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog'
import { Button } from '../../ui/button'

import { cn } from '@/lib/utils'
import { Dropzone } from '@/components/atoms'

interface UploadFileProps {
  className?: string
}

export default function UploadFile({ className }: UploadFileProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="messageIcon" size="icon">
          <HiOutlinePaperClip className="text-lg md:text-xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary dark:text-white">Unggah file</DialogTitle>
          <DialogDescription className="text-[13px] font-medium">
            Seret dan jatuhkan file atau tekan kolom dibawah ini. Tekan Kirim setelah Anda selesai.
          </DialogDescription>
        </DialogHeader>
        <form className={cn('mt-2 grid items-start gap-4', className)}>
          <Dropzone />
          <Button type="submit">Kirim</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
