import { Button } from '@/components/ui/button'
import { HiOutlineCamera, HiOutlineCheck, HiOutlineXMark } from 'react-icons/hi2'
import Webcam from 'react-webcam'
import * as React from 'react'
import { IconType } from 'react-icons'
import { base64ToFile, cn } from '@/lib/utils'
import FileBox from '../FileBox'

interface CameraProps {
  value: string
  onChange: (value: string) => void
}

export default function Camera({ value, onChange }: CameraProps) {
  const webcamRef = React.useRef<Webcam>(null)
  const [isShow, setIsShow] = React.useState(false)
  const [file, setFile] = React.useState<File>(null as unknown as File)

  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef?.current?.getScreenshot()
    onChange(imageSrc ?? '')

    const image = await base64ToFile(imageSrc as string)
    setFile(image)
  }, [webcamRef, onChange])

  const retake = React.useCallback(() => {
    onChange('')
  }, [onChange])

  const handleClose = React.useCallback(() => {
    setIsShow(false)
  }, [setIsShow])

  return (
    <React.Fragment>
      {value && file ? (
        <FileBox.Container variant="filled">
          <FileBox.Filled file={file} previewCondition onDelete={retake} />
        </FileBox.Container>
      ) : (
        <FileBox.Container variant="null">
          <FileBox.Nullish
            btnText="Ambil gambar"
            icon={HiOutlineCamera}
            action={() => setIsShow(true)}
            label="Ambil gambar dengan kamera"
            description="Izinkan kami mengakses kamera Anda"
          />
        </FileBox.Container>
      )}

      {isShow && (
        <div className="fixed inset-0 z-50 bg-black" style={{ margin: 0 }}>
          {value ? (
            <img src={value} alt="webcam" className="mx-auto h-full" />
          ) : (
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" screenshotQuality={0.8} className="h-full w-full" />
          )}
          {value ? (
            <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 items-center gap-5">
              <CameraButton onClick={retake} icon={HiOutlineXMark} className="static translate-x-0" />
              <CameraButton onClick={handleClose} icon={HiOutlineCheck} className="static translate-x-0" />
            </div>
          ) : (
            <CameraButton onClick={capture} icon={HiOutlineCamera} />
          )}
        </div>
      )}
    </React.Fragment>
  )
}

interface CameraButtonProps {
  onClick: () => void
  icon: IconType
  className?: string
}

function CameraButton({ onClick, icon: Icon, className }: CameraButtonProps) {
  return (
    <Button
      type="button"
      size="icon"
      className={cn(
        'absolute bottom-16 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full border-4 border-black bg-white font-bold uppercase text-primary ring-4 ring-white hover:bg-zinc-200 md:text-xs',
        className
      )}
      onClick={onClick}
    >
      <Icon className="m-auto text-3xl text-primary dark:text-primary" />
    </Button>
  )
}
