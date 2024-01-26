import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { AuthLayout } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { LoginType, loginValidation } from '@/lib/validations/auth.validation'
import { loginDefaultValues } from '@/lib/defaultValues'
import { useLogin } from '@/store/server/useAuth'
import { useTitle } from '@/hooks'
import { LoginBg } from '@/assets'

const description = 'Diskusi secara online semakin mudah – tetap berdiskusi walaupun pake kuota dari Kemendikbud hehe ~'

export default function Login() {
  useTitle('Masuk')
  const navigate = useNavigate()
  const { mutate: login, isLoading } = useLogin()

  const forms = useForm<LoginType>({
    mode: 'onTouched',
    resolver: yupResolver(loginValidation),
    defaultValues: loginDefaultValues
  })

  const onSubmit = (values: LoginType) => {
    login(values, {
      onSuccess: () => {
        forms.reset(loginDefaultValues)
        setTimeout(() => {
          navigate('/dashboard')
        }, 1500)
      }
    })
  }

  return (
    <AuthLayout desc={description} bgImage={LoginBg}>
      <section className="mx-auto flex w-[440px] flex-col gap-[10px]">
        <div className="flex flex-col">
          <h2 className="text-[32px] font-bold text-primary dark:text-white">Masuk ke akun kamu</h2>
          <p className="text-sm font-medium text-zinc-500">
            Ajukan pertanyaanmu dengan mudah di ask.UST, mulai temukan solusi dari masalah kamu!
          </p>
        </div>
        <Button variant="outline" className="mt-4 w-full gap-[15px] py-[26px] text-primary dark:text-white">
          <FcGoogle className="text-2xl" />
          <span className="font-semibold">Login with Google</span>
        </Button>
        <div className="my-3 flex items-center justify-between gap-[11px]">
          <div className="h-[2px] w-full rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="font-semibold text-gray-600 dark:text-zinc-300">or</span>
          <div className="h-[2px] w-full rounded-full bg-zinc-300 dark:bg-zinc-700" />
        </div>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormField
              name="email"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Masukkan email kamu" />
                  </FormControl>
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
                    <Input {...field} type="password" placeholder="Masukkan password kamu" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="font-semibold" type="submit" loading={isLoading}>
              Masuk
            </Button>
          </form>
        </Form>
        <p className="mt-7 text-center text-[15px] font-semibold text-zinc-500 dark:text-zinc-400">
          Belum punya akun?{' '}
          <Link to="/register" className="text-primary hover:underline dark:text-white">
            Daftar sekarang, gratis!
          </Link>
        </p>
      </section>
    </AuthLayout>
  )
}
