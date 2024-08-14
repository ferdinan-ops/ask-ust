import * as React from 'react'

export default function useTimer(isStart: boolean) {
  const [isFinished, setIsFinished] = React.useState(false)
  const [timeLeft, setTimeLeft] = React.useState(15 * 60) // 15 minutes
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  // React.useEffect(() => {
  //   if (isStart) {
  //     const timer = setTimeout(() => {
  //       setIsFinished(true)
  //     }, 900000)

  //     return () => clearTimeout(timer)
  //   }
  // }, [isStart])

  // React.useEffect(() => {
  //   if (isStart) {
  //     if (timeLeft > 0) {
  //       const interval = setInterval(() => {
  //         setTimeLeft((prev) => prev - 1)
  //       }, 1000)
  //       return () => clearInterval(interval)
  //     } else {
  //       setIsFinished(true)
  //     }
  //   }
  // }, [timeLeft, isStart])

  React.useEffect(() => {
    if (isStart && timeLeft > 0 && !isFinished) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!)
            setIsFinished(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(intervalRef.current!)
    }
  }, [isStart, timeLeft, isFinished])

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return { isFinished, setIsFinished, timeLeft, formatTime, stopTimer }
}
