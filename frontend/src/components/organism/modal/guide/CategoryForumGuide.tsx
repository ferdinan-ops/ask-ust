import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { HiCheckBadge } from 'react-icons/hi2'
import * as React from 'react'

export default function CategoryForumGuide() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary dark:text-white">Petunjuk Pengisian</DialogTitle>
          <DialogDescription className="text-[13px] font-medium">
            Ikuti petunjuk dengan benar agar dapat membuat forum tanpa hambatan.
          </DialogDescription>
        </DialogHeader>
        <section className="flex flex-col text-primary dark:text-white">
          <article className="flex flex-col gap-1 pb-4">
            <div className="flex items-center gap-2">
              <HiCheckBadge className="text-xl text-blue-500" />
              <p className="text-sm font-semibold text-primary dark:text-white">Kategori forum</p>
            </div>
            <p className="ml-7 border-b pb-4 text-xs leading-relaxed dark:border-white/20">
              Terdapat 3 kategori forum yang dapat kamu pilih, yaitu <b>Regular (Biasa)</b>, <b>Budaya</b>, <b>Sains</b>{' '}
              dan <b>Ilmu pengetahuan</b>. Kategori <b>selain regular</b> akan memerlukan validasi dari admin untuk
              dapat membuat forum, pastikan kamu telah menyesuaikan kategori forum yang kamu pilih dengan isi forum yang
              akan kamu buat.
            </p>
          </article>
          <article className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <HiCheckBadge className="text-xl text-blue-500" />
              <p className="text-sm font-semibold text-primary dark:text-white">Gambar</p>
            </div>
            <div className="ml-7 pb-4 text-xs leading-relaxed dark:border-white/20">
              <p>
                Kamu dapat mengunggah gambar yang menjadi topik forum kamu. Gambar ini bersifat opsional, kamu bisa
                mengosongkannya jika tidak ingin mengunggah gambar.
              </p>
            </div>
          </article>
        </section>
        <Button className="ml-auto w-fit" onClick={() => setOpen(false)}>
          Oke, saya mengerti
        </Button>
      </DialogContent>
    </Dialog>
  )
}
