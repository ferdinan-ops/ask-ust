import { useNavigate } from 'react-router-dom'
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
} from '../ui/alert-dialog'

import { useLogout } from '@/store/server/useAuth'

interface LogoutAlertProps {
  children: React.ReactNode
}

export default function LogoutAlert({ children }: LogoutAlertProps) {
  const navigate = useNavigate()
  const { mutateAsync: logout } = useLogout()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Anda yakin keluar dari aplikasi?</AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini akan mengeluarkan akun Anda dari aplikasi kami. Namun Anda bisa kembali lagi dengan login.
          </AlertDialogDescription>
          {/* <AlertDialogTitle>Anda yakin menghapus pesan?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus pesan Anda secara permanen dan
                  menghapus pesan Anda dari server kami.
                </AlertDialogDescription> */}
          {/* <AlertDialogTitle>Anda yakin keluar dari forum?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini tidak dapat dibatalkan. Tindakan ini akan mengeluarkan Anda secara permanen dari forum
                  ini.
                </AlertDialogDescription> */}
          {/* <AlertDialogTitle>Anda yakin mengeluarkannya dari forum?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tindakan ini tidak dapat dibatalkan. Tindakan ini akan mengeluarkan anggota ini secara permanen dari
                    forum ini.
                  </AlertDialogDescription> */}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs">Batal</AlertDialogCancel>
          {/* <AlertDialogAction className="text-xs bg-red-500 hover:bg-red-600">Ya, Keluar</AlertDialogAction> */}
          {/* <AlertDialogAction className="text-xs bg-red-500 hover:bg-red-600">Ya, Hapus pesan</AlertDialogAction> */}
          <AlertDialogAction
            onClick={handleLogout}
            className="bg-red-500 text-xs hover:bg-red-600 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90"
          >
            Ya, Keluarkan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
