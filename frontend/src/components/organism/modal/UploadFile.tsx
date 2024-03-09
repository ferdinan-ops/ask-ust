import { HiOutlinePaperClip } from 'react-icons/hi2'
import * as React from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog'
import { Button } from '../../ui/button'

import { cn } from '@/lib/utils'
import { Dropzone } from '@/components/atoms'
import { useForm } from 'react-hook-form'
import { Form, FormField } from '@/components/ui/form'
import { FileWithPreview } from '@/components/atoms/forms/Dropzone'
import { useSendImageMessage } from '@/store/server/useMessage'

interface UploadFileProps {
  className?: string
  forumId: string
}

interface FormFields {
  image: File[]
}

export default function UploadFile({ className, forumId }: UploadFileProps) {
  const [open, setOpen] = React.useState(false)
  const { mutate: sendImageMessage, isLoading } = useSendImageMessage()

  const forms = useForm<FormFields>()

  const onSubmit = (values: FormFields) => {
    const fields = { image: values.image[0], forumId }
    sendImageMessage(fields, {
      onSuccess: () => {
        setOpen(false)
        forms.reset({ image: [] })
      }
    })
  }

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
              name="image"
              control={forms.control}
              render={({ field }) => (
                <Dropzone
                  id="image"
                  closedModal={() => setOpen(false)}
                  setValue={field.onChange}
                  fileValue={field.value as FileWithPreview[]}
                  accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
                />
              )}
            />
            <Button type="submit" loading={isLoading}>
              Kirim
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
