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
              <p className="text-sm font-semibold text-primary dark:text-white">Tipe privasi</p>
            </div>
            <div className="ml-7 border-b pb-4 text-xs leading-relaxed dark:border-white/20">
              <p>
                Terdapat 2 jenis tipe privasi yang dapat kamu pilih dalam membuat forum yaitu <b>Publik</b> dan{' '}
                <b>Privat</b>.
              </p>
              <ul className="ml-5 mt-2 list-disc">
                <li>
                  Jika kamu memilih tipe <b>Publik</b>, forum yang kamu buat akan dapat diakses oleh semua pengguna.
                </li>
                <li>
                  Jika kamu memilih tipe <b>Privat</b>, forum yang kamu buat hanya dapat diakses oleh pengguna yang kamu
                  undang.
                </li>
              </ul>
              <p className="mt-3 font-bold">Perhatian:</p>
              <p>
                Kamu tidak dapat mengubah tipe privasi dari forum yang telah kamu buat nantinya. Jadi, pastikan tipe
                privasi yang kamu pilih sesuai dengan forum yang akan kamu buat
              </p>
            </div>
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
