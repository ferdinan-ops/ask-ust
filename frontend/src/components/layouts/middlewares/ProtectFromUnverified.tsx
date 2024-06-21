import * as React from 'react'
import { useUserInfo } from '@/store/client'
import { useGetUserValidate } from '@/store/server/useValidate'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface ProtectedFromUnverifiedProps {
  type?: 'validate' | 'default' | 'unverified'
}

export default function ProtectedFromUnverified({ type = 'default' }: ProtectedFromUnverifiedProps) {
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
  }, [isSuccess, setUser, userValidate, removeUser])

  console.log(userValidate)

  if (type === 'default') {
    if (user) {
      if (!user?.validate) return <Nav to="/validate" />
      if (!user?.validate?.is_valid) return <Nav to="/unverified" />
    }
  }

  if (type === 'validate') {
    if (!user) return <Nav to="/register" />
    if (user?.validate) {
      if (!user?.validate?.is_valid) return <Nav to="/unverified" />
    }
  }

  if (type === 'unverified') {
    if (!user) return <Nav to="/register" />
    if (!user?.validate) return <Nav to="/validate" />
  }

  return <Outlet />
}

interface NavProps {
  to: string
}

function Nav({ to }: NavProps) {
  const location = useLocation()
  return <Navigate to={to} replace state={{ from: location }} />
}
