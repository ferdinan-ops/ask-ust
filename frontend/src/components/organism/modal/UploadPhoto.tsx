import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import * as React from 'react'
import { HiCamera } from 'react-icons/hi2'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { UserType } from '@/lib/types/user.type'
import { Dropzone, Image } from '@/components/atoms'
import { useForm } from 'react-hook-form'
import { Form, FormField } from '@/components/ui/form'
import { ChangeProfilePicType, changeProfilePicValidation } from '@/lib/validations/user.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { FileWithPreview } from '@/components/atoms/forms/Dropzone'
import { useUpdateProfilePic } from '@/store/server/useUser'

interface UploadPhotoProps {
  user: UserType
  className?: string
}

export default function UploadPhoto({ user, className }: UploadPhotoProps) {
  const [open, setOpen] = React.useState(false)
  const { mutate: updateProfilePic, isLoading } = useUpdateProfilePic()

  const forms = useForm<ChangeProfilePicType>({
    mode: 'onTouched',
    resolver: yupResolver(changeProfilePicValidation)
  })

  const onSubmit = (values: ChangeProfilePicType) => {
    updateProfilePic(values, {
      onSuccess: () => {
        setOpen(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="group relative -mt-12 h-24 w-24 cursor-pointer overflow-hidden rounded-full border-4 border-white dark:border-white/50 lg:-mt-[72px] lg:h-36 lg:w-36">
          <div className="absolute inset-0 z-[2] flex bg-primary/60 opacity-0 transition-opacity group-hover:opacity-100">
            <HiCamera className="m-auto text-2xl text-white md:text-4xl" />
          </div>
          <Image alt={user?.fullname} src={user?.photo} className="relative z-[1] h-full w-full object-cover" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary dark:text-white">Ganti foto profil</DialogTitle>
          <DialogDescription className="text-[13px] font-medium">
            Seret dan jatuhkan file atau tekan kolom dibawah ini. Tekan Kirim setelah Anda selesai.
          </DialogDescription>
        </DialogHeader>
        <Form {...forms}>
          <form className={cn('mt-2 grid items-start gap-4', className)} onSubmit={forms.handleSubmit(onSubmit)}>
            <FormField
              name="photo"
              control={forms.control}
              render={({ field }) => (
                <Dropzone
                  id="photo"
                  closedModal={() => setOpen(false)}
                  setValue={field.onChange}
                  fileValue={field.value as unknown as FileWithPreview[]}
                  accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                />
              )}
            />
            <Button type="submit" loading={isLoading}>
              Upload
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
