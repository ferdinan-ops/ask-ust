import { Navigate, useLocation } from 'react-router-dom'

export default function NavToNotFound() {
  const location = useLocation()
  return <Navigate to="/404" replace state={{ from: location }} />
}
