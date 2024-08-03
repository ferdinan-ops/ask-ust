import * as React from 'react'
import { useForm } from 'react-hook-form'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog'
import { Button } from '../../ui/button'
import { HiOutlineDocumentArrowUp } from 'react-icons/hi2'

import { Form, FormField } from '@/components/ui/form'
import { FileWithPreview } from '@/components/atoms/forms/Dropzone'
import { Dropzone } from '@/components/atoms'
import { cn } from '@/lib/utils'

interface UploadXlsxProps {
  isLoading?: boolean
  className?: string
  handleSubmit: (values: FormFields) => void
}

interface FormFields {
  file: File[]
}

export default function UploadXlsx({ className, handleSubmit, isLoading }: UploadXlsxProps) {
  const [open, setOpen] = React.useState(false)

  const forms = useForm<FormFields>()

  const onSubmit = (values: FormFields) => {
    handleSubmit(values)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-3" type="button">
          <HiOutlineDocumentArrowUp className="text-xl" />
          <span className="hidden text-[13px] md:flex">Import .xlsx</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary dark:text-white">Unggah file .xlsx</DialogTitle>
          <DialogDescription className="text-[13px] font-medium">
            Seret dan jatuhkan file atau tekan kolom dibawah ini. Tekan Kirim setelah Anda selesai.
          </DialogDescription>
        </DialogHeader>
        <Form {...forms}>
          <form className={cn('mt-2 grid items-start gap-4', className)} onSubmit={forms.handleSubmit(onSubmit)}>
            <FormField
              name="file"
              control={forms.control}
              render={({ field }) => (
                <Dropzone
                  id="image"
                  closedModal={() => setOpen(false)}
                  setValue={field.onChange}
                  fileValue={field.value as FileWithPreview[]}
                  description="xlsx atau xls ukuran tidak lebih dari 10 MB"
                  accept={{
                    'application/vnd.ms-excel': ['.xls'],
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                    'text/csv': ['.csv']
                  }}
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
