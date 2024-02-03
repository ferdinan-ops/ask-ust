import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { UpdateEmailType, updateEmailValidation } from '@/lib/validations/user.validation'
import { useUpdateEmail } from '@/store/server/useUser'
import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineEnvelope } from 'react-icons/hi2'

interface EditEmailProps {
  email: string
  className?: string
}

export default function EditEmail({ email, className }: EditEmailProps) {
  const [open, setOpen] = React.useState(false)
  const { mutate: updateEmail, isLoading } = useUpdateEmail()

  const forms = useForm<UpdateEmailType>({
    mode: 'onTouched',
    resolver: yupResolver(updateEmailValidation),
    defaultValues: { email: '' }
  })

  React.useEffect(() => {
    if (email) forms.setValue('email', email)
  }, [email, forms])

  const onSubmit = (values: UpdateEmailType) => {
    updateEmail(values.email, {
      onSuccess: () => {
        setOpen(false)
        forms.setValue('email', email)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-3 bg-zinc-200 hover:bg-zinc-300">
          <HiOutlineEnvelope className="text-xl" />
          Ubah email Anda
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary dark:text-white">Ubah akun e-mail</DialogTitle>
          <DialogDescription className="text-[13px] font-medium">
            Ubah alamat email Anda pada inputan dibawah ini. Tekan <b>Ubah email</b> setelah Anda yakin.
          </DialogDescription>
        </DialogHeader>
        <Form {...forms}>
          <form className={cn('mt-2 grid items-start gap-4', className)} onSubmit={forms.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="johndoe@email.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" loading={isLoading}>
              Ubah email
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
