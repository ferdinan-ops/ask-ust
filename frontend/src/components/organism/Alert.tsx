import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

interface AlertProps {
  children?: React.ReactNode
  title: string
  desc: string
  action: () => void
  btnText: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  isCancel?: boolean
  variant?: 'danger' | 'primary'
}

export default function Alert({
  children,
  title,
  desc,
  action,
  btnText,
  open,
  onOpenChange,
  isCancel = true,
  variant = 'danger'
}: AlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {isCancel && <AlertDialogCancel className="text-xs">Batal</AlertDialogCancel>}
          <AlertDialogAction
            onClick={action}
            className={
              variant === 'danger'
                ? 'bg-red-500 text-xs hover:bg-red-600 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90'
                : 'bg-primary text-xs hover:bg-zinc-950 dark:bg-white dark:text-zinc-50 dark:hover:bg-zinc-950/90'
            }
          >
            Ya, {btnText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
