import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiOutlineArrowDownCircle, HiOutlineDocumentCheck, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2'
import * as React from 'react'
import { useToast } from '@/components/ui/use-toast'
import { OptionType, QuestionFormFieldsType, QuestionType } from '@/lib/types/question.type'

const types = [
  { value: 'text', label: 'Jawaban Singkat' },
  { value: 'radio', label: 'Pilihan Ganda' },
  { value: 'checkbox', label: 'Kotak Centang' }
]

interface QuestionFormProps {
  type: OptionType
  isLoading?: boolean
  question?: QuestionType
  disabled?: boolean
  onSubmit?: (values: QuestionFormFieldsType) => void
}

export default function QuestionForm({
  type,
  onSubmit: action,
  isLoading,
  question,
  disabled = false
}: QuestionFormProps) {
  const { toast } = useToast()
  const forms = useForm<QuestionFormFieldsType>({ mode: 'onTouched' })

  const formType = forms.watch('type')
  const answers = forms.watch('options')

  const { fields, append, remove } = useFieldArray({
    control: forms.control,
    name: 'options'
  })

  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    if (type) forms.setValue('type', type)
  }, [type, forms])

  React.useEffect(() => {
    forms.setValue('options', [{ value: '' }])
  }, [forms])

  React.useEffect(() => {
    if (question) {
      forms.setValue('text', question.text)
      forms.setValue('type', question.type.toLocaleLowerCase() as OptionType)
      forms.setValue('correctAnswer', question.correct_answers)

      if (question.type.toLocaleLowerCase() !== 'text') {
        forms.setValue('options', question.options)
      }
    }
  }, [question, forms])

  const onSubmit = (values: QuestionFormFieldsType) => {
    if (values.type !== 'text') {
      const isSameAnswer = values.options.some((option, index) =>
        values.options.some((option2, index2) => option.value === option2.value && index !== index2)
      )

      if (isSameAnswer) {
        return toast({ title: 'Opsi tidak boleh sama', variant: 'destructive' })
      }
    }

    if (values.type === 'text') values.options[0].value = 'null'
    action && action(values)
  }

  return (
    <article className="relative mt-10 overflow-hidden rounded-xl border px-4 py-3 md:px-6 md:py-5">
      <div className="absolute bottom-0 left-0 top-0 w-1 bg-primary" />
      <Form {...forms}>
        <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col gap-3 md:gap-5">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-5">
            <FormField
              name="text"
              disabled={disabled}
              control={forms.control}
              rules={{ required: 'Pertanyaan harus diisi' }}
              render={({ field }) => (
                <FormItem className="relative flex-1">
                  <FormControl>
                    <Input {...field} value={field.value ?? ''} placeholder="Pertanyaan" className="w-full" />
                  </FormControl>
                  <FormMessage className="absolute -bottom-5 left-0" />
                </FormItem>
              )}
            />

            <FormField
              name="type"
              disabled={disabled}
              control={forms.control}
              render={({ field }) => (
                <FormItem className="md:w-[200px]">
                  <Select onValueChange={field.onChange} value={field.value} disabled={disabled}>
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Pilih tipe pertanyaan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {types.map((type, index) => (
                        <SelectItem value={type.value} className="cursor-pointer font-semibold capitalize" key={index}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-2 md:gap-5">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                name={`options.${index}.value`}
                control={forms.control}
                render={({ field }) => (
                  <FormItem>
                    {formType === 'text' && (
                      <FormControl>
                        <Input {...field} placeholder="Jawaban singkat" className="max-w-md" disabled />
                      </FormControl>
                    )}

                    {formType === 'radio' && (
                      <div className="flex items-center gap-3">
                        <RadioGroup className="flex items-center gap-2">
                          <RadioGroupItem value="" />
                          <FormControl>
                            <Input {...field} placeholder="Opsi 1" className="max-w-md" />
                          </FormControl>
                        </RadioGroup>
                        {index > 0 && (
                          <Button size="icon" variant="destructive" onClick={() => remove(index)} type="button">
                            <HiOutlineTrash className="text-base" />
                          </Button>
                        )}
                      </div>
                    )}

                    {formType === 'checkbox' && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Checkbox className="rounded" />
                          <FormControl>
                            <Input {...field} placeholder="Opsi 1" className="max-w-md" />
                          </FormControl>
                        </div>
                        {index > 0 && (
                          <Button size="icon" variant="destructive" onClick={() => remove(index)} type="button">
                            <HiOutlineTrash className="text-base" />
                          </Button>
                        )}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            {formType !== 'text' && (
              <Button className="w-fit gap-2 md:text-xs" onClick={() => append({ value: '' })} type="button">
                <HiOutlinePlus className="text-base" />
                <span className="hidden md:flex">Tambah opsi</span>
              </Button>
            )}

            {!disabled && (
              <div className={cn('flex items-center gap-1 md:gap-3', formType === 'text' && 'ml-auto')}>
                <Button
                  className="w-fit gap-2 md:text-xs"
                  variant="warn"
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <HiOutlineDocumentCheck className="hidden text-base md:flex" />
                  <span>{isOpen ? 'Tutup' : 'Lihat'} jawaban</span>
                </Button>
                <Button className="w-fit gap-2 md:text-xs" variant="info" loading={isLoading}>
                  <HiOutlineArrowDownCircle className="hidden text-base md:flex" />
                  <span>Simpan</span>
                </Button>
              </div>
            )}
          </div>

          {isOpen && (
            <div className="flex flex-col gap-3 border-t pt-3">
              <p className="text-xs font-semibold text-primary/60">Pilih atau buat jawaban kamu!</p>
              {formType === 'text' && (
                <FormField
                  name="correctAnswer.0.value"
                  control={forms.control}
                  rules={{ required: 'Jawaban harus diisi' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Jawaban benar" className="max-w-md" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              {formType === 'radio' && (
                <FormField
                  name="correctAnswer.0.value"
                  control={forms.control}
                  rules={{ required: 'Jawaban harus diisi' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          className="flex flex-col gap-2.5"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          {answers.map((answer, index) => (
                            <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                              <FormControl>
                                <RadioGroupItem value={answer.value.toLocaleLowerCase()} />
                              </FormControl>
                              <FormLabel className="font-normal">{answer.value}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              {formType === 'checkbox' && (
                <FormField
                  name="correctAnswer"
                  control={forms.control}
                  rules={{ required: 'Jawaban harus diisi' }}
                  render={() => (
                    <FormItem className="flex flex-col gap-2.5">
                      {answers.map((answer, index) => (
                        <FormField
                          key={index}
                          defaultValue={{ value: answer.value, checked: false }}
                          control={forms.control}
                          name={`correctAnswer.${index}`}
                          render={({ field }) => (
                            <FormItem className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.checked}
                                  defaultChecked={false}
                                  onCheckedChange={(checked) => field.onChange({ value: answer.value, checked })}
                                  className="rounded"
                                />
                              </FormControl>
                              <FormLabel className="text-xs font-medium dark:text-white">{answer.value}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}
        </form>
      </Form>
    </article>
  )
}
