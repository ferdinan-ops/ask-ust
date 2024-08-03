import * as React from 'react'

export default function useRecord() {
  const [blob, setBlob] = React.useState<Blob | null>(null)
  const [isRecordStart, setIsRecordStart] = React.useState(false)

  return {
    blob,
    setBlob,
    isRecordStart,
    setIsRecordStart
  }
}
