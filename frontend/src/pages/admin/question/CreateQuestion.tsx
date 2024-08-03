import { Title } from '@/components/atoms'
import { QuestionForm } from '@/components/organism'
import { useTitle } from '@/hooks'
import { QuestionFormFieldsType } from '@/lib/types/question.type'
import { useCreateQuestion } from '@/store/server/useQuestion'
import { useNavigate } from 'react-router-dom'

export default function CreateQuestion() {
  useTitle('Tambah Pertanyaan')
  const navigate = useNavigate()
  const { mutate: createQuestion, isLoading } = useCreateQuestion()

  const handleCreate = (values: QuestionFormFieldsType) => {
    createQuestion(values, {
      onSuccess: () => {
        navigate('/admin/questions')
      }
    })
  }

  return (
    <section className="mx-auto flex w-full flex-col md:w-8/12">
      <Title heading="Tambah Pertanyaan" desc="Tambahkan pertanyaan baru untuk kuis seberapa UNIKA kah kamu?" />
      <QuestionForm type="radio" onSubmit={handleCreate} isLoading={isLoading} />
    </section>
  )
}
