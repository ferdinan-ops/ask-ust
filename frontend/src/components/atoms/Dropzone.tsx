import { Accept, FileRejection, FileWithPath, useDropzone } from 'react-dropzone'
import { HiOutlineCloudArrowUp, HiOutlineDocument, HiOutlineEye, HiTrash } from 'react-icons/hi2'
import { Button } from '../ui/button'
import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { bytesToSize } from '@/lib/utils'
import ImagePreview from './ImagePreview'

export type FileWithPreview = FileWithPath & { preview: string }
interface DropZoneProps {
  accept?: Accept
  id: string
  setValue: (value: unknown, options?: { shouldValidate?: boolean }) => void
  fileValue?: FileWithPreview[]
  maxFileSize?: number
}

export default function Dropzone({ accept, id, setValue, fileValue, maxFileSize }: DropZoneProps) {
  const { setError, clearErrors, formState } = useFormContext()
  const { errors } = formState

  const dropzoneRef = React.useRef<HTMLDivElement>(null)
  const [isShowImage, setIsShowImage] = React.useState('')

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
            message: `File '${oversizedFiles[0].name}' melebihi ukuran maksimum ${maxFileSize ? bytesToSize(maxFileSize) : '2 MB'}.`
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
      () => {
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
    <>
      <div className="flex w-full flex-col gap-1.5 xl:gap-2.5">
        {files?.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            {files.map((file, id) => (
              <div
                key={id}
                className="flex items-center justify-between rounded-lg border border-slate-300 py-2.5 pl-4 pr-5"
              >
                <div className="flex items-center gap-2">
                  <HiOutlineDocument className="text-2xl text-slate-500" />
                  <span className="truncate-1 text-sm text-slate-500">{file?.name ?? file}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="flex h-7 w-7 cursor-pointer rounded-full hover:bg-slate-200"
                    onClick={() => setIsShowImage(URL.createObjectURL(file))}
                  >
                    <HiOutlineEye className="m-auto text-xl text-slate-500" />
                  </button>
                  <button
                    className="flex h-7 w-7 cursor-pointer rounded-full hover:bg-slate-200"
                    onClick={(e) => deleteFile(e, file)}
                  >
                    <HiTrash className="m-auto text-xl text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col items-center gap-5 rounded-lg border-2 border-dashed border-primary/25 py-5 pl-8 pr-6 dark:border-white/25 md:flex-row md:gap-6"
            {...getRootProps()}
            ref={dropzoneRef}
          >
            <input id={id} {...getInputProps()} hidden />
            <HiOutlineCloudArrowUp className="text-6xl text-primary/40 dark:text-white/40 md:text-5xl" />
            <div className="flex w-full flex-col items-center justify-between gap-5 md:flex-row md:gap-0">
              <div className="flex flex-col gap-1">
                <p className="text-center text-[13px] font-semibold text-primary dark:text-white md:text-left">
                  Pilih file atau seret dan lepas di sini
                </p>
                <p className="text-center text-xs text-primary/40 dark:text-white/40 md:text-left">
                  JPG, PNG atau PDF, ukuran tidak lebih dari 10MB
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="border-blue-500 text-xs uppercase text-blue-500 hover:text-blue-500"
              >
                Pilih file
              </Button>
            </div>
          </div>
        )}

        {errors[id] && (
          <span className="text-sm font-medium text-red-500 dark:text-red-900">{errors[id]?.message?.toString()}</span>
        )}
      </div>
      {isShowImage && <ImagePreview onShow={() => setIsShowImage('')} image={isShowImage} />}
    </>
  )
}
