import ENV from '@/lib/environment'
import { cn } from '@/lib/utils'

const checkIsGoogle = (url: string) => {
  const result = url.substring(0, url.indexOf(':'))
  return result === 'https' || result === 'http'
}

interface ImageProps {
  src?: string
  className?: string
  alt?: string
}

export default function Image({ src, alt, className }: ImageProps) {
  const isGoogle = checkIsGoogle(src as string)

  return (
    <img
      alt={alt}
      className={cn('object-cover', className)}
      src={src ? (isGoogle ? src : `${ENV.storageUrl}/${src}`) : 'https://github.com/shadcn.png'}
    />
  )
}
