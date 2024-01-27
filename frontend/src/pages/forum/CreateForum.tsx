import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

import { useTitle } from '@/hooks'
import { forumDefaultValues } from '@/lib/defaultValues'
import { useCreateForum, useGetDetailForum, useUpdateForum } from '@/store/server/useForum'
import { ForumInputType, addForumValidation, updateForumValidation } from '@/lib/validations/forum.validation'

export default function CreateForum() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  useTitle(id ? 'Ubah Forum' : 'Buka Forum Baru')

  const { data: forum, isSuccess } = useGetDetailForum(id as string)
  const { mutate: createForum, isLoading: isLoadingCreate } = useCreateForum()
  const { mutate: updateForum, isLoading: isLoadingUpdate } = useUpdateForum()

  const forms = useForm<ForumInputType>({
    mode: 'onTouched',
    resolver: yupResolver(id ? updateForumValidation : addForumValidation),
    defaultValues: forumDefaultValues
  })

  React.useEffect(() => {
    if (isSuccess) {
      forms.setValue('description', forum?.description)
    }
  }, [isSuccess, forms, forum?.description])

  const onSuccess = () => {
    forms.reset(forumDefaultValues)
    setTimeout(() => {
      navigate(`/forum/${id}`)
    }, 1500)
  }

  const onSubmit = (data: ForumInputType) => {
    const { title, description } = data

    if (!id) {
      const createFields = { title: title as string, description }
      return createForum(createFields, { onSuccess })
    }

    const updateFields = { description, forumId: id as string }
    updateForum(updateFields, { onSuccess })
  }

  return (
    <section className="mx-auto w-8/12">
      <h1 className="mb-5 text-2xl font-bold">{id ? 'Ubah Forum' : 'Buka Forum Baru'}</h1>
      <p className="-mt-3 text-[15px]">Silahkan isi seluruh form yang disediakan yah...</p>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
          {!id && (
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
          )}
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
          <Button className="ml-auto w-fit font-semibold" type="submit" loading={isLoadingCreate || isLoadingUpdate}>
            Submit
          </Button>
        </form>
      </Form>
    </section>
  )
}
