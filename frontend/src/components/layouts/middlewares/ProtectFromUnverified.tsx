import { useUserInfo } from '@/store/client'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedAuth() {
  const location = useLocation()
  const user = useUserInfo((state) => state.user)

  if (!user.validate.is_valid) {
    return <Navigate to="/unverified" replace state={{ from: location }} />
  }

  return <Outlet />
}
