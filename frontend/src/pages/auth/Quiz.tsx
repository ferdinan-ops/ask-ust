/* eslint-disable react-hooks/exhaustive-deps */
import { Loading, Video } from '@/components/atoms'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useDisableCopy, useDisableShorcut, useTimer, useTitle } from '@/hooks'
import { useGetQuestionForUser } from '@/store/server/useQuestion'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import * as React from 'react'
import useTabVisibility from '@/hooks/useTabVisibility'
import { useUserInfo } from '@/store/client'
import { BannedQuizAlert, QuestionHeader, QuizForm, QuizGuide, QuizTimer } from '@/components/organism'
import { useCreateAnswers } from '@/store/server/useAnswer'
import { useNavigate } from 'react-router-dom'
import { useSendQuizRecord } from '@/store/server/useValidate'
import useRecord from '@/hooks/useRecord'
import { useBannedUser } from '@/store/server/useUser'
import { uploadVideoToBucket } from '@/lib/services/supabaseClient'
import { toast } from '@/components/ui/use-toast'

export default function Quiz() {
  useTitle('Kuis')
  const forms = useForm()
  const navigate = useNavigate()

  const { mutate: bannedUser } = useBannedUser()
  const { data: questions, isSuccess } = useGetQuestionForUser()
  const { mutateAsync: createAnswers } = useCreateAnswers()
  const { mutateAsync: sendQuizRecord } = useSendQuizRecord()

  useDisableShorcut()
  const isTryToCopy = useDisableCopy()
  const isTabActive = useTabVisibility()

  const { user, setFinishQuiz } = useUserInfo((state) => ({
    user: state.user,
    setFinishQuiz: state.setFinishQuiz
  }))

  const [openGuide, setOpenGuide] = React.useState(true)
  const [isTimerStart, setIsTimerStart] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const { isFinished } = useTimer(!openGuide && isTimerStart)
  const { blob, setBlob, isRecordStart, setIsRecordStart } = useRecord()

  React.useEffect(() => {
    if (user.is_banned && user.banned_type === 'QUIZ') {
      setIsTimerStart(false)
      setIsRecordStart(false)
      bannedUser(user.id)
    }
  }, [user.is_banned, user.banned_type, setIsTimerStart, user.id, bannedUser, setIsRecordStart])

  React.useEffect(() => {
    if (isFinished) {
      setIsRecordStart(false)
      ;(async () => {
        await handleCreateAnswers(forms.getValues())
      })()
    }
  }, [isFinished, forms])

  const handleUpload = async (blob: Blob) => {
    const file = new File([blob], 'video.mp4', { type: 'video/mp4' })
    const results = await uploadVideoToBucket(file)
    await sendQuizRecord({ userId: user.id, url: results as string })
  }

  const handleCreateAnswers = React.useCallback(
    async (values: FieldValues) => {
      setIsRecordStart(false)
      setLoading(true)

      const payload = { userId: user.id, answers: values.data }
      await createAnswers(payload)
      await handleUpload(blob as Blob)

      setFinishQuiz(true)
      setLoading(false)
      toast({
        title: 'Jawaban berhasil dikirim',
        description: 'Jawaban kamu akan diperiksa dan akunmu akan segera divalidasi'
      })
      navigate('/unverified')
    },
    [blob, createAnswers, handleUpload, navigate, setFinishQuiz, setIsRecordStart, user.id]
  )

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    await handleCreateAnswers(values)
  }

  const handleSubmit = async () => {
    const values = forms.getValues()
    await handleCreateAnswers(values)
  }

  if (!isSuccess) return <Loading className="min-h-screen" />

  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1180px] flex-col p-3 md:px-0 md:py-12">
      <Video isRecordingStarted={isRecordStart} onChange={setBlob} onUpload={handleUpload} />
      <QuizTimer isStart={!openGuide} actionAfterFinish={handleSubmit} />
      <QuizGuide
        open={openGuide}
        onOpenChange={setOpenGuide}
        action={() => {
          setIsTimerStart(true)
          setOpenGuide(false)
          setIsRecordStart(true)
        }}
      />

      <BannedQuizAlert
        isStart={!openGuide}
        bannedConditions={[{ condition: !isTabActive }, { condition: isTryToCopy }]}
        action={() => {
          setFinishQuiz(true)
          setIsRecordStart(false)
          navigate('/')
        }}
      />

      <section className="mx-auto flex w-full flex-col md:w-8/12">
        <QuestionHeader count={questions.default.length + questions.dosen.length} />

        <Form {...forms}>
          <form onSubmit={forms.handleSubmit(onSubmit)} className="flex flex-col">
            {questions.default.map((question, index) => (
              <QuizForm key={question.id} name={`data.${index}`} formControl={forms.control} question={question} />
            ))}

            {questions.dosen.map((question, index) => (
              <QuizForm
                key={question.id}
                question={question}
                formControl={forms.control}
                name={`data.${questions.default.length + index}`}
              />
            ))}

            <Button className="ml-auto mt-5" loading={loading}>
              Submit
            </Button>
          </form>
        </Form>
      </section>
    </main>
  )
}
