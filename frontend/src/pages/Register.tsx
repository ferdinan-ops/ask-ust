import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { AuthLayout } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { RegisterBg } from '@/assets'
import { useTitle } from '@/hooks'

const description =
  'Ayo mendaftar dan rajin berdiskusi di sini supaya masalah Anda cepat terselesaikan biar gak stress mulu~'

type FormValues = {
  fullname: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

export default function Register() {
  useTitle('Daftar')
  const forms = useForm<FormValues>({ mode: 'onTouched' })

  const onSubmit = async (values: FormValues) => {
    console.log(values)
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
            <div className="flex gap-3">
              <FormField
                name="fullname"
                control={forms.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="font-semibold dark:text-white">Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" />
                    </FormControl>
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
                    <Input {...field} type="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
                  </FormControl>
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
                    <Input {...field} type="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="font-semibold">Daftar</Button>
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
