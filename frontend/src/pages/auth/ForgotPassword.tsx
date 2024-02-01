import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { ForgotPasswordType, forgotPasswordValidation } from '@/lib/validations/auth.validation'
import { useForgotPassword } from '@/store/server/useAuth'
import { AuthLayout } from '@/components/layouts'
import { VerifyEmailBg } from '@/assets'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTitle } from '@/hooks'

const description = 'Nggak apa-apa lupa sama kata sandi, asalkan kita jangan sampe lupa sama jasa para pahlawan~'

export default function ForgotPassword() {
  useTitle('Lupa Kata Sandi')
  const navigate = useNavigate()
  const { mutate: forgotPassword, isLoading } = useForgotPassword()

  const forms = useForm<ForgotPasswordType>({
    mode: 'onTouched',
    resolver: yupResolver(forgotPasswordValidation),
    defaultValues: { email: '' }
  })

  const onSubmit = (values: ForgotPasswordType) => {
    forgotPassword(values.email, {
      onSuccess: () => {
        forms.reset({ email: '' })
        setTimeout(() => {
          navigate('/reset-password')
        }, 1500)
      }
    })
  }

  return (
    <AuthLayout desc={description} bgImage={VerifyEmailBg}>
      <section className="mx-auto flex w-[440px] flex-col gap-[10px]">
        <div className="flex flex-col">
          <h2 className="text-[32px] font-bold text-primary dark:text-white">Lupa Kata Sandi</h2>
          <p className="text-sm font-medium text-zinc-500">
            Masukkan email yang kamu daftarkan sebelumnya, nanti kamu bakal dikirim email.
          </p>
        </div>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
            <FormField
              name="email"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="johndoe@email.com" />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="font-semibold" type="submit" loading={isLoading}>
              Kirim
            </Button>
          </form>
        </Form>
      </section>
    </AuthLayout>
  )
}
