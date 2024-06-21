import { Image } from '@/components/atoms'
import { MemberType } from '@/lib/types/member.type'
import { HiCheckBadge, HiExclamationCircle } from 'react-icons/hi2'
import { cn } from '@/lib/utils'
import { MemberSettings } from '..'
import { useUserInfo } from '@/store/client'

interface MemberCardProps {
  member: MemberType
  forumId: string
  moderators: MemberType[]
  admin: MemberType
  className?: string
}

export default function MemberCard({ member, forumId, moderators, admin, className }: MemberCardProps) {
  const { user } = useUserInfo()
  const isNotGuest = admin?.user_id === user?.id || moderators?.some((mod) => mod.user_id === user?.id)

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex items-start gap-3">
        <div className="relative">
          <Image src={member.user.photo} alt={member.user.fullname} className="h-6 w-6 rounded-lg" />
        </div>
        <div className="flex flex-col">
          <p className="flex items-center gap-1 text-sm font-medium">
            <span className="truncate-1">{member.user.fullname}</span>
            {member.role === 'ADMIN' && <HiCheckBadge className="text-blue-500" />}
            {member.role === 'MODERATOR' && <HiCheckBadge className="text-green-500" />}
            {isNotGuest && member.reports.length > 0 && (
              <HiExclamationCircle className="text-red-500 dark:text-red-300" />
            )}
          </p>
          <span className="text-xs font-medium text-zinc-400 dark:text-white/40">@{member.user.username}</span>
        </div>
      </div>

      <MemberSettings
        moderators={moderators}
        admin={admin as MemberType}
        forumId={forumId}
        memberId={member.id}
        memberUserId={member.user_id}
      />
    </div>
  )
}
