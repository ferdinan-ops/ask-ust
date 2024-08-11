import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useGetUserRegisterInfo } from '@/hooks'

interface ProtectedFromUnverifiedProps {
  type?: 'validate' | 'default' | 'unverified' | 'quiz'
}

export default function ProtectedFromUnverified({ type = 'default' }: ProtectedFromUnverifiedProps) {
  const user = useGetUserRegisterInfo()

  if (type === 'default') {
    if (user) {
      if (!user?.validate) return <Nav to="/validate" />
      if (user?.validate?.id) return <Nav to="/unverified" />
    }
  }

  if (type === 'validate') {
    if (!user) return <Nav to="/register" />
    if (user?.validate) {
      if (user?.validate?.id) return <Nav to="/unverified" />
    }
  }

  if (type === 'unverified') {
    if (!user) return <Nav to="/register" />
    if (!user?.validate) return <Nav to="/validate" />
    if (user.validate?.id && !user?.quiz?.isFinished) return <Nav to="/quiz" />
    if (user.validate?.id && user?.quiz?.isFinished && user.is_banned && user.banned_type === 'QUIZ')
      return <Nav to="/quiz" />
  }

  if (type === 'quiz') {
    if (!user) return <Nav to="/register" />
    if (!user?.validate) return <Nav to="/validate" />
    if (user.validate?.id && user?.quiz?.isFinished && !user.is_banned) return <Nav to="/unverified" />
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
