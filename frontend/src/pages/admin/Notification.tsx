import { useNavigate } from 'react-router-dom'
import * as React from 'react'

import { Image, Loading, Pagination, Title } from '@/components/atoms'
import { Button } from '@/components/ui/button'

import { useGetUserValidates } from '@/store/server/useValidate'
import { useQueryParams } from '@/hooks'

import { UserType } from '@/lib/types/user.type'
import { cn, formatDate } from '@/lib/utils'
import { titleConfig } from '@/lib/config'

const titleConf = titleConfig.notification

export default function Notification() {
  const { params, createParam } = useQueryParams(['page', 'search', 'filter'])
  const { data: validates, isFetching } = useGetUserValidates({
    search: params.search || '',
    page: Number(params.page) || 1
  })

  return (
    <React.Fragment>
      {isFetching && <Loading type="full" />}
      <section className="mx-auto flex flex-col md:w-8/12">
        <Title heading={titleConf.heading} desc={titleConf.desc} />
        <div className="mt-8 flex flex-col gap-3">
          {validates?.meta && validates?.meta?.total === 0 ? (
            <p className="text-center text-sm font-semibold italic">🙏 Tidak ada notifikasi 🙏</p>
          ) : (
            validates?.data.map((validate) => (
              <NotifCard key={validate.id} user={validate.user} date={validate.created_at} isRead={validate.is_read} />
            ))
          )}
        </div>

        {validates?.meta && validates?.meta?.total > 10 ? (
          <Pagination
            pageSize={validates?.meta.limit as number}
            totalCount={validates?.meta.total as number}
            currentPage={params.page !== '' ? parseInt(params.page) : 1}
            onPageChange={(page) => createParam({ key: 'page', value: page.toString() })}
          />
        ) : null}
      </section>
    </React.Fragment>
  )
}

interface NotifCardProps {
  user: UserType
  date: string
  isRead?: boolean
}

function NotifCard({ user, date, isRead }: NotifCardProps) {
  const navigate = useNavigate()

  return (
    <article
      className={cn(
        'flex cursor-pointer flex-col justify-between rounded-md p-4',
        'md:cursor-default md:flex-row md:items-center',
        !isRead ? 'bg-primary text-white' : 'bg-zinc-50 text-primary'
      )}
      onClick={() => navigate(`/admin/validate/${user.id}`)}
    >
      <div className="flex items-start gap-3">
        <Image src={user.photo} alt={user.fullname} className="h-9 w-9 rounded-md md:h-12 md:w-12" />
        <div className="flex flex-col">
          <p className="flex items-center gap-1.5 text-sm font-semibold md:text-base">
            {user.fullname}{' '}
            <span className={cn('hidden text-[15px] text-zinc-400 md:flex', !isRead && 'text-white/40')}>
              &bull; {user.username}
            </span>
          </p>
          <p className={cn('text-xs text-zinc-700 md:text-sm', !isRead && 'text-white/70')}>
            Mendaftar pada <span className="font-medium">{formatDate(date)}</span>
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={() => navigate(`/admin/validate/${user.id}`)}
        className={cn('hidden md:flex', !isRead && 'border-white/10 bg-primary hover:bg-zinc-950 hover:text-zinc-50')}
      >
        Lihat detail
      </Button>
    </article>
  )
}
