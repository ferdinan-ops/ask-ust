import * as React from 'react'

export default function useTimer(isStart: boolean) {
  const [isFinished, setIsFinished] = React.useState(false)
  const [timeLeft, setTimeLeft] = React.useState(15 * 60) // 15 minutes

  React.useEffect(() => {
    if (isStart) {
      const timer = setTimeout(() => {
        setIsFinished(true)
      }, 900000)

      return () => clearTimeout(timer)
    }
  }, [isStart])

  React.useEffect(() => {
    if (isStart) {
      if (timeLeft > 0) {
        const interval = setInterval(() => {
          setTimeLeft((prev) => prev - 1)
        }, 1000)
        return () => clearInterval(interval)
      } else {
        setIsFinished(true)
      }
    }
  }, [timeLeft, isStart])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return { isFinished, setIsFinished, timeLeft, formatTime }
}
