import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as React from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Brand } from '@/components/atoms'

import { TermsType, termsValidation } from '@/lib/validations/auth.validation'
import { useTerms } from '@/store/client'

export default function Terms() {
  const navigate = useNavigate()
  const forms = useForm<TermsType>({
    mode: 'onTouched',
    resolver: yupResolver(termsValidation)
  })

  const { terms, setTerms } = useTerms((state) => ({
    setTerms: state.setTerms,
    terms: state.terms
  }))

  React.useEffect(() => {
    if (terms) {
      forms.setValue('agreement', true)
    }
  }, [terms, forms])

  const goBack = () => navigate('/register')

  const onSubmit = (values: TermsType) => {
    if (!values.agreement) {
      forms.setError('agreement', { type: 'manual', message: 'Anda harus menyetujui syarat dan ketentuan' })
      return
    }

    setTerms(true)
    goBack()
  }

  return (
    <main className="dark:bg-primary dark:text-white">
      <header className="flex items-center justify-center py-8 md:py-12">
        <Brand className="flex-col gap-1 text-lg md:gap-2.5 md:text-xl" imageClassName="md:w-8 w-7" />
      </header>
      <section className="mx-auto flex w-full flex-col gap-5 px-6 md:w-6/12 md:gap-8 md:px-0">
        <h1 className="text-xl font-black md:text-2xl">Syarat dan Ketentuan Aplikasi</h1>
        <ul className="flex flex-col gap-5 text-xs font-medium leading-relaxed md:gap-8 md:text-sm">
          <li>
            Selamat datang di ASK.UST, sebuah aplikasi forum diskusi berbasis website yang dirancang untuk menyediakan
            lingkungan yang aman dan nyaman dari konten negatif. Sebelum menggunakan layanan kami, mohon baca dan pahami
            Syarat dan Ketentuan berikut ini. Dengan mendaftar dan menggunakan aplikasi kami, Anda setuju untuk mematuhi
            semua ketentuan yang telah ditetapkan.
          </li>
          <ul className="flex flex-col gap-1">
            <li className="font-bold">Penerimaan Syarat dan Ketentuan</li>
            <li>
              Dengan menggunakan aplikasi ini, Anda setuju untuk mematuhi dan terikat oleh Syarat dan Ketentuan yang
              berlaku. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan aplikasi ini.
            </li>
          </ul>
          <ul className="flex flex-col gap-1">
            <li className="font-bold">Ketentuan Penggunaan</li>
            <ul className="ml-7 flex list-disc flex-col gap-1">
              <li>
                Pengguna wajib menggunakan aplikasi ini untuk tujuan yang sah dan sesuai dengan peraturan
                perundang-undangan yang berlaku.
              </li>
              <li>
                Sistem dilengkapi dengan fitur untuk memfilter pesan dan gambar yang diunggah oleh pengguna agar tidak
                mengandung konten negatif. Namun, kami tidak dapat menjamin bahwa semua konten negatif dapat sepenuhnya
                difilter oleh sistem.
              </li>
              <li>
                Pengguna dilarang mengunggah, memposting, mengirim, atau menyebarkan konten negatif dalam segala bentuk
                apapun, termasuk tetapi tidak terbatas pada:
                <ul className="ml-8 flex list-decimal flex-col gap-1">
                  <li>Konten yang bersifat pornografi, kekerasan, pelecehan, atau diskriminasi.</li>
                  <li>Konten yang melanggar hak kekayaan intelektual pihak lain.</li>
                  <li>Konten yang mengandung ujaran kebencian atau fitnah.</li>
                  <li>Konten yang bersifat menyesatkan atau penipuan.</li>
                  <li>Konten yang berkaitan dengan hal-hal medis</li>
                </ul>
              </li>
            </ul>
          </ul>
          <ul className="flex flex-col gap-1">
            <li className="font-bold">Sanksi dan Pembatasan</li>
            <ul className="ml-7 flex list-disc flex-col gap-1">
              <li>
                Pengguna yang mengirimkan pesan sebanyak 5 kali secara berturut-turut dalam waktu 5 menit akan diberikan
                sanksi berupa pembatasan tidak dapat mengirimkan pesan di forum manapun selama 1 hari.
              </li>
              <li>
                Setelah masa pembatasan berakhir, pengguna dapat kembali mengirimkan pesan. Namun, jika pengguna kembali
                melanggar dengan mengirimkan pesan yang melanggar dalam waktu 1 hari setelah masa pembatasan, pengguna
                akan dikenakan sanksi pembatasan lagi selama 1 hari.
              </li>
              <li>
                Sanksi lebih lanjut dapat diterapkan berdasarkan kebijakan kami jika pengguna terus-menerus melanggar
                ketentuan ini.
              </li>
            </ul>
          </ul>
          <ul className="flex flex-col gap-1">
            <li className="font-bold">Privasi</li>
            <li>
              Kami menghargai privasi pengguna dan berkomitmen untuk melindungi data pribadi Anda. Kebijakan Privasi
              kami menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda. Dengan
              menggunakan aplikasi ini, Anda setuju dengan praktik pengumpulan dan penggunaan data yang diuraikan dalam
              Kebijakan Privasi kami.
            </li>
          </ul>
          <ul className="flex flex-col gap-1">
            <li className="font-bold">Perubahan pada Syarat dan Ketentuan</li>
            <li>
              Kami berhak untuk mengubah Syarat dan Ketentuan ini sewaktu-waktu. Perubahan akan diberlakukan segera
              setelah diposting di aplikasi kami. Anda dianjurkan untuk secara berkala meninjau Syarat dan Ketentuan
              ini. Penggunaan berkelanjutan Anda terhadap aplikasi ini setelah perubahan tersebut dianggap sebagai
              penerimaan Anda terhadap perubahan tersebut.
            </li>
          </ul>
          <li>
            Dengan menggunakan aplikasi ini, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui Syarat
            dan Ketentuan ini. Jika Anda memiliki pertanyaan atau masalah terkait Syarat dan Ketentuan ini, silakan
            hubungi kami di <span className="font-bold underline">ask.ust.id@gmail.com</span>.
          </li>
        </ul>
      </section>
      <section className="mx-auto w-full px-6 pb-12 pt-8 md:w-6/12 md:px-0">
        <Form {...forms}>
          <form className="flex flex-col gap-5" onSubmit={forms.handleSubmit(onSubmit)}>
            <FormField
              name="agreement"
              control={forms.control}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/5">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-[1.2px] rounded" />
                    </FormControl>
                    <FormLabel className="text-xs font-semibold md:text-sm">
                      Saya telah membaca dan menerima semua syarat dan ketentuan
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="ml-auto flex items-center gap-3">
              <Button className="font-semibold" type="button" variant="secondary" onClick={goBack}>
                Kembali
              </Button>
              {!terms && (
                <Button className="font-semibold" type="submit">
                  Saya setuju
                </Button>
              )}
            </div>
          </form>
        </Form>
      </section>
    </main>
  )
}
