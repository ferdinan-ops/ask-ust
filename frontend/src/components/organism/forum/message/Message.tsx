import { Image } from '@/components/atoms'

import { MessageType } from '@/lib/types/message.type'
import { cn, formatDate } from '@/lib/utils'

interface MessageProps {
  className?: string
  message: MessageType
  memberLoginId: string
}

export default function Message({ className, message, memberLoginId }: MessageProps) {
  const isUserLogin = memberLoginId === message.member_id

  return (
    <section
      className={cn('flex items-start gap-2', isUserLogin && 'flex-row-reverse items-start justify-start', className)}
    >
      <Image
        src={message.member.user.photo}
        alt={message.member.user.fullname}
        className="h-7 w-7 rounded-full object-cover"
      />
      <div
        className={cn(
          'flex flex-col gap-1 rounded-b-2xl px-3 pb-3 pt-2',
          isUserLogin ? 'rounded-l-2xl bg-[#95A4FC]' : 'rounded-r-2xl bg-[#E5ECF6]'
        )}
      >
        <div className="flex items-center gap-2">
          <p className={cn('truncate-1 text-sm font-bold', isUserLogin ? 'text-white' : 'text-primary')}>
            {isUserLogin ? 'Anda' : message.member.user.fullname}
          </p>
          <p className={cn(isUserLogin ? 'text-white/60' : 'text-primary/60')}>&bull;</p>
          <p className={cn('text-xs font-medium', isUserLogin ? 'text-white/70' : 'text-primary/60')}>
            {formatDate(message.created_at, 'with-hour')}
          </p>
        </div>
        {message.file_url && (
          <Image
            src={message.file_url}
            alt={message.member.user.fullname}
            className="w-full rounded-lg object-cover md:max-w-[300px] lg:max-w-[400px]"
          />
        )}
        {!message.file_url && (
          <span
            className={cn(
              'max-w-[calc(100vw-32px-28px-8px-65px)] text-[15px] font-medium leading-relaxed text-primary/90 md:max-w-lg',
              isUserLogin ? 'text-white/90' : 'text-primary'
            )}
          >
            {message.content}
            {message.updated_at !== message.created_at && !message.is_deleted && (
              <span className={cn('text-xs font-semibold italic', isUserLogin ? 'text-white/80' : 'text-primary/60')}>
                {' '}
                (diubah)
              </span>
            )}
            {message.is_deleted && (
              <span className={cn('font-semibold italic', isUserLogin ? 'text-white/70' : 'text-primary/60')}>
                Pesan ini telah dihapus
              </span>
            )}
          </span>
        )}
      </div>
    </section>
  )
}
