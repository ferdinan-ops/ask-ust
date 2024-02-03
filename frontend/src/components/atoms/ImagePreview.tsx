import { HiXMark } from 'react-icons/hi2'
import { Button } from '../ui/button'

interface ImagePreviewProps {
  image: string
  onShow: () => void
}

export default function ImagePreview({ image, onShow }: ImagePreviewProps) {
  return (
    <div className="fixed inset-0 z-[99999999999999] flex bg-black/70">
      <Button className="absolute right-4 top-4 bg-white/25 hover:bg-white/10" size="icon" onClick={onShow}>
        <HiXMark className="m-auto text-3xl text-white md:text-4xl" />
      </Button>
      <img src={image} alt="preview" className="m-auto w-full px-6 sm:h-[90%] sm:w-auto md:px-0" />
    </div>
  )
}
