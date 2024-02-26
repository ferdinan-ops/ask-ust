import ENV from '@/lib/environment'
import { cn } from '@/lib/utils'

interface ImageProps {
  src?: string
  className?: string
  alt: string
}
export default function Image({ src, alt, className }: ImageProps) {
  return (
    <img
      alt={alt}
      src={src ? `${ENV.storageUrl}/${src}` : 'https://github.com/shadcn.png'}
      className={cn('object-cover', className)}
    />
  )
}
