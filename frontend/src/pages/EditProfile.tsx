import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'

export default function EditProfile() {
  const forms = useForm()

  const onSubmit = () => {}

  return (
    <>
      <div className="border-b pb-7 dark:border-white/10">
        <h1 className="mb-5 text-lg font-semibold md:text-xl">Pengaturan Profil</h1>
        <div className="flex items-center gap-5">
          <Button variant="outline" className="border-primary">
            Atur ulang kata sandi
          </Button>
          <Button variant="destructive">Keluar dari aplikasi</Button>
        </div>
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
          </div>
          <Button className="my-5 self-end font-semibold">Ubah data profil</Button>
        </form>
      </Form>
    </>
  )
}
