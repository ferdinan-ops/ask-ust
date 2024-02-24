import { MemberType } from '@/lib/types/member.type'
import { useGetMe } from '@/store/server/useUser'
import * as React from 'react'
import { Button } from '../../ui/button'
import { HiOutlineCog6Tooth, HiOutlineExclamationCircle } from 'react-icons/hi2'
import { ReportMember } from '..'
import { useNavigate } from 'react-router-dom'

interface MemberSettingsProps {
  admin: MemberType
  moderators: MemberType[]
  forumId: string
  memberId: string
  memberUserId: string
}

export default function MemberSettings({ admin, moderators, forumId, memberId, memberUserId }: MemberSettingsProps) {
  const navigate = useNavigate()
  const { data: user, isLoading } = useGetMe()

  if (isLoading) return <p>Loading...</p>

  return (
    <React.Fragment>
      {admin?.user_id === user?.id || moderators?.some((mod) => mod.user_id === user?.id) ? (
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 p-0 dark:bg-primary"
          onClick={() => navigate(`/forums/${forumId}/member/${memberId}`)}
        >
          <HiOutlineCog6Tooth className="text-base" />
        </Button>
      ) : (
        memberUserId !== user?.id && (
          <ReportMember memberId={memberId} forumId={forumId}>
            <Button variant="outline" size="icon" className="h-6 w-6 p-0 dark:bg-primary">
              <HiOutlineExclamationCircle className="text-base text-red-500 dark:text-red-300" />
            </Button>
          </ReportMember>
        )
      )}
    </React.Fragment>
  )
}
