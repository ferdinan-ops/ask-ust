import { useUserInfo } from '@/store/client'
import { useGetUserValidate } from '@/store/server/useValidate'
import * as React from 'react'

export default function useGetUserRegisterInfo() {
  const { user, setUser, removeUser } = useUserInfo((state) => ({
    user: state.user,
    setUser: state.setUser,
    removeUser: state.removeUser
  }))

  const { data: userValidate, isSuccess } = useGetUserValidate(user?.id)

  React.useEffect(() => {
    if (isSuccess) {
      if (userValidate.id) {
        setUser(userValidate)
      } else if (!userValidate.id) {
        removeUser()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, userValidate?.id, setUser, removeUser])

  return user
}
