import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { AuthLayout } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { VerifyEmailType, verifyEmailValidation } from '@/lib/validations/auth.validation'
import { useVerifyEmail } from '@/store/server/useAuth'
import { VerifyEmailBg } from '@/assets'
import { useTitle } from '@/hooks'
import { titleConfig } from '@/lib/config'
import { Title } from '@/components/atoms'

const titleConf = titleConfig.verifyEmail

export default function VerifyEmail() {
  useTitle('Verifikasi Email')
  const navigate = useNavigate()
  const { mutate: verifyEmail, isLoading } = useVerifyEmail()

  const forms = useForm<VerifyEmailType>({
    mode: 'onTouched',
    resolver: yupResolver(verifyEmailValidation),
    defaultValues: { token: '' }
  })

  const onSubmit = (values: VerifyEmailType) => {
    verifyEmail(values.token, {
      onSuccess: () => {
        forms.reset({ token: '' })
        navigate('/login')
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
