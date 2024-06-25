import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { HiOutlineArrowLeftOnRectangle, HiOutlineLockClosed } from 'react-icons/hi2'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { useUserInfo } from '@/store/client'
import { useUpdateMe } from '@/store/server/useUser'

import { editProfileDefaultValues } from '@/lib/defaultValues'
import { EditUserType, editUserValidation } from '@/lib/validations/user.validation'
import { useTitle } from '@/hooks'
import { UserType } from '@/lib/types/user.type'
import { EditEmail, LogoutAlert, UploadPhoto } from '@/components/organism'
import { Title } from '@/components/atoms'

export default function Settings() {
  useTitle('User Settings')
  const navigate = useNavigate()
  const user = useUserInfo((state) => state.user)

  const { mutate: updateMe, isLoading } = useUpdateMe()

  const forms = useForm<EditUserType>({
    mode: 'onTouched',
    resolver: yupResolver(editUserValidation),
    defaultValues: editProfileDefaultValues
  })

  React.useEffect(() => {
    forms.setValue('fullname', user?.fullname as string)
    forms.setValue('username', user?.username as string)
  }, [user, forms])

  const onSubmit = (values: EditUserType) => {
    updateMe(values)
  }

  return (
    <section className="mx-auto xl:w-7/12">
      <Title
        heading="Ubah Profil"
        desc="Atur informasi profil Anda disini. Anda dapat mengubah nama lengkap dan username, foto profil yang telah terdaftarkan dalam sistem sebelumnya. "
      />

      <section className="mt-16 flex flex-col items-center border-b pb-10 md:mt-28">
        <UploadPhoto user={user as UserType} />
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="col-span-1 flex w-full flex-col gap-5">
            <FormField
              name="fullname"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Fullname</FormLabel>
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
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="john.doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="ml-auto w-fit text-[13px]" loading={isLoading}>
              Save Changes
            </Button>
          </form>
        </Form>
      </section>

      <section className="pt-10">
        <Title
          heading="Pengaturan Profil"
          desc="Anda dapat mengatur ulang kata sandi, mengubah email yang tertaut pada akun Anda daftarkan sebelumnya, dan keluar dari aplikasi ini"
        />
        <div className="mt-6 flex flex-col gap-3 md:w-fit md:flex-row">
          <Button
            variant="outline"
            onClick={() => navigate('/me/change-password')}
            className="text-font gap-2.5 border-zinc-300 text-[13px]"
          >
            <HiOutlineLockClosed className="text-xl" />
            Atur ulang kata sandi
          </Button>
          <EditEmail email={user?.email as string} />
          <LogoutAlert>
            <Button variant="destructive" className="gap-2.5 text-[13px]">
              <HiOutlineArrowLeftOnRectangle className="text-xl" />
              Keluar dari aplikasi
            </Button>
          </LogoutAlert>
        </div>
      </section>
    </section>
  )
}
