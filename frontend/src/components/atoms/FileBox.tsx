import { cn } from '@/lib/utils'
import { usePreviewImage } from '@/store/client'
import * as React from 'react'
import { HiOutlineDocument, HiOutlineEye, HiTrash } from 'react-icons/hi2'
import { Button } from '../ui/button'
import { IconType } from 'react-icons'

interface FileBoxProps {
  children: React.ReactNode
  className?: string
}

const FileBox = ({ children, className }: FileBoxProps) => {
  return <section className={className}>{children}</section>
}

interface ContainerProps {
  variant: 'null' | 'filled'
  children: React.ReactNode
  className?: string
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ variant, children, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex items-center rounded-lg border dark:border-white/25',
          variant === 'null' &&
            'flex-col gap-5 border-2 border-dashed border-primary/25 py-5 pl-8 pr-6 md:flex-row md:gap-6',
          variant === 'filled' && 'justify-between border-slate-300 py-2.5 pl-4 pr-5',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

interface FilledProps {
  file: File
  previewCondition?: boolean
  closedModal?: () => void
  onDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Filled = ({ file, previewCondition, closedModal, onDelete }: FilledProps) => {
  const setPreviewImage = usePreviewImage((state) => state.setPreviewImage)

  const handlePreview = (preview: string) => {
    setPreviewImage(preview)
    closedModal && closedModal()
  }

  return (
    <React.Fragment>
      <div className="flex items-center gap-2">
        <HiOutlineDocument className="text-2xl text-primary/40 dark:text-white/40" />
        <span className="truncate-1 text-sm text-primary/40 dark:text-white/40">{file.name ?? file}</span>
      </div>
      <div className="flex items-center gap-2">
        {previewCondition && (
          <button
            type="button"
            className="flex h-7 w-7 cursor-pointer rounded hover:bg-slate-200 dark:hover:bg-zinc-700"
            onClick={() => handlePreview(URL.createObjectURL(file))}
          >
            <HiOutlineEye className="m-auto text-xl text-primary/40 dark:text-white/40" />
          </button>
        )}
        <button
          type="button"
          className="flex h-7 w-7 cursor-pointer rounded hover:bg-slate-200 dark:hover:bg-zinc-700"
          onClick={onDelete}
        >
          <HiTrash className="m-auto text-xl text-red-500 dark:text-red-400" />
        </button>
      </div>
    </React.Fragment>
  )
}

interface NullishProps {
  label: string
  description: string
  btnText: string
  icon: IconType
  action?: () => void
}

const Nullish = ({ description, label, btnText, icon: Icon, action }: NullishProps) => {
  return (
    <React.Fragment>
      <Icon className="text-6xl text-primary/40 dark:text-white/40 md:text-5xl" />
      <div className="flex w-full flex-col items-center justify-between gap-5 md:flex-row md:gap-0">
        <div className="flex flex-col gap-1">
          <p className="text-center text-[13px] font-semibold text-primary dark:text-white md:text-left">
            {label ?? 'Pilih file atau seret dan lepas di sini'}
          </p>
          <p className="text-center text-xs text-primary/40 dark:text-white/40 md:text-left">
            {description ?? 'JPG atau PNG ukuran tidak lebih dari 10MB'}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="border-blue-500 uppercase text-blue-500 hover:text-blue-500 md:text-xs"
          onClick={() => {
            action && action()
          }}
        >
          {btnText}
        </Button>
      </div>
    </React.Fragment>
  )
}

FileBox.Container = Container
FileBox.Filled = Filled
FileBox.Nullish = Nullish

export default FileBox
