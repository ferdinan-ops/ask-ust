import { CourseFetch, ImportDataGuide, LectureFetch } from '@/components/organism'
import CourseLectureFetch from '@/components/organism/data/CourseLectureFetch'

export default function Lecture() {
  return (
    <section className="flex flex-col gap-8 md:gap-28">
      <ImportDataGuide />
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-24 md:gap-y-0">
        <LectureFetch />
        <CourseFetch />
      </section>
      <section>
        <CourseLectureFetch />
      </section>
    </section>
  )
}
