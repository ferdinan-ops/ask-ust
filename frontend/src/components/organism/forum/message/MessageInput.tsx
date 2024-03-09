import * as React from 'react'
import { Input } from '@/components/ui/input'
import { UploadFile } from '../..'
import { Button } from '@/components/ui/button'
import { HiOutlinePaperAirplane } from 'react-icons/hi2'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useEditMessage, useSendMessage } from '@/store/server/useMessage'

interface MessageInputProps {
  forumId: string
  messageId?: string
  content?: string
}

type FormFields = {
  content: string
}

export default function MessageInput({ forumId, content, messageId }: MessageInputProps) {
  const forms = useForm<FormFields>()
  const { mutate: sendMessage, isLoading } = useSendMessage()
  const { mutate: editMessage, isLoading: isLoadingEdit } = useEditMessage()

  React.useEffect(() => {
    if (content) forms.setValue('content', content)
  }, [content, forms])

  const onSuccess = () => {
    forms.reset({ content: '' })
  }

  const onSubmit = (values: FormFields) => {
    const fields = { ...values, forumId }
    if (!content) return sendMessage(fields, { onSuccess })
    editMessage({ messageId: messageId as string, ...fields }, { onSuccess })
  }

  const handleSendClick = () => {
    const content = forms.getValues('content')
    if (content) onSubmit({ content })
  }

  return (
    <div className="sticky bottom-0 mt-auto flex w-full items-center justify-between gap-2 self-end bg-[#F7F9FB] px-3 py-2 dark:bg-white/5 md:gap-4 md:px-5 md:py-[13px]">
      <div>
        <UploadFile forumId={forumId} />
      </div>
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="w-full">
          <FormField
            name="content"
            control={forms.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full border-none bg-transparent p-0 outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent"
                    placeholder="Ketik pesan"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div>
        <Button variant="messageIcon" size="icon" loading={isLoading || isLoadingEdit} onClick={handleSendClick}>
          <HiOutlinePaperAirplane className="text-lg md:text-xl" />
        </Button>
      </div>
    </div>
  )
}
