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
import { titleConfig } from '@/lib/config'
import { Title } from '@/components/atoms'

const titleConf = titleConfig.forgotPassword

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
        navigate('/reset-password')
      }
    })
  }

  return (
    <AuthLayout desc={titleConf.rightDesc} bgImage={VerifyEmailBg}>
      <section className="mx-auto flex w-[440px] flex-col gap-[10px]">
        <div className="flex flex-col">
          <Title heading={titleConf.heading} desc={titleConf.desc} />
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
