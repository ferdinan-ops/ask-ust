import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { AuthLayout } from '@/components/layouts'
import { Password, Title } from '@/components/atoms'

import { ResetPasswordType, resetPasswordValidation } from '@/lib/validations/auth.validation'
import { ResetPasswordBg } from '@/assets'
import { useTitle } from '@/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordDefaultValues } from '@/lib/defaultValues'
import { useResetPassword } from '@/store/server/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { changePasswordValidation } from '@/lib/validations/user.validation'
import { useChangePassword } from '@/store/server/useUser'
import { titleConfig } from '@/lib/config'

const description = 'Biar nanti nggak lupa lagi sama kata sandinya, disimpen di password manager ya, bang!'
const CHANGE_PASSWORD = '/me/change-password'
const titleConf = titleConfig.resetPassword

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
          navigate('/login')
        }
      })
    }

    const data = { password: values.password, confirmPassword: values.confirmPassword }
    return changePassword(data, {
      onSuccess: () => {
        forms.reset(resetPasswordDefaultValues)
        navigate('/me')
      }
    })
  }

  return (
    <AuthLayout desc={titleConf.rightDesc} bgImage={ResetPasswordBg}>
      <section className="mx-auto flex w-[440px] flex-col gap-[10px]">
        <div className="flex flex-col">
          <Title heading={titleConf.heading} desc={description} />
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
