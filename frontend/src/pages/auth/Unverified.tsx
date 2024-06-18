import { Brand } from '@/components/atoms'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useUserInfo } from '@/store/client'

export default function Unverified() {
  const user = useUserInfo((state) => state.user)
  const isNotValid = !user?.validate?.is_valid && user?.validate?.note

  return (
    <main className="flex max-h-screen min-h-screen flex-col items-center justify-center px-6 md:px-0">
      <section
        className={cn(
          'w-full rounded-lg border-2 border-zinc-200 bg-zinc-50 px-7 py-9 text-primary md:w-4/12',
          isNotValid && 'border-red-700 bg-red-500 text-white'
        )}
      >
        <Brand className="gap-1.5 pb-5 text-base md:gap-2.5 md:pb-7 md:text-lg" imageClassName="md:w-7 w-6" />
        <div className="flex flex-col gap-1 md:gap-2">
          <h1 className={cn('text-xl font-black text-primary md:text-2xl', isNotValid && 'text-white')}>
            {isNotValid ? 'Akun kamu tidak terverifikasi' : 'Akun kamu diperiksa dulu ya...'}
          </h1>
          <p
            className={cn(
              'text-xs font-medium leading-relaxed text-primary/70 md:text-[13px]',
              isNotValid && 'text-white/70'
            )}
          >
            {isNotValid ? (
              <>
                <p>Alasan:</p>
                <span>{user?.validate?.note}</span>
              </>
            ) : (
              <span>
                Silahkan tunggu beberapa saat, kami akan segera memverifikasi akun kamu.{' '}
                <span className="font-bold">
                  Kami hanya ingin memastika Anda merupakan salah satu bagian dari Universitas Katolik Santo Thomas
                </span>
                . Jika sudah selesai, kamu akan mendapatkan email konfirmasi dari kami.
              </span>
            )}
          </p>
          {isNotValid && <Button className="ml-auto mt-5 w-fit bg-white text-red-500">Daftar Ulang</Button>}
        </div>
      </section>
    </main>
  )
}
