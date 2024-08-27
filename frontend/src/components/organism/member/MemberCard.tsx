import { Image } from '@/components/atoms'
// import { MemberType } from '@/lib/types/member.type'
import { HiCheckBadge } from 'react-icons/hi2'
import { cn } from '@/lib/utils'
// import { MemberSettings } from '..'
// import { useUserInfo } from '@/store/client'

interface MemberCardProps {
  className?: string
  children: React.ReactNode
}

export default function MemberCard({ className, children }: MemberCardProps) {
  return <div className={cn('flex items-center justify-between', className)}>{children}</div>
}

interface NameProps {
  fullname: string
  username?: string
  photo?: string
  children?: React.ReactNode
  className?: string
}

function Name({ fullname, username, photo, children, className }: NameProps) {
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <Image src={photo} alt={fullname} className="h-6 w-6 rounded-lg" />
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-sm font-medium">
          <span className="truncate-1">{fullname}</span>
          {children}
        </div>
        {username && <span className="text-xs font-medium text-zinc-400 dark:text-white/40">@{username}</span>}
      </div>
    </div>
  )
}

function Badge({ role }: { role: string }) {
  if (role === 'ADMIN') return <HiCheckBadge className="text-blue-500" />
  if (role === 'MODERATOR') return <HiCheckBadge className="text-green-500" />
  return null
}

MemberCard.Name = Name
MemberCard.Badge = Badge
