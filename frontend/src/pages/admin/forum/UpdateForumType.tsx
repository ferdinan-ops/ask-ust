import { Image, Loading } from '@/components/atoms'
import Markdown from '@/components/atoms/Markdown'
import { useTitle } from '@/hooks'
import { useGetDetailForum, useUpdateForumType } from '@/store/server/useForum'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import * as React from 'react'

interface FormFields {
  isPublish: boolean
  note: string
}

export default function UpdateForumType() {
  const navigate = useNavigate()
  const { forumId } = useParams<{ forumId: string }>()
  const forms = useForm<FormFields>({ mode: 'onTouched' })

  const { data: forum, isSuccess } = useGetDetailForum(forumId as string)
  const { mutate: updateForum, isLoading: isLoadingUpdate } = useUpdateForumType()

  useTitle(`Forum - ${forum?.title}`)
  const isPublish = forms.watch('isPublish')

  React.useEffect(() => {
    if (isSuccess) {
      forms.setValue('isPublish', Boolean(forum.type === 'PUBLIC'))
      forms.setValue('note', (forum.note as string) ?? '')
    }
  }, [isSuccess, forms, forum?.type, forum?.note])

  const onSubmit = (values: FormFields) => {
    if (!values.isPublish && !values.note) {
      forms.setError('note', {
        type: 'manual',
        message: 'Catatan harus diisi jika forum dilarang untuk dipublikasikan'
      })
      return
    }

    const payload = {
      note: values.note ?? '',
      isPublish: Boolean(values.isPublish),
      forumId: forumId as string
    }

    updateForum(payload, {
      onSuccess: () => {
        navigate('/admin/forum')
      }
    })
  }

  if (!isSuccess) return <Loading />

  return (
    <section className="mx-auto md:w-8/12">
      <h1 className="mb-3.5 text-2xl font-bold md:mb-5 md:text-3xl">{forum?.title}</h1>
      <div className="text-sm font-medium leading-relaxed text-zinc-700 dark:text-zinc-400 md:text-base">
        <Markdown values={forum?.description as string} />
      </div>

      {forum.image && <Image src={forum?.image} alt={forum?.title} className="mt-6 max-w-full md:mt-8" />}

      <div className="flex flex-col gap-5 border-b pb-6 pt-6 md:flex-row md:justify-evenly md:gap-10 md:pb-8 md:pt-8">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold md:text-sm">Pemilik forum:</p>
          <div className="flex items-start gap-3">
            <div className="relative">
              <Image src={forum.user?.photo} alt={forum.user?.fullname} className="h-6 w-6 rounded-lg" />
            </div>
            <div className="flex flex-col">
              <p className="flex items-center gap-1 text-sm font-medium">
                <span className="truncate-1">{forum.user?.fullname}</span>
              </p>
              <span className="text-xs font-medium text-zinc-400 dark:text-white/40">{forum.user?.validate?.role}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold md:text-sm">Kategori forum:</p>
          <p className="w-fit rounded-md bg-zinc-200 p-2 text-sm font-bold text-zinc-700 dark:text-zinc-400 md:text-base">
            {forum.category}
          </p>
        </div>
      </div>

      <div className="pt-6 md:pt-8">
        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <h2 className="text-lg font-bold">Validasi forum</h2>
            <FormField
              name="isPublish"
              control={forms.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border bg-zinc-50 p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-semibold md:text-base">Forum terbukti layak</FormLabel>
                    <FormDescription className="text-xs md:text-sm">
                      Pilih opsi ini jika forum terbukti layak dan dapat diterima untuk dipublikasikan
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            {!isPublish && (
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
                        placeholder="Berikan catatan mengenai alasan forum tidak dapat diterima untuk dipublikasikan"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" className="ml-auto w-fit" loading={isLoadingUpdate}>
              Kirim
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}
