import { useUserInfo } from '@/store/client'
import { useGetDetailForum } from '@/store/server/useForum'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'

export default function ProtectedForum() {
  const location = useLocation()
  const { slug } = useParams<{ slug: string }>()

  const { user } = useUserInfo()
  const { data: forum, isSuccess } = useGetDetailForum(slug as string)

  const isMember = forum?.members.some((member) => member.user_id === user?.id)

  if (!isMember && isSuccess) {
    return <Navigate to={`/forums/${slug}`} state={{ from: location.pathname }} replace />
  }

  return <Outlet />
}
