import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import * as React from 'react'
import { HiCheckBadge } from 'react-icons/hi2'

export default function ValidateDataGuide() {
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
            Ikuti petunjuk dengan benar agar proses validasi akun kamu dapat segera diproses.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-5 h-[420px] w-full">
          <section className="flex flex-col text-primary dark:text-white">
            <article className="flex flex-col gap-1 pb-4">
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-xl text-blue-500" />
                <p className="text-sm font-semibold text-primary dark:text-white">Siapa kamu?</p>
              </div>
              <p className="ml-7 border-b pb-4 text-xs leading-relaxed dark:border-white/20">
                Pilih peran kamu di Universitas Katolik Santo Thomas, apakah kamu adalah seorang <b>mahasiswa</b>,{' '}
                <b>dosen</b>, <b>karyawan</b> atau yang <b>lainnya</b>. Untuk inputan selanjutnya kamu harus
                menyesuaikannya dengan peran yang kamu pilih.
              </p>
            </article>
            <article className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-xl text-blue-500" />
                <p className="text-sm font-semibold text-primary dark:text-white">File validasi</p>
              </div>
              <div className="ml-7 border-b pb-4 text-xs leading-relaxed dark:border-white/20">
                <p>
                  Persiapkan dokumen-dokumen yang dapat digunakan untuk menunjukkan bahwa kamu merupakan bagian dari
                  Universitas Katolik Santo Thomas, seperti Kartu Rencana Studi (KRS), Kartu Tanda Mahasiswa (KTM),
                  bukti pembayaran uang kuliah dan lain-lain, dalam bentuk pdf, ataupun gambar.
                </p>
                <p className="mt-3 font-semibold">Cara mengisi:</p>
                <ul className="ml-5 mt-1 list-disc">
                  <li>
                    Tekan tombol <b>PILIH FILE</b>
                  </li>
                  <li>Pilih file atau dokumen yang telah disiapkan.</li>
                </ul>
              </div>
            </article>
            <article className="flex flex-col gap-1 pt-4">
              <div className="flex items-center gap-2">
                <HiCheckBadge className="text-xl text-blue-500" />
                <p className="text-sm font-semibold text-primary dark:text-white">Foto diri</p>
              </div>
              <div className="ml-7 text-xs leading-relaxed">
                <p>
                  Persiapkan diri kamu sekarang dengan foto yang terbaik, jangan lupa untuk tersenyum! Kenakan pakaian
                  atau aksesoris yang menunjukkan kamu sebagai bagian dari Universitas Katolik Santo Thomas.
                </p>
                <p className="mt-3 font-semibold">Syarat:</p>
                <ul className="ml-5 mt-3 list-disc">
                  <li>
                    Jika kamu adalah seorang <b>mahasiswa</b> kenakan jas almamater Universitas Katolik Santo Thomas
                    pada saat pengambilan foto agar akun kamu dapat lebih cepat untuk disetujui.
                  </li>
                  <li>
                    Jika kamu adalah <b>dosen</b> ataupun <b>karyawan</b> yang bekerja di Universitas Katolik Santo
                    Thomas gunakan pakaian atau aksesoris yang menunjukkan kamu sebagai bagian dari universitas atau
                    pegang kartu identitas atau aksesoris yang menunjukkan kamu sebagai bagian dari universitas.
                  </li>
                </ul>
                <p className="mt-3 font-semibold">Cara mengisi:</p>
                <ul className="ml-5 mt-1 list-disc">
                  <li>
                    Tekan tombol <b>AMBIL GAMBAR</b>, kamu akan dibawa ke halaman kamera.
                  </li>
                  <li>
                    Setuju dengan izin yang diminta oleh browser untuk mengakses kamera kamu, dengan menekan tombol{' '}
                    <b>Allow</b>
                  </li>
                  <li>
                    Persiapkan diri dengan telah memperhatikan syarat yang telah disebutkan di atas dengan tersenyum
                  </li>
                  <li>
                    Tekan tombol dengan <b>simbol kamera</b> untuk mengambil foto
                  </li>
                  <li>
                    Tekan tombol dengan <b>simbol centang</b> untuk menyimpan foto
                  </li>
                  <li>
                    Tekan tombol dengan <b>simbol silang</b> untuk mengulang pengambilan foto
                  </li>
                </ul>
              </div>
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
        </ScrollArea>
        <Button className="ml-auto w-fit" onClick={() => setOpen(false)}>
          Oke, saya mengerti
        </Button>
      </DialogContent>
    </Dialog>
  )
}
