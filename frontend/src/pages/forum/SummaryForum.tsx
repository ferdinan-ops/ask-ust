import { BrainGif } from '@/assets'
import { BackButton } from '@/components/atoms'
import Markdown from '@/components/atoms/Markdown'
import { formatDate } from '@/lib/utils'
import { useGetDetailForum, useGetForumConclusion } from '@/store/server/useForum'
import { HiSparkles } from 'react-icons/hi2'
import { useParams } from 'react-router-dom'

export default function SummaryForum() {
  const { slug } = useParams<{ slug: string }>()
  const { data: summary, isSuccess } = useGetForumConclusion(slug as string)
  const { data: forum, isSuccess: isSuccessDetail } = useGetDetailForum(slug as string)

  if (!isSuccess || !isSuccessDetail) return <Loading />

  return (
    <section className="mx-auto w-full bg-transparent md:w-10/12 lg:w-8/12">
      <BackButton />
      <h1 className="text-2xl font-bold md:text-3xl">Kesimpulan Forum - {forum?.title}</h1>
      <p className="mt-1 flex gap-1 text-xs font-medium leading-relaxed text-zinc-500 dark:text-white/50 md:text-[13px]">
        {formatDate(new Date().toString(), 'with-hour')} - Dihasilkan oleh{' '}
        <span className="flex items-center gap-1 font-bold">
          Gemini AI <HiSparkles />
        </span>
      </p>
      <Markdown values={summary} variant="plain-text" className="mt-3 md:mt-7" />
    </section>
  )
}

function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <img src={BrainGif} alt="loading" className="h-[180px] w-[180px] rounded-full object-cover" />
        <div className="flex max-w-lg flex-col gap-2">
          <h3 className="text-center text-xl font-bold leading-relaxed text-primary dark:text-white md:text-3xl">
            Tunggu bentar ya, hehe
          </h3>
          <p className="text-center text-xs font-medium leading-relaxed text-primary/60 dark:text-white/40 md:text-base">
            Kami sedang melakukan kalkulasi terhadap seluruh isi forum untuk dapat kesimpulan yang kamu butuhkan.
          </p>
        </div>
      </div>
    </div>
  )
}
