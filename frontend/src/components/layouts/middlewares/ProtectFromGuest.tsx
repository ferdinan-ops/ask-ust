import { useToken, useUserInfo } from '@/store/client'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedFromGuest() {
  const location = useLocation()
  const accessToken = useToken((state) => state.accessToken)
  const user = useUserInfo((state) => state.user)

  if ((user?.role === 'USER' && !accessToken) || (!user && !accessToken)) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />
  }

  if (user?.role === 'USER' && accessToken) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />
  }

  return <Outlet />
}
