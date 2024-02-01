import { useToken } from '@/store/client'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoute() {
  const location = useLocation()
  const accessToken = useToken((state) => state.accessToken)

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
