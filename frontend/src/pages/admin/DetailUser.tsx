import { Image, Loading, Title } from '@/components/atoms'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { TableButton } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import ENV from '@/lib/environment'
import { cn, formatDate, getExtension, truncateFilename } from '@/lib/utils'
import { useGetUserValidate, useUpdateValidateUser } from '@/store/server/useValidate'
import { useForm } from 'react-hook-form'
import { BsFileEarmarkPdfFill } from 'react-icons/bs'
import { HiPhoto } from 'react-icons/hi2'
import { useNavigate, useParams } from 'react-router-dom'

interface FormFields {
  isValid: boolean
  note: string
}

export default function DetailUser() {
  const navigate = useNavigate()
  const forms = useForm<FormFields>({ mode: 'onTouched' })
  const { userId } = useParams<{ userId: string }>()

  const { data: user, isSuccess } = useGetUserValidate(userId as string)
  const { mutate: update, isLoading } = useUpdateValidateUser()

  const handleSeeFile = (filename: string) => {
    window.open(`${ENV.storageUrl}/${filename}`, '_blank')
  }

  const onSubmit = (values: FormFields) => {
    if (!values.isValid && !values.note) {
      forms.setError('note', { type: 'manual', message: 'Catatan harus diisi jika data pengguna tidak valid' })
      return
    }

    const payload = {
      ...values,
      isValid: Boolean(values.isValid),
      userId: userId as string,
      validateId: user?.validate?.id as string
    }

    update(payload, { onSuccess: () => navigate('/admin') })
  }

  if (!isSuccess) return <Loading />

  return (
    <section className="mx-auto w-8/12">
      <div className="mb-10">
        <Title
          heading="Detail pengguna"
          desc="Anda perlu memeriksa seluruh data dari pengguna dan menekan tombol pada file validasi dan foto untuk melihat, lalu menentukan apakah pengguna dapat diterima sebagai bagian dari Universitas Katolik Santo Thomas atau tidak dari file tersebut"
        />
      </div>
      <div className="grid grid-cols-3 grid-rows-3 border-b pb-8">
        <Information title="Nama Lengkap">{user.fullname}</Information>
        <Information title="Username">{user.username}</Information>
        <Information title="Email">{user.email}</Information>
        <Information title="Role">{!user.is_admin && 'Pengguna'}</Information>
        <Information title="Provider">{user.provider}</Information>
        <Information title="Tanggal pendaftaran">{formatDate(user.validate?.created_at as string)}</Information>
        <Information title="Foto Profil">
          <Image src={user.photo} alt={user.fullname} provider={user.provider} className="h-12 w-12 rounded-md" />
        </Information>
        <Information title="File validasi" className="w-fit">
          <TableButton
            icon={getExtension(user.validate?.file as string) === '.pdf' ? BsFileEarmarkPdfFill : HiPhoto}
            variant={getExtension(user.validate?.file as string) === '.pdf' ? 'destructive' : 'info'}
            className="max-w-[200px]"
            onClick={() => handleSeeFile(user.validate?.file as string)}
          >
            {truncateFilename(user.validate?.file as string, 20)}
          </TableButton>
        </Information>
        <Information title="Foto validasi" className="w-fit">
          <TableButton
            icon={HiPhoto}
            variant="info"
            className="max-w-[200px]"
            onClick={() => handleSeeFile(user.validate?.photo as string)}
          >
            {truncateFilename(user.validate?.photo as string, 20)}
          </TableButton>
        </Information>
      </div>
      <div className="pt-8">
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <h2 className="text-lg font-bold">Validasi pengguna</h2>
            <FormField
              control={forms.control}
              name="isValid"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border bg-zinc-50 p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base font-semibold">Data pengguna terbukti valid</FormLabel>
                    <FormDescription>
                      Pilih opsi ini jika data pengguna terbukti valid dan dapat diterima sebagai bagian dari UNIKA
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={forms.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Catatan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Berikan catatan mengenai alasan pengguna tidak dapat diterima sebagai bagian dari UNIKA"
                      className="min-h-[150px] resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="ml-auto w-fit" loading={isLoading}>
              Kirim
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}

interface InformationProps {
  title: string
  children: React.ReactNode
  className?: string
}

function Information({ title, children, className }: InformationProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <p className="text-sm font-bold">{title}:</p>
      {children}
    </div>
  )
}
