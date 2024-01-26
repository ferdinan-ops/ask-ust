import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { AuthLayout } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { VerifyEmailType } from '@/lib/validations/auth.validation'
import { useVerifyEmail } from '@/store/server/useAuth'
import { VerifyEmailBg } from '@/assets'
import { useTitle } from '@/hooks'

const description = 'Selamat datang! Kami perlu memastikan bahwa akun ini benar-benar milik kamu, supaya aman hehe~'

export default function VerifyEmail() {
  useTitle('Verifikasi Email')
  const navigate = useNavigate()
  const { mutate: verifyEmail, isLoading } = useVerifyEmail()
  const forms = useForm<VerifyEmailType>({ mode: 'onTouched' })

  const onSubmit = async (values: VerifyEmailType) => {
    verifyEmail(values.token, {
      onSuccess: () => {
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      }
    })
  }

  return (
    <AuthLayout desc={description} bgImage={VerifyEmailBg}>
      <section className="mx-auto flex w-[440px] flex-col gap-[10px]">
        <div className="flex flex-col">
          <h2 className="text-[32px] font-bold text-primary dark:text-white">Verifikasi Email</h2>
          <p className="text-sm font-medium text-zinc-500">
            Kami sudah kirim kode verifikasi ke email yang udah kamu daftarkan. Salin dan paste disini deh!
          </p>
        </div>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
            <FormField
              name="token"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Kode Verifikasi</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="76d67hi" />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="font-semibold" type="submit" loading={isLoading}>
              Verifikasi
            </Button>
          </form>
        </Form>
      </section>
    </AuthLayout>
  )
}
