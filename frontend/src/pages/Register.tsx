import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Password } from '@/components/atoms'
import { AuthLayout } from '@/components/layouts'

import { useTitle } from '@/hooks'
import { RegisterBg } from '@/assets'
import { useRegister } from '@/store/server/useAuth'
import { registerDefaultValues } from '@/lib/defaultValues'
import { RegisterType, registerValidation } from '@/lib/validations/auth.validation'

const description =
  'Ayo mendaftar dan rajin berdiskusi di sini supaya masalah Anda cepat terselesaikan biar gak stress mulu~'

export default function Register() {
  useTitle('Daftar')
  const navigate = useNavigate()
  const { mutate: register, isLoading } = useRegister()

  const forms = useForm<RegisterType>({
    mode: 'onTouched',
    resolver: yupResolver(registerValidation),
    defaultValues: registerDefaultValues
  })

  const onSubmit = async (values: RegisterType) => {
    register(values, {
      onSuccess: () => {
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      }
    })
  }

  return (
    <AuthLayout desc={description} bgImage={RegisterBg}>
      <section className="mx-auto flex w-[440px] flex-col gap-[10px]">
        <div className="flex flex-col">
          <h2 className="text-[32px] font-bold text-primary dark:text-white">Buat akun baru</h2>
          <p className="text-sm font-medium text-zinc-500">
            Nggak susah kok, kamu cuma tinggal masukin beberapa data aja terus langsung jadi deh!
          </p>
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
