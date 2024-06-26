import { Accept, FileRejection, FileWithPath, useDropzone } from 'react-dropzone'
import { HiOutlineCloudArrowUp } from 'react-icons/hi2'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { bytesToSize } from '@/lib/utils'
import FileBox from '../FileBox'

export type FileWithPreview = FileWithPath & { preview: string }
interface DropZoneProps {
  accept?: Accept
  id: string
  setValue: (value: unknown, options?: { shouldValidate?: boolean }) => void
  fileValue?: FileWithPreview[]
  maxFileSize?: number
  description?: string
  closedModal?: () => void
}

export default function Dropzone({
  accept,
  id,
  setValue,
  fileValue,
  maxFileSize,
  closedModal,
  description
}: DropZoneProps) {
  const { setError, clearErrors, formState } = useFormContext()
  const { errors } = formState

  const dropzoneRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    errors[id] && dropzoneRef.current?.focus()
  }, [errors, id])

  const [files, setFiles] = React.useState<FileWithPreview[]>(fileValue ?? [])

  React.useEffect(() => {
    setFiles(fileValue as FileWithPreview[])
  }, [fileValue])

  const onDrop = React.useCallback(
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(files ? [...files] : null)
        setError(id, {
          type: 'manual',
          message: rejectedFiles?.[0].errors[0].message
        })
      } else {
        const oversizedFiles = acceptedFiles.filter((file) => file.size > (maxFileSize ?? 2 * 1024 * 1024))
        if (oversizedFiles.length > 0) {
          setError(id, {
            type: 'manual',
            message: `File '${oversizedFiles[0].name}' melebihi ukuran maksimum ${
              maxFileSize ? bytesToSize(maxFileSize) : '2 MB'
            }.`
          })
        } else {
          const acceptedFilesPreview = acceptedFiles.map((file: T) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )

          setFiles(files ? [...files, ...acceptedFilesPreview].slice(0, 1) : acceptedFilesPreview)

          setValue(files ? [...files, ...acceptedFiles].slice(0, 1) : acceptedFiles, {
            shouldValidate: true
          })
          clearErrors(id)
        }
      }
    },
    [clearErrors, files, id, setError, setValue, maxFileSize]
  )

  React.useEffect(() => {
    return () => {
      ;() => {
        files.forEach((file) => URL.revokeObjectURL(file.preview))
      }
    }
  }, [files])

  const deleteFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, file: FileWithPreview) => {
    e.preventDefault()
    const newFiles = [...files]

    newFiles.splice(newFiles.indexOf(file), 1)

    if (newFiles.length > 0) {
      setFiles(newFiles)
      setValue(newFiles, { shouldValidate: true })
    } else {
      setFiles([])
      setValue(null, { shouldValidate: true })
    }
  }

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1
  })

  return (
    <div className="flex w-full flex-col gap-1.5 lg:gap-2.5">
      {files?.length > 0 ? (
        <FileBox className="flex w-full flex-col gap-3">
          {files.map((file, id) => (
            <FileBox.Container key={id} variant="filled">
              <FileBox.Filled
                file={file}
                closedModal={closedModal}
                previewCondition={file.type !== 'application/pdf'}
                onDelete={(e) => deleteFile(e, file)}
              />
            </FileBox.Container>
          ))}
        </FileBox>
      ) : (
        <FileBox.Container {...getRootProps()} variant="null" ref={dropzoneRef}>
          <input id={id} {...getInputProps()} hidden />
          <FileBox.Nullish
            btnText="Pilih file"
            icon={HiOutlineCloudArrowUp}
            label="Pilih file atau seret dan lepas di sini"
            description={description ?? 'JPG atau PNG ukuran tidak lebih dari 10MB'}
          />
        </FileBox.Container>
      )}

      {errors[id] && (
        <span className="text-sm font-medium text-red-500 dark:text-red-900">{errors[id]?.message?.toString()}</span>
      )}
    </div>
  )
}
