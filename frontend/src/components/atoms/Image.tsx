import ENV from '@/lib/environment'
import { cn } from '@/lib/utils'

interface ImageProps {
  src?: string
  className?: string
  alt?: string
  provider?: string
}
export default function Image({ src, alt, className, provider }: ImageProps) {
  return (
    <img
      alt={alt}
      className={cn('object-cover', className)}
      src={src ? (provider === 'google' ? src : `${ENV.storageUrl}/${src}`) : 'https://github.com/shadcn.png'}
    />
  )
}
