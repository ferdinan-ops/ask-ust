import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'

export default function CreateForum() {
  const forms = useForm()

  const onSubmit = () => {}

  return (
    <section className="mx-auto w-8/12">
      <h1 className="mb-5 text-2xl font-bold">Buka Forum Baru</h1>
      <p className="-mt-3 text-[15px]">Silahkan isi seluruh form yang disediakan yah...</p>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          <FormField
            name="title"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-semibold dark:text-white">Nama</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Teknologi" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={forms.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-semibold dark:text-white">Deskripsi singkat</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Forum teknologi adalah platform online di mana pengguna dapat berbagi seputar perkembangan teknologi "
                    className="min-h-[150px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="ml-auto w-fit font-semibold">Submit</Button>
        </form>
      </Form>
    </section>
  )
}
