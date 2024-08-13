import * as React from 'react'

interface VideoProps {
  isRecordingStarted: boolean
  onChange: React.Dispatch<React.SetStateAction<Blob | null>>
  onUpload: (blob: Blob) => void
}

export default function Video({ isRecordingStarted, onUpload, onChange }: VideoProps) {
  const [, setMediaBlobUrl] = React.useState<string | null>(null)
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null)
  const chunksRef = React.useRef<Blob[]>([])
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const [isRecordingActive, setIsRecordingActive] = React.useState(false)

  React.useEffect(() => {
    if (isRecordingStarted && !isRecordingActive) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
          mediaRecorderRef.current = new MediaRecorder(stream)
          mediaRecorderRef.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              chunksRef.current.push(event.data)
            }
          }
          mediaRecorderRef.current.onstop = async () => {
            const blob = new Blob(chunksRef.current, { type: 'video/webm' })
            const url = URL.createObjectURL(blob)
            setMediaBlobUrl(url)
            setIsRecordingActive(false)
            chunksRef.current = []
            onChange(blob)
            // onUpload(blob)
          }
          mediaRecorderRef.current.start()
          setIsRecordingActive(true)
        })
        .catch((error) => {
          console.error('Error accessing media devices.', error)
        })
    } else if (!isRecordingStarted && isRecordingActive) {
      mediaRecorderRef.current?.stop()
    }
  }, [isRecordingStarted, isRecordingActive, onChange, onUpload])

  return (
    <div className="fixed left-3 top-3 z-50 h-[45px] w-[70px] overflow-hidden rounded-lg shadow-lg md:left-12 md:top-12 md:h-[130px] md:w-[200px]">
      <video ref={videoRef} autoPlay muted style={{ width: '100%', height: 'auto' }} className="object-cover" />
    </div>
  )
}
