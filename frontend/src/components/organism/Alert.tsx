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
  children: React.ReactNode
  title: string
  desc: string
  action: () => void
  btnText: string
}

export default function Alert({ children, title, desc, action, btnText }: AlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs">Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={action}
            className="bg-red-500 text-xs hover:bg-red-600 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90"
          >
            Ya, {btnText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
