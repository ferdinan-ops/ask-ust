import * as React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { HiOutlineCloudArrowUp, HiOutlinePaperClip } from 'react-icons/hi2'
import { cn } from '@/lib/utils'

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
          <DialogTitle className="text-xl font-bold">Unggah file</DialogTitle>
          <DialogDescription className="text-[13px] font-medium">
            Seret dan jatuhkan file atau tekan kolom dibawah ini. Tekan Kirim setelah Anda selesai.
          </DialogDescription>
        </DialogHeader>
        <form className={cn('mt-2 grid items-start gap-4', className)}>
          <div className="flex items-center gap-6 rounded-lg border-2 border-dashed border-primary/25 py-5 pl-8 pr-6">
            <HiOutlineCloudArrowUp className="text-5xl text-primary/40" />
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-[13px] font-semibold text-primary">Pilih file atau seret dan lepas di sini</p>
                <p className="text-xs text-primary/40">JPG, PNG atau PDF, ukuran tidak lebih dari 10MB</p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="border-blue-500 text-xs uppercase text-blue-500 hover:text-blue-500"
              >
                Pilih file
              </Button>
            </div>
          </div>
          <Button type="submit">Kirim</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
