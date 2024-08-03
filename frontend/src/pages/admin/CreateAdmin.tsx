import { Title, Password } from '@/components/atoms'
import { registerValidation } from '@/lib/validations/auth.validation'
import { useCreateAdmin, useGetAdminById, useUpdateAdmin } from '@/store/server/useUser'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { editAdminValidation } from '@/lib/validations/user.validation'
import { AdminFormType } from '@/lib/types/user.type'
import * as React from 'react'

export default function CreateAdmin() {
  const navigate = useNavigate()
  const { userId } = useParams<{ userId: string }>()

  const { mutate: register, isLoading } = useCreateAdmin()
  const { mutate: updateAdmin, isLoading: isLoadingUpdate } = useUpdateAdmin()
  const { data: admin, isSuccess } = useGetAdminById(userId as string)

  const forms = useForm<AdminFormType>({
    mode: 'onTouched',
    resolver: yupResolver(userId ? editAdminValidation : registerValidation)
  })

  React.useEffect(() => {
    if (isSuccess) {
      forms.setValue('fullname', admin?.fullname)
      forms.setValue('username', admin?.username)
      forms.setValue('email', admin?.email)
    }
  }, [isSuccess, forms, admin])

  const onSubmit = (values: AdminFormType) => {
    if (!userId) {
      const data = {
        password: values.password as string,
        confirmPassword: values.confirmPassword as string,
        ...values
      }

      return register(data, {
        onSuccess: () => {
          forms.reset()
          navigate('/admin/all')
        }
      })
    }

    updateAdmin({ userId, payload: values })
  }

  return (
    <section className="mx-auto w-full md:w-8/12">
      <Title
        heading={userId ? 'Ubah Admin' : 'Tambah Admin'}
        desc="Silahkan isi form di bawah ini untuk menambahkan admin baru."
      />

      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-10 flex flex-col gap-5">
          <div className="flex flex-col gap-3 md:flex-row">
            <FormField
              name="fullname"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-semibold dark:text-white">Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="John Doe" />
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
                    <Input {...field} value={field.value ?? ''} placeholder="john.doe" />
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
                  <Input {...field} value={field.value ?? ''} type="email" placeholder="johndoe@email.com" />
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
                  <Password
                    {...field}
                    value={field.value ?? ''}
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  />
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
                  <Password
                    {...field}
                    value={field.value ?? ''}
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="ml-auto w-fit font-semibold" type="submit" loading={isLoading || isLoadingUpdate}>
            {userId ? 'Ubah' : 'Tambah'}
          </Button>
        </form>
      </Form>
    </section>
  )
}
