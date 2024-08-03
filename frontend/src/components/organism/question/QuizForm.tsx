import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { QuestionType } from '@/lib/types/question.type'
import { cn } from '@/lib/utils'
import { Control, FieldValues } from 'react-hook-form'

interface QuizFormProps {
  name: string
  question: QuestionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<FieldValues, any>
}

export default function QuizForm({ name, question, formControl }: QuizFormProps) {
  return (
    <article className="relative mt-10 overflow-hidden rounded-xl border px-4 py-3 md:px-6 md:py-5" key={question.id}>
      <div className="absolute bottom-0 left-0 top-0 w-1 bg-primary" />
      <div className="flex flex-col gap-3 md:gap-5">
        <p className="text-xs font-medium leading-relaxed md:text-sm">{question.text}</p>
        <div className="flex flex-col gap-2 md:gap-5">
          {question.type === 'TEXT' && (
            <FormField
              name={name}
              control={formControl}
              defaultValue={{ questionId: question.id, answer: '' }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value?.answer ?? ''}
                      onChange={(e) => field.onChange({ questionId: question.id, answer: e.target.value })}
                      placeholder="Isi jawaban dengan benar"
                      className={cn(
                        'max-w-md rounded-none border-x-0 border-t-0 bg-zinc-100 text-[11px] ring-0 md:text-[13px]',
                        'border-b focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                      )}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          {question.type === 'RADIO' && (
            <FormField
              name={name}
              control={formControl}
              defaultValue={{ questionId: question.id, answer: '' }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="flex flex-col gap-2.5 md:gap-4"
                      onValueChange={(value) => field.onChange({ questionId: question.id, answer: value })}
                      value={
                        field.value?.answer
                          ? question.options.find((option) => option.value === field.value?.answer)?.value
                          : ''
                      }
                    >
                      {question.options.map((answer, index) => (
                        <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                          <FormControl>
                            <RadioGroupItem value={answer.value.toLocaleLowerCase()} />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-[11px] font-medium dark:text-white md:text-xs">
                            {answer.value}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          {question.type === 'CHECKBOX' && (
            <FormField
              name={name}
              control={formControl}
              defaultValue={{ questionId: question.id, answer: [] }}
              render={() => (
                <FormItem className="flex flex-col gap-1 md:gap-2.5">
                  {question.options.map((answer, i) => (
                    <FormField
                      key={i}
                      defaultValue={{ value: answer.value, checked: false }}
                      control={formControl}
                      name={`${name}.answer.${i}`}
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
                          <FormLabel className="cursor-pointer text-[11px] font-medium dark:text-white md:text-xs">
                            {answer.value}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
    </article>
  )
}
