import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { AuthLayout } from '@/components/layouts'
import { Password, Title } from '@/components/atoms'

import { RegisterType, registerValidation } from '@/lib/validations/auth.validation'
import { registerDefaultValues } from '@/lib/defaultValues'
import { useRegister } from '@/store/server/useAuth'
import { RegisterBg } from '@/assets'
import { useTitle } from '@/hooks'
import { titleConfig } from '@/lib/config'

const titleConf = titleConfig.register

export default function Register() {
  useTitle('Daftar')
  const navigate = useNavigate()
  const { mutate: register, isLoading } = useRegister()

  const forms = useForm<RegisterType>({
    mode: 'onTouched',
    resolver: yupResolver(registerValidation),
    defaultValues: registerDefaultValues
  })

  const onSubmit = (values: RegisterType) => {
    register(values, {
      onSuccess: () => {
        forms.reset(registerDefaultValues)
        navigate('/verify-email')
      }
    })
  }

  return (
    <AuthLayout desc={titleConf.rightDesc} bgImage={RegisterBg}>
      <section className="mx-auto flex w-[440px] flex-col gap-[10px]">
        <div className="flex flex-col">
          <Title heading={titleConf.heading} desc={titleConf.desc} />
        </div>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-3 md:flex-row">
              <FormField
                name="fullname"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="username"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="john.doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <FormField
              name="password"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Kata Sandi</FormLabel>
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
            <Button className="font-semibold" type="submit" loading={isLoading}>
              Daftar
            </Button>
          </form>
        </Form>
        <p className="mt-7 text-center text-[15px] font-semibold text-zinc-500 dark:text-zinc-400">
          Udah punya akun?{' '}
          <Link to="/login" className="text-primary hover:underline dark:text-white">
            Login!
          </Link>
        </p>
      </section>
    </AuthLayout>
  )
}
