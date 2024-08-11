import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as React from 'react'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { FileButton, Image, Loading, NavToNotFound, Title } from '@/components/atoms'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

import { useGetUserValidate, useUpdateReadStatus, useUpdateValidateUser } from '@/store/server/useValidate'
import { cn, formatDate } from '@/lib/utils'
import { titleConfig } from '@/lib/config'
import { TableButton } from '@/components/ui/table'
import { HiOutlineEye } from 'react-icons/hi2'

const titleConf = titleConfig.detailUser

interface FormFields {
  isValid: boolean
  note: string
}

export default function DetailUser() {
  const navigate = useNavigate()
  const { userId } = useParams<{ userId: string }>()
  const forms = useForm<FormFields>({ mode: 'onTouched' })

  const isValid = forms.watch('isValid')

  const { data: user, isSuccess } = useGetUserValidate(userId as string)
  const { mutate: updateReadStatus, isLoading: loadingRead } = useUpdateReadStatus()
  const { mutate: updateValidateUser, isLoading: loadingValidate } = useUpdateValidateUser()

  React.useEffect(() => {
    if (isSuccess) {
      forms.setValue('isValid', Boolean(user.validate?.is_valid))
      forms.setValue('note', user.validate?.note as string)
    }
  }, [isSuccess, forms, user?.validate])

  const onSubmit = (values: FormFields) => {
    if (!values.isValid && !values.note) {
      forms.setError('note', {
        type: 'manual',
        message: 'Catatan harus diisi jika data pengguna tidak valid'
      })
      return
    }

    const payload = {
      note: values.note ?? '',
      isValid: Boolean(values.isValid),
      validateId: user?.validate?.id as string
    }

    updateValidateUser(payload, {
      onSuccess: () => {
        updateReadStatus(user?.validate?.id as string, {
          onSuccess: () => navigate('/admin/validate')
        })
      }
    })
  }

  if (!isSuccess) return <Loading />
  if (!user.id) return <NavToNotFound />

  return (
    <section className="mx-auto md:w-8/12">
      <div className="mb-5 md:mb-10">
        <Title heading={titleConf.heading} desc={titleConf.desc} />
      </div>

      <div className="grid grid-cols-1 gap-5 border-b pb-6 md:grid-cols-3 md:gap-y-6 md:pb-8">
        <Information title="Nama Lengkap">{user.fullname}</Information>
        <Information title="Username">{user.username}</Information>
        <Information title="Email">{user.email}</Information>
        <Information title="Role">{user.role}</Information>
        <Information title="Provider">{user.provider}</Information>
        <Information title="Tanggal pendaftaran">{formatDate(user.validate?.created_at as string)}</Information>
        <Information title="Foto Profil">
          <Image src={user.photo} alt={user.fullname} className="h-12 w-12 rounded-md" />
        </Information>
        <Information title="File validasi" className="w-fit">
          <FileButton filename={user.validate?.file as string} maxLetters={20} className="max-w-[200px]" />
        </Information>
        <Information title="Foto validasi" className="w-fit">
          <FileButton filename={user.validate?.photo as string} maxLetters={20} className="max-w-[200px]" />
        </Information>
        <Information title="Nilai Kuis">{user.quiz?.total} jawaban benar</Information>
        <Information title="Hasil Kuis" className="w-fit">
          <TableButton icon={HiOutlineEye} onClick={() => navigate(`/admin/questions/${user.id}`)}>
            Lihat hasil kuis
          </TableButton>
        </Information>
        <Information title="Record Kuis" className="w-fit">
          <TableButton icon={HiOutlineEye} onClick={() => window.open(user?.validate?.url_quiz_record, '_blank')}>
            Lihat rekaman kuis
          </TableButton>
        </Information>
      </div>
      <div className="pt-6 md:pt-8">
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <h2 className="text-lg font-bold">Validasi pengguna</h2>
            <FormField
              name="isValid"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border bg-zinc-50 p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-semibold md:text-base">Data pengguna terbukti valid</FormLabel>
                    <FormDescription className="text-xs md:text-sm">
                      Pilih opsi ini jika data pengguna terbukti valid dan dapat diterima sebagai bagian dari UNIKA
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            {!isValid && (
              <FormField
                name="note"
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold md:text-base">Catatan</FormLabel>
                    <FormControl>
                      <Textarea
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        className="min-h-[150px] resize-none"
                        placeholder="Berikan catatan mengenai alasan pengguna tidak dapat diterima sebagai bagian dari UNIKA"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" className="ml-auto w-fit" loading={loadingRead || loadingValidate}>
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
    <div className={cn('flex flex-col gap-1 text-sm font-medium md:text-base', className)}>
      <p className="text-xs font-bold md:text-sm">{title}:</p>
      {children}
    </div>
  )
}
