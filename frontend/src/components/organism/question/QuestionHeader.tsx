interface QuestionHeaderProps {
  count: number
}

export default function QuestionHeader({ count }: QuestionHeaderProps) {
  return (
    <article className="rounded-xl bg-primary p-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold leading-relaxed text-white md:text-3xl">
          Seberapa Universitas Katolik Santo Thomas kah kamu? 🤔
        </h1>
        <p className="text-xs leading-relaxed text-white/70 md:text-[13px]">
          Kamu akan diberikan {count} pertanyaan seputar Universitas Katolik Santo Thomas, jawablah dengan jujur! 😊.
          Kuis ini akan membantu kami untuk memverifkasi kamu sebagai bagian dari universitas.
        </p>
      </div>
    </article>
  )
}
