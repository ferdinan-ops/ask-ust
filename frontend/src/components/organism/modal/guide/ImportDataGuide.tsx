import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import * as React from 'react'
import { HiCheckBadge } from 'react-icons/hi2'

export default function ImportDataGuide() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary dark:text-white">Petunjuk Impor Data</DialogTitle>
          <DialogDescription className="text-[13px] font-medium">
            Ikuti petunjuk dengan benar agar dapat mengimpor data dengan benar.
          </DialogDescription>
        </DialogHeader>
        <section className="mt-5 flex flex-col text-primary dark:text-white">
          <article className="flex flex-col gap-1 pb-4">
            <div className="flex items-center gap-2">
              <HiCheckBadge className="text-xl text-blue-500" />
              <p className="text-sm font-semibold text-primary dark:text-white">Data Dosen</p>
            </div>
            <p className="ml-7 border-b pb-4 text-xs leading-relaxed dark:border-white/20">
              Untuk dapat mengimpor data dosen, kamu perlu mempersiapkan data dalam bentuk excel atau file berekstensi
              .xlsx dan mengisi data di sheet yang pertama dengan kolom yang pertama adalah id yang diisi dengan uuid
              atau id khusus yang berbeda-beda setiap datanya dan kolom yang kedua adalah nama yang berisikan nama dari
              dosen.
            </p>
          </article>
          <article className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <HiCheckBadge className="text-xl text-blue-500" />
              <p className="text-sm font-semibold text-primary dark:text-white">Data Mata Kuliah</p>
            </div>
            <p className="ml-7 border-b pb-4 text-xs leading-relaxed dark:border-white/20">
              Sama seperti data dosen, kamu perlu menyiapkan data excel dengan kolom id, dan nama dengan aturan yang
              sama juga dengan data dosen.
            </p>
          </article>
          <article className="flex flex-col gap-1 pt-4">
            <div className="flex items-center gap-2">
              <HiCheckBadge className="text-xl text-blue-500" />
              <p className="text-sm font-semibold text-primary dark:text-white">Data Relasi Dosen dengan Mata Kuliah</p>
            </div>
            <p className="ml-7 text-xs leading-relaxed">
              Untuk data ini kamu hanya perlu mengisi data dengan kolom id_dosen, dan id_mata_kuliah yang berisikan data
              uuid atau id khusus dosen dan mata kuliah yang diajarkannya.
            </p>
          </article>

          {/* <article className="flex flex-col gap-1 pb-5 pt-4">
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-xl text-blue-500" />
                <p className="text-sm font-semibold text-primary dark:text-white">Gunakan foto sebagai foto profil</p>
              </div>
              <p className="ml-7 text-xs leading-relaxed">
                Dengan mencentang pilihan ini, foto yang kamu unggah pada kolom inputan foto akan langsung digunakan
                sebagai foto profil pada akun kamu.
              </p>
            </article> */}
        </section>
        <Button className="ml-auto w-fit" onClick={() => setOpen(false)}>
          Oke, saya mengerti
        </Button>
      </DialogContent>
    </Dialog>
  )
}
