import { useTimer } from '@/hooks'
import * as React from 'react'
import Alert from '../Alert'

interface QuizTimerProps {
  isStart: boolean
  timer: {
    timeLeft: number
    isFinished: boolean
    setIsFinished: (isFinished: boolean) => void
  }

  actionAfterFinish?: () => void
}

export default function QuizTimer({ isStart, actionAfterFinish, timer }: QuizTimerProps) {
  const { formatTime } = useTimer(isStart)

  return (
    <React.Fragment>
      <div className="fixed right-3 top-3 z-50 flex flex-row items-center gap-1 rounded-lg border bg-white p-3 shadow-sm md:left-auto md:right-12 md:top-12 md:translate-x-0 md:flex-col md:p-6">
        <p className="text-xs font-medium md:text-sm">
          Waktu <span className="hidden md:inline">pengerjaan</span>:{' '}
        </p>
        <p className="text-xs font-bold text-[#08CCAE] md:text-2xl">{formatTime(timer.timeLeft)}</p>
      </div>
      <Alert
        title="Waktu sudah habis"
        desc="Waktu yang diberikan untuk mengerjakan kuis sudah habis, jawaban kamu sudah kami rekam. Tekan tombol di bawah untuk melanjutkan."
        btnText="Kirim jawaban"
        action={() => actionAfterFinish && actionAfterFinish()}
        open={timer.isFinished}
        onOpenChange={timer.setIsFinished}
        isCancel={false}
      />
    </React.Fragment>
  )
}
