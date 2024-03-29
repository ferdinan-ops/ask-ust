import { useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as React from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { ForumInputType, addForumValidation, updateForumValidation } from '@/lib/validations/forum.validation'
import { useCreateForum, useGetDetailForum, useUpdateForum } from '@/store/server/useForum'
import { forumDefaultValues } from '@/lib/defaultValues'
import { ForumType } from '@/lib/types/forum.type'
import { useTitle } from '@/hooks'
import { BackButton, Title } from '@/components/atoms'
import { titleConfig } from '@/lib/config'

const titleConf = titleConfig.createForum

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
    if (isSuccess) forms.setValue('description', forum?.description)
  }, [isSuccess, forms, forum?.description])

  React.useEffect(() => {
    if (!id) forms.reset(forumDefaultValues)
  }, [id, forms])

  const onSuccess = (data: ForumType) => {
    forms.reset(forumDefaultValues)
    navigate(`/forums/${data.id}`)
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
    <section className="mx-auto w-full md:w-8/12">
      <BackButton />
      <Title heading={id ? titleConf.heading.update : titleConf.heading.create} desc={titleConf.desc} />

      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5 md:mt-8">
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
