import { HiOutlinePaperClip } from 'react-icons/hi2'
import * as React from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog'
import { Button } from '../../ui/button'

import { cn } from '@/lib/utils'
import { Dropzone } from '@/components/atoms'
import { useForm } from 'react-hook-form'
import { Form, FormField } from '@/components/ui/form'

interface UploadFileProps {
  className?: string
}

export default function UploadFile({ className }: UploadFileProps) {
  const [open, setOpen] = React.useState(false)

  const forms = useForm()

  const onSubmit = () => { }

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
        <Form {...forms}>
          <form className={cn('mt-2 grid items-start gap-4', className)} onSubmit={forms.handleSubmit(onSubmit)}>
            <FormField
              name='file'
              control={forms.control}
              render={({ field }) => (
                <Dropzone
                  id='file'
                  closedModal={() => setOpen(false)}
                  setValue={field.onChange}
                  fileValue={field.value}
                  accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                />
              )}
            />
            <Button type="submit">Kirim</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
