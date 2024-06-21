import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as React from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { AuthLayout } from '@/components/layouts'
import { Password, Title } from '@/components/atoms'

import { RegisterType, registerValidation } from '@/lib/validations/auth.validation'
import { registerDefaultValues } from '@/lib/defaultValues'
import { titleConfig } from '@/lib/config'

import { useRegister } from '@/store/server/useAuth'
import { useTerms } from '@/store/client'
import { RegisterBg } from '@/assets'
import { useTitle } from '@/hooks'

const titleConf = titleConfig.register

export default function Register() {
  useTitle('Daftar')
  const navigate = useNavigate()
  const { mutate: register, isLoading } = useRegister()

  const { terms, setTerms, registerFields, setRegisterFields } = useTerms((state) => ({
    terms: state.terms,
    setTerms: state.setTerms,
    registerFields: state.registerFields,
    setRegisterFields: state.setRegisterFields
  }))

  const forms = useForm<RegisterType>({
    mode: 'onTouched',
    resolver: yupResolver(registerValidation),
    defaultValues: registerDefaultValues
  })

  React.useEffect(() => {
    if (terms) forms.setValue('agreement', true)
  }, [terms, forms])

  React.useEffect(() => {
    if (registerFields) forms.reset(registerFields)
  }, [registerFields, forms])

  const onSubmit = (values: RegisterType) => {
    register(values, {
      onSuccess: () => {
        forms.reset(registerDefaultValues)
        setTerms(false)
        setRegisterFields(registerDefaultValues)
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
            <FormField
              name="agreement"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-[1.5px] rounded" />
                  </FormControl>
                  <FormLabel className="text-xs font-medium dark:text-white">
                    Dengan membuat akun, Anda menyetujui{' '}
                    <Link
                      to="/terms-and-conditions"
                      className="font-bold underline"
                      onClick={() => setRegisterFields(forms.getValues())}
                    >
                      Syarat, ketentuan dan kebijakan privasi
                    </Link>{' '}
                    ASK.UST.
                  </FormLabel>
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
