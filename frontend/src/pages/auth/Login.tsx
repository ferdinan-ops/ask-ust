import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { AuthLayout } from '@/components/layouts'
import { Password, Title } from '@/components/atoms'

import { LoginType, loginValidation } from '@/lib/validations/auth.validation'
import { loginDefaultValues } from '@/lib/defaultValues'
import { useLogin, useLoginWithGoogle } from '@/store/server/useAuth'
import { titleConfig } from '@/lib/config'
import { useTitle } from '@/hooks'
import { LoginBg } from '@/assets'

const titleConf = titleConfig.login

export default function Login() {
  useTitle('Masuk')
  const navigate = useNavigate()
  const { mutate: login, isLoading } = useLogin()
  const { mutate: loginWithGoogle, isLoading: isLoadingGoogle } = useLoginWithGoogle()

  const forms = useForm<LoginType>({
    mode: 'onTouched',
    resolver: yupResolver(loginValidation),
    defaultValues: loginDefaultValues
  })

  const onSubmit = (values: LoginType) => {
    login(values, {
      onSuccess: () => {
        forms.reset(loginDefaultValues)
        navigate('/dashboard')
      }
    })
  }

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: (response) => {
      const { access_token } = response
      const payload = { token: access_token }
      loginWithGoogle(payload, {
        onSuccess: () => {
          navigate('/dashboard')
        }
      })
    }
  })

  return (
    <AuthLayout desc={titleConf.rightDesc} bgImage={LoginBg}>
      <section className="mx-auto flex w-[440px] flex-col gap-[10px]">
        <div className="flex flex-col">
          <Title heading={titleConf.heading} desc={titleConf.desc} />
        </div>
        <Button
          variant="outline"
          loading={isLoadingGoogle}
          onClick={() => handleLoginWithGoogle()}
          className="mt-4 w-full gap-[15px] py-[26px] text-primary dark:text-white"
        >
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
                    <Input {...field} type="email" placeholder="johndoe@email.com" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="font-semibold dark:text-white">Kata Sandi</FormLabel>
                    <Link
                      to="/forgot-password"
                      className="text-xs font-bold text-primary hover:underline dark:text-white"
                    >
                      Lupa kata sandi?
                    </Link>
                  </div>
                  <FormControl>
                    <Password {...field} placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
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
