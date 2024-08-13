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
    <section className="mx-auto w-full md:w-10/12 lg:w-8/12">
      <BackButton />
      <h1 className="text-2xl font-bold md:text-3xl">Kesimpulan Forum - {forum?.title}</h1>
      <p className="mt-1 flex gap-1 text-xs font-medium leading-relaxed text-zinc-500 md:text-[13px]">
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
      <div className="-mt-40 flex flex-col items-center">
        <img src={BrainGif} alt="loading" />
        <div className="-mt-14 max-w-lg gap-2 ">
          <h3 className="text-center text-xl font-bold leading-relaxed text-primary md:text-3xl">
            Tunggu bentar ya, hehe
          </h3>
          <p className="text-center text-xs font-medium leading-relaxed text-primary/60 md:text-base">
            Kami sedang melakukan kalkulasi terhadap seluruh isi forum untuk dapat kesimpulan yang kamu butuhkan.
          </p>
        </div>
      </div>
    </div>
  )
}
