import { useTerms } from '@/store/client'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectFromNewUser() {
  const location = useLocation()
  const terms = useTerms((state) => state.terms)

  if (!terms) {
    return <Navigate to="/terms-and-conditions" replace state={{ from: location }} />
  }

  return <Outlet />
}
