import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { AuthLayout } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResetPasswordBg } from '@/assets'
import { useTitle } from '@/hooks'

const description = 'Biar nanti nggak lupa lagi sama kata sandinya, disimpen di password manager ya, bang!'

type FormValues = {
  password: string
  confirmPassword: string
}

export default function ResetPassword() {
  useTitle('Atur Ulang Kata Sandi')
  const forms = useForm<FormValues>({ mode: 'onTouched' })

  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }

  return (
    <AuthLayout desc={description} bgImage={ResetPasswordBg}>
      <section className="mx-auto flex w-[440px] flex-col gap-[10px]">
        <div className="flex flex-col">
          <h2 className="text-[32px] font-bold text-primary dark:text-white">Atur ulang kata sandi</h2>
          <p className="text-sm font-medium text-zinc-500">
            Jangan pake kata sandi yang susah-susah makannya, ngerepotin mulu jadi orang.
          </p>
        </div>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
            <FormField
              name="password"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Kata Sandi Baru</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Konfirmasi Kata Sandi</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="font-semibold">Atur Ulang</Button>
          </form>
        </Form>
      </section>
    </AuthLayout>
  )
}
