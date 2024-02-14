import { useGetDetailForum } from '@/store/server/useForum'
import { useGetMe } from '@/store/server/useUser'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'

export default function ProtectedForum() {
  const location = useLocation()
  const { slug } = useParams<{ slug: string }>()
  const { data: forum, isSuccess } = useGetDetailForum(slug as string)
  const { data: user, isSuccess: isSuccessUser } = useGetMe()

  const isMember = forum?.members.some((member) => member.user_id === user?.id)

  if (!isMember && isSuccess && isSuccessUser) {
    return <Navigate to={`/forums/${slug}`} state={{ from: location.pathname }} replace />
  }

  return <Outlet />
}
