import { useUserInfo } from '@/store/client'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface ProtectedFromUnverifiedProps {
  type?: 'validate' | 'default' | 'unverified'
}

export default function ProtectedFromUnverified({ type = 'default' }: ProtectedFromUnverifiedProps) {
  const user = useUserInfo((state) => state.user)

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
