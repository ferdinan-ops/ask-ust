import { useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

import { AuthLayout } from '@/components/layouts'
import { Camera, Dropzone, Title } from '@/components/atoms'

import { titleConfig } from '@/lib/config'

import { VerifyEmailBg } from '@/assets'
import { useTitle } from '@/hooks'
import { FileWithPreview } from '@/components/atoms/forms/Dropzone'
import { useStoreValidateUser } from '@/store/server/useValidate'
import { useNavigate } from 'react-router-dom'
import { base64ToFile } from '@/lib/utils'
import { ValidateDataGuide } from '@/components/organism'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

const titleConf = titleConfig.validateUser

interface FormFields {
  role: string
  moreRole?: string
  file: File[]
  photo: string
  agreement: boolean
}

const roles = ['mahasiswa', 'dosen', 'karyawan', 'lainnya']

export default function ValidateUser() {
  useTitle('Validasi Akun')
  const navigate = useNavigate()

  const forms = useForm<FormFields>({ mode: 'onTouched' })
  const { mutate: storeValidateUser, isLoading } = useStoreValidateUser()

  const role = forms.watch('role')

  const onSubmit = async (values: FormFields) => {
    const photo = await base64ToFile(values.photo as string)

    const payload = { ...values, photo: [photo] }
    if (role === 'lainnya') {
      payload.role = values.moreRole?.toLocaleLowerCase() as string
    }

    storeValidateUser(payload, {
      onSuccess: () => {
        navigate('/quiz')
      }
    })
  }

  return (
    <AuthLayout desc={titleConf.rightDesc} bgImage={VerifyEmailBg}>
      <ValidateDataGuide />
      <section className="mx-auto flex w-[500px] flex-col gap-[10px]">
        <div className="flex flex-col">
          <Title heading={titleConf.heading} desc={titleConf.desc} />
        </div>
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
            <FormField
              name="role"
              control={forms.control}
              rules={{ required: 'Peran kamu harus diisi' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Siapa kamu?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Pilih peran kamu di universitas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role, index) => (
                        <SelectItem key={index} value={role} className="cursor-pointer font-semibold capitalize">
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {role === 'lainnya' && (
              <FormField
                name="moreRole"
                control={forms.control}
                rules={role === 'lainnya' ? { required: 'Peran kamu harus diisi' } : undefined}
                render={({ field }) => (
                  <FormItem className="-mt-3">
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} placeholder="Peran lainnya" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              name="file"
              control={forms.control}
              rules={{ required: 'File validasi harus diisi' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">File validasi</FormLabel>
                  <FormControl>
                    <Dropzone
                      id="file"
                      setValue={field.onChange}
                      fileValue={field.value as FileWithPreview[]}
                      description="PDF, JPG atau PNG ukuran tidak lebih dari 10MB"
                      accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'application/pdf': ['.pdf'] }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="photo"
              control={forms.control}
              rules={{ required: 'Foto harus diisi' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold dark:text-white">Foto</FormLabel>
                  <FormControl>
                    <Camera value={field.value ?? ''} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
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
            /> */}
            <Button className="font-semibold" type="submit" loading={isLoading}>
              Verifikasi
            </Button>
          </form>
        </Form>
      </section>
    </AuthLayout>
  )
}
