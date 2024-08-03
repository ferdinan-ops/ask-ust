import { Loading } from '@/components/atoms'
import { QuestionHeader } from '@/components/organism'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { useGetAnswers } from '@/store/server/useAnswer'
import { useGetUserValidate } from '@/store/server/useValidate'
import { HiCheck, HiXMark } from 'react-icons/hi2'
import { Navigate, useLocation, useParams } from 'react-router-dom'

export default function UserAnswer() {
  const location = useLocation()
  const { userId } = useParams<{ userId: string }>()
  const { data: answers, isSuccess, isError } = useGetAnswers(userId as string)
  const { data: user, isSuccess: isSuccessValidate } = useGetUserValidate(userId as string)

  if (!isSuccess || !isSuccessValidate) return <Loading />
  if (isError) return <Navigate to="/404" replace state={{ from: location }} />

  return (
    <section className="mx-auto flex w-full flex-col md:w-8/12">
      <QuestionHeader count={answers.length} />

      <article className="ml-auto mt-8 w-fit rounded-md bg-[#08CCAE] p-3 text-white">
        <h3 className="font-semibold">
          Skor: {user.quiz?.total}/{answers.length}
        </h3>
      </article>
      {answers.map((item) => (
        <article className="flex flex-col" key={item.id}>
          <div className="relative mt-10 overflow-hidden rounded-xl border px-4 py-3 md:px-6 md:py-5">
            <div className="absolute bottom-0 left-0 top-0 w-1 bg-primary" />
            <div className="flex flex-col gap-3 md:gap-5">
              <p className="text-xs font-medium leading-relaxed md:text-sm">{item.question.text}</p>
              <div className="flex flex-col gap-2 md:gap-5">
                {item.question.type === 'TEXT' && (
                  <Input
                    value={item.answer as string}
                    disabled
                    placeholder="Isi jawaban dengan benar"
                    className={cn(
                      'max-w-md rounded-none border-x-0 border-t-0 bg-zinc-100 text-[11px] ring-0 md:text-[13px]',
                      'border-b focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    )}
                  />
                )}

                {item.question.type === 'RADIO' && (
                  <RadioGroup disabled className="flex flex-col gap-2.5 md:gap-4" value={item.answer as string}>
                    {item.question.options.map((answer, index) => (
                      <div className="flex items-center space-x-3 space-y-0" key={index}>
                        <RadioGroupItem value={answer.value.toLocaleLowerCase()} />
                        <Label className="cursor-pointer text-[11px] font-medium dark:text-white md:text-xs">
                          {answer.value}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {item.question.type === 'CHECKBOX' && (
                  <div className="flex flex-col gap-1 md:gap-2.5">
                    {(Array.isArray(item.answer) ? item.answer : []).map((answer, i) => (
                      <div className="flex items-start space-x-3 space-y-0" key={i}>
                        <Checkbox disabled checked={answer.checked} defaultChecked={false} className="rounded" />
                        <Label className="cursor-pointer text-[11px] font-medium dark:text-white md:text-xs">
                          {answer.value}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={cn(
                    'flex w-fit items-center gap-2 rounded-md p-2',
                    item.is_correct ? 'bg-green-300 text-green-500' : 'bg-red-300 text-red-500'
                  )}
                >
                  {item.is_correct ? <HiCheck className="text-lg" /> : <HiXMark className="text-lg" />}
                  <span className="text-sm font-semibold">{item.is_correct ? 'Benar' : 'Salah'}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
