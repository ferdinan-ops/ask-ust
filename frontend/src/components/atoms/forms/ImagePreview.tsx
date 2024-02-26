import { HiXMark } from 'react-icons/hi2'
import { Button } from '../../ui/button'
import { useDisableBodyScroll } from '@/hooks'

interface ImagePreviewProps {
  image: string
  onShow: () => void
}

export default function ImagePreview({ image, onShow }: ImagePreviewProps) {
  useDisableBodyScroll(Boolean(image))
  return (
    <div className="fixed inset-0 z-[9999999999999999999999999999999999] flex bg-black/70">
      <Button className="absolute right-4 top-4" size="icon" onClick={onShow}>
        <HiXMark className="m-auto text-xl md:text-2xl" />
      </Button>
      <img src={image} alt="preview" className="m-auto w-full px-6 sm:h-[90%] sm:w-auto md:px-0" />
    </div>
  )
}
