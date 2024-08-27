import { QuestionForm, QuestionHeader } from '@/components/organism'
import { Loading } from '@/components/atoms'
import { Button } from '@/components/ui/button'
import { useGetQuestions, useUpdateQuestion } from '@/store/server/useQuestion'
import { HiArrowRight, HiPlus } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { OptionType, QuestionFormFieldsType } from '@/lib/types/question.type'

export default function Question() {
  const navigate = useNavigate()
  const { data: questions, isSuccess } = useGetQuestions()
  const { mutate: updateQuestion, isLoading } = useUpdateQuestion()

  const handleUpdateQuestion = (id: string, values: QuestionFormFieldsType) => {
    const payload = { questionId: id, ...values }
    updateQuestion(payload)
  }

  if (!isSuccess) return <Loading />

  return (
    <section className="mx-auto flex w-full flex-col md:w-8/12">
      <QuestionHeader count={questions.default.length + questions.dosen.length} />

      <div className="mt-10 flex items-center justify-between">
        <h3 className="text-sm font-semibold md:text-base">
          Total {questions.default.length + questions.dosen.length} pertanyaan
        </h3>
        <Button className="ml-auto gap-2.5" variant="outline" onClick={() => navigate('/admin/questions/create')}>
          <HiPlus className="text-xl" />
          <span>
            <span className="hidden md:inline">Tambah</span> Pertanyaan
          </span>
        </Button>
      </div>

      {questions.default.map((question) => (
        <QuestionForm
          key={question.id}
          type={question.type.toLocaleLowerCase() as OptionType}
          question={question}
          isLoading={isLoading}
          onSubmit={(values) => handleUpdateQuestion(question.id, values)}
        />
      ))}

      <div className="-mb-5 mt-5 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center md:gap-0">
        <h4 className="text-xs font-semibold md:text-sm">
          Pertanyaan default <i>(tidak dapat diubah):</i>
        </h4>
        <Button className="gap-2.5" onClick={() => navigate('/admin/lecture')}>
          <span>Atur jawaban default</span>
          <HiArrowRight />
        </Button>
      </div>

      {questions.dosen.map((question) => (
        <QuestionForm
          disabled
          key={question.id}
          question={question}
          type={question.type.toLocaleLowerCase() as OptionType}
        />
      ))}
    </section>
  )
}
