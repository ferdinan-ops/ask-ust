import { HiOutlineEnvelope } from 'react-icons/hi2'
import { useForm } from 'react-hook-form'
import * as React from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { LogoutAlert } from '@/components/organism'
import { useGetMe, useUpdateMe } from '@/store/server/useUser'
import { EditUserType, editUserValidation } from '@/lib/validations/user.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useTitle } from '@/hooks'
import { editProfileDefaultValues } from '@/lib/defaultValues'

export default function EditProfile() {
  useTitle('Pengaturan')
  const navigate = useNavigate()

  const { data: user, isSuccess } = useGetMe()
  const { mutate: updateMe, isLoading } = useUpdateMe()

  const forms = useForm<EditUserType>({
    mode: 'onTouched',
    resolver: yupResolver(editUserValidation),
    defaultValues: editProfileDefaultValues
  })

  React.useEffect(() => {
    if (isSuccess) {
      forms.setValue('fullname', user?.fullname)
      forms.setValue('username', user?.username)
    }
  }, [user, isSuccess, forms])

  const onSubmit = (values: EditUserType) => {
    updateMe(values)
  }

  if (!isSuccess) return <p>Loading...</p>

  return (
    <>
      <div className="border-b pb-7 dark:border-white/10">
        <h1 className="mb-5 text-lg font-semibold md:text-xl">Pengaturan Profil</h1>
        <div className="flex items-center gap-5">
          <Button variant="outline" className="border-primary" onClick={() => navigate('/me/change-password')}>
            Atur ulang kata sandi
          </Button>
          <LogoutAlert>
            <Button variant="destructive">Keluar dari aplikasi</Button>
          </LogoutAlert>
        </div>
      </div>
      <div className="border-b py-7 dark:border-white/10">
        <h1 className="mb-5 text-lg font-semibold md:text-xl">Provider</h1>
        <Button variant="secondary" className="gap-3 bg-zinc-200 hover:bg-zinc-300">
          <HiOutlineEnvelope className="text-xl" />
          Ubah email Anda
        </Button>
      </div>
      <h1 className="mb-5 mt-7 text-lg font-semibold md:text-xl">Edit Profil</h1>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
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
          <Button className="my-5 self-end font-semibold" type="submit" loading={isLoading}>
            Ubah data profil
          </Button>
        </form>
      </Form>
    </>
  )
}
