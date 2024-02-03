import ENV from '@/lib/environment'
import { cn } from '@/lib/utils'

interface ServerImageProps {
  src?: string
  className?: string
  alt: string
}
export default function ServerImage({ src, alt, className }: ServerImageProps) {
  return (
    <img
      alt={alt}
      src={src ? `${ENV.storageUrl}/${src}` : 'https://github.com/shadcn.png'}
      className={cn('object-cover', className)}
    />
  )
}
