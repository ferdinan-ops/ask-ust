import { useUserInfo } from '@/store/client'
import * as React from 'react'
import Alert from '../Alert'

interface BannedQuizAlertProps {
  isStart: boolean
  bannedConditions: {
    condition: boolean
  }[]
  action: () => void
}

export default function BannedQuizAlert({ bannedConditions, action, isStart }: BannedQuizAlertProps) {
  const { user, setBanned } = useUserInfo((state) => ({
    user: state.user,
    setBanned: state.setBanned
  }))

  const checkConditions = React.useCallback(() => {
    bannedConditions.forEach(({ condition }) => {
      if (condition && !user.is_banned) {
        setBanned()
      }
    })
  }, [bannedConditions, user.is_banned, setBanned])

  React.useEffect(() => {
    if (isStart) checkConditions()
  }, [checkConditions, isStart])

  return (
    <Alert
      title="Maaf, Akun kamu kami banned"
      desc="Kamu telah berbuat curang dengan tidak mengikuti aturan yang telah ditetapkan sebelumnya yaitu dengan mencoba untuk menyalin soal atau beralih dari halaman kuis ini"
      btnText="ke halaman utama"
      action={action}
      open={user.is_banned}
      onOpenChange={
        user.is_banned
          ? () => {
              setBanned()
            }
          : () => {}
      }
      isCancel={false}
    />
  )
}
