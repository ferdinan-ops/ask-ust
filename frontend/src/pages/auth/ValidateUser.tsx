import { useForm } from 'react-hook-form'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

import { AuthLayout } from '@/components/layouts'
import { Dropzone, Title } from '@/components/atoms'

import { titleConfig } from '@/lib/config'

import { VerifyEmailBg } from '@/assets'
import { useTitle } from '@/hooks'
import { FileWithPreview } from '@/components/atoms/forms/Dropzone'

const titleConf = titleConfig.validateUser

interface FormFields {
  file: File[]
  photo: File[]
  agreement: boolean
}

export default function ValidateUser() {
  useTitle('Daftar')

  const forms = useForm<FormFields>({
    mode: 'onTouched'
  })

  const onSubmit = (values: FormFields) => {
    console.log(values)
  }

  return (
    <AuthLayout desc={titleConf.rightDesc} bgImage={VerifyEmailBg}>
      <section className="mx-auto flex w-[500px] flex-col gap-[10px]">
        <div className="flex flex-col">
          <Title heading={titleConf.heading} desc={titleConf.desc} />
        </div>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
            <FormField
              name="file"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">File validasi</FormLabel>
                  <FormControl>
                    <Dropzone
                      id="file"
                      setValue={field.onChange}
                      fileValue={field.value as FileWithPreview[]}
                      description="PDF, JPG atau PNG ukuran tidak lebih dari 10MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Upload tanda bukti bahwa kamu merupakan bagian dari Universitas Katolik Santo Thomas, seperti KRS,
                    KTM, dll
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="photo"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Foto</FormLabel>
                  <FormControl>
                    <Dropzone
                      id="file"
                      setValue={field.onChange}
                      fileValue={field.value as FileWithPreview[]}
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Persiapkan diri kamu sekarang dengan foto yang terbaik, jangan lupa untuk tersenyum!
                  </FormDescription>
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
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="rounded" />
                  </FormControl>
                  <FormLabel className="text-xs font-medium dark:text-white">
                    Gunakan foto ini sebagai foto profil akun
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="font-semibold" type="submit">
              Verifikasi
            </Button>
          </form>
        </Form>
      </section>
    </AuthLayout>
  )
}
