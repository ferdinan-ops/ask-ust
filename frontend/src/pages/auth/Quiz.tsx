/* eslint-disable no-extra-semi */
/* eslint-disable react-hooks/exhaustive-deps */
import { Loading, Video } from '@/components/atoms'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useDisableCopy, useTimer, useTitle } from '@/hooks'
import { useGetQuestionForUser } from '@/store/server/useQuestion'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import * as React from 'react'
import useTabVisibility from '@/hooks/useTabVisibility'
import { useUserInfo } from '@/store/client'
import { BannedQuizAlert, QuestionHeader, QuizForm, QuizGuide, QuizTimer } from '@/components/organism'
import { useCreateAnswers } from '@/store/server/useAnswer'
import { useNavigate } from 'react-router-dom'
import { useBannedUser } from '@/store/server/useUser'
import { toast } from '@/components/ui/use-toast'
import { uploadVideoToBucket } from '@/lib/services/supabaseClient'
import { useSendQuizRecord } from '@/store/server/useValidate'
import useRecord from '@/hooks/useRecord'

export default function Quiz() {
  useTitle('Kuis')
  const forms = useForm()
  const navigate = useNavigate()

  const { mutate: bannedUser } = useBannedUser()
  const { data: questions, isSuccess } = useGetQuestionForUser()
  const { mutateAsync: createAnswers, isSuccess: successCreate } = useCreateAnswers()
  const { mutateAsync: sendQuizRecord } = useSendQuizRecord()

  // useDisableShorcut()
  const isTryToCopy = useDisableCopy()
  const isTabActive = useTabVisibility()

  const { user, setFinishQuiz } = useUserInfo((state) => ({
    user: state.user,
    setFinishQuiz: state.setFinishQuiz
  }))

  const [openGuide, setOpenGuide] = React.useState(true)
  const [isTimerStart, setIsTimerStart] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [finishUpload, setFinishUpload] = React.useState(false)

  const { isFinished, stopTimer, timeLeft, setIsFinished } = useTimer(!openGuide && isTimerStart)
  const { blob: recordBlob, setBlob, isRecordStart, setIsRecordStart } = useRecord()

  const handleUpload = async (blob: Blob) => {
    setLoading(true)
    setFinishUpload(false)
    const file = new File([blob], 'video.mp4', { type: 'video/mp4' })
    const results = await uploadVideoToBucket(file)
    await sendQuizRecord({ userId: user.id, url: results as string })
    setFinishUpload(true)
  }

  const handleCreateAnswers = async (values: FieldValues) => {
    setIsRecordStart(false)
    setLoading(true)

    // buat menunggu selama 5 detik
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const payload = { userId: user.id, answers: values.data, validateId: user.validate?.id as string }
    await createAnswers(payload)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    await handleCreateAnswers(values)
  }

  React.useEffect(() => {
    if (user.is_banned && user.banned_type === 'QUIZ') {
      setIsRecordStart(false)
      stopTimer()
      bannedUser(user.id)
    }
  }, [user.is_banned, user.banned_type, user.id])

  React.useEffect(() => {
    if (isFinished && !user.is_banned) {
      setIsRecordStart(false)
      ;(async () => {
        await handleUpload(recordBlob as Blob)
        await handleCreateAnswers(forms.getValues())
      })()
    }
  }, [isFinished, forms, recordBlob, user.is_banned])

  React.useEffect(() => {
    if (recordBlob && !user.is_banned) (async () => await handleUpload(recordBlob as Blob))()
  }, [recordBlob, user.is_banned])

  React.useEffect(() => {
    if (successCreate && finishUpload) {
      sessionStorage.removeItem('hasReloaded')
      setFinishQuiz(true)
      setLoading(false)
      toast({
        title: 'Jawaban berhasil dikirim',
        description: 'Jawaban kamu akan diperiksa dan akunmu akan segera divalidasi'
      })
      navigate('/unverified')
    }
  }, [successCreate, finishUpload])

  if (!isSuccess) return <Loading className="min-h-screen" />

  console.log({ blob: recordBlob })

  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1180px] flex-col p-3 md:px-0 md:py-12">
      <Video isRecordingStarted={isRecordStart} onChange={setBlob} onUpload={handleUpload} />
      <QuizTimer
        isStart={!openGuide}
        timer={{ timeLeft, isFinished, setIsFinished }}
        actionAfterFinish={async () => await handleCreateAnswers(forms.getValues)}
      />
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
          sessionStorage.removeItem('hasReloaded')
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
