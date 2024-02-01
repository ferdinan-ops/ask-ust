import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { AuthLayout } from '@/components/layouts'
import { Password } from '@/components/atoms'

import { ResetPasswordType, resetPasswordValidation } from '@/lib/validations/auth.validation'
import { ResetPasswordBg } from '@/assets'
import { useTitle } from '@/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordDefaultValues } from '@/lib/defaultValues'
import { useResetPassword } from '@/store/server/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { changePasswordValidation } from '@/lib/validations/user.validation'
import { useChangePassword } from '@/store/server/useUser'

const description = 'Biar nanti nggak lupa lagi sama kata sandinya, disimpen di password manager ya, bang!'
const CHANGE_PASSWORD = '/me/change-password'

export default function ResetPassword() {
  useTitle('Ubah Kata Sandi')
  const navigate = useNavigate()
  const location = useLocation()

  const isChangePassword = location.pathname === CHANGE_PASSWORD
  const { mutate: resetPassword, isLoading } = useResetPassword()
  const { mutate: changePassword, isLoading: isLoadingChange } = useChangePassword()

  const forms = useForm<ResetPasswordType>({
    mode: 'onTouched',
    defaultValues: resetPasswordDefaultValues,
    resolver: yupResolver(isChangePassword ? changePasswordValidation : resetPasswordValidation)
  })

  const onSubmit = async (values: ResetPasswordType) => {
    if (!isChangePassword) {
      const data = { token: values.token as string, password: values.password }
      return resetPassword(data, {
        onSuccess: () => {
          forms.reset(resetPasswordDefaultValues)
          setTimeout(() => {
            navigate('/login')
          }, 1500)
        }
      })
    }

    const data = { password: values.password, confirmPassword: values.confirmPassword }
    return changePassword(data, {
      onSuccess: () => {
        forms.reset(resetPasswordDefaultValues)
        setTimeout(() => {
          navigate('/me')
        }, 1500)
      }
    })
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
            {!isChangePassword && (
              <FormField
                name="token"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-white">Kode Verifikasi</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="76d67hi" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              name="password"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Kata Sandi Baru</FormLabel>
                  <FormControl>
                    <Password {...field} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
                  </FormControl>
                  <FormMessage />
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
                    <Password {...field} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="font-semibold" type="submit" loading={isLoading || isLoadingChange}>
              Atur ulang
            </Button>
          </form>
        </Form>
      </section>
    </AuthLayout>
  )
}