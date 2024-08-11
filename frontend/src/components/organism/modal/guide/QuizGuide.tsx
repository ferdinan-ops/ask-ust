import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import * as React from 'react'
import { HiCheckBadge } from 'react-icons/hi2'

interface QuizGuideProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  action?: () => void
}

export default function QuizGuide({ action, open, onOpenChange }: QuizGuideProps) {
  const [isCanClose, setIsCanClose] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsCanClose(true)
    }, 10000) // 20 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader className="flex flex-col space-y-1.5 text-center sm:text-left">
          <AlertDialogTitle className="text-lg leading-none tracking-tight">Kerjakan Kuis</AlertDialogTitle>
          <p className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
            Kuis ini dilakukan untuk mengetahui seberapa besar pengetahuan kamu mengenai Universitas Katolik Santo
            Thomas.
          </p>
        </AlertDialogHeader>
        <ScrollArea className="mt-5 max-h-[420px] w-full">
          <section className="flex flex-col">
            <article className="flex flex-col gap-1 pb-4">
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-xl text-blue-500" />
                <p className="text-sm font-bold text-primary dark:text-white">Kerjakan secepat mungkin</p>
              </div>
              <p className="ml-7 border-b pb-4 text-xs font-medium leading-relaxed text-primary/95 dark:border-white/20 dark:text-white/95">
                Kamu akan diberikan waktu selama <b>15 menit</b> untuk menyelesaikan 10 soal kuis ini dengan jawaban
                yang benar. Sistem akan menghentikan pengerjaan secara otomatis ketika waktu habis.
              </p>
            </article>
            <article className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-xl text-blue-500" />
                <p className="text-sm font-bold text-primary dark:text-white">Dilarang menyalin soal!</p>
              </div>
              <div className="ml-7 border-b pb-4 text-xs font-medium leading-relaxed text-primary/95 dark:border-white/20 dark:text-white/95">
                <p>
                  Jangan coba untuk menyalin soal atau jawaban dari kuis ini, karena akun yang telah kamu daftarkan akan
                  kami <b>banned</b> untuk <b>selamanya</b> karena mencoba untuk melakukan <b>kecurangan</b>, bahkan
                  bila itu hanya sekali saja.
                </p>
                <p className="mt-3">
                  Sistem kami dapat mendeteksi apakah kamu menyalin soal atau jawaban dari kuis ini, jadi jangan
                  coba-coba yaa!
                </p>
              </div>
            </article>
            <article className="flex flex-col gap-1 pt-4">
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-xl text-blue-500" />
                <p className="text-sm font-bold text-primary dark:text-white">Dilarang beralih dari halaman kuis!</p>
              </div>
              <div className="ml-7 pb-4 text-xs font-medium leading-relaxed text-primary/95 dark:text-white/95">
                <p>
                  Jangan coba untuk beralih dari halaman quiz ini, seperti <b>membuka tab baru</b>, atau{' '}
                  <b>membuka software atau aplikasi</b> lainnya, karena akun yang telah kamu daftarkan akan kami{' '}
                  <b>banned</b> untuk <b>selamanya</b> karena mencoba untuk melakukan <b>kecurangan</b>, bahkan bila itu
                  hanya sekali saja.
                </p>
                <p className="mt-3">
                  Sistem kami dapat mendeteksi apakah kamu beralih dari halaman quiz ini, jadi jangan coba-coba yaa!
                </p>
              </div>
            </article>
          </section>
        </ScrollArea>
        <AlertDialogFooter>
          <AlertDialogAction onClick={action} disabled={!isCanClose}>
            {isCanClose ? 'Saya siap, Mulai kuis!!' : 'Baca dulu yaa 😊'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
