import {
  ForumIllustration,
  HeroIllustration1,
  HeroIllustration2,
  MediaIllustration,
  MemberIllustration,
  ProfileIllustration
} from '@/assets'
import Brand from '@/components/atoms/Brand'
import { Section } from '@/components/organism'
import { Button } from '@/components/ui/button'
import { useTitle } from '@/hooks'
import { HiArrowRight } from 'react-icons/hi2'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
  useTitle('Beranda')
  const navigate = useNavigate()

  return (
    <>
      <header className="flex h-20 w-full items-center bg-primary">
        <nav className="mx-auto flex w-[1180px] items-center justify-between px-5 md:px-10 xl:px-0">
          <Brand
            href="/"
            className="gap-3 text-lg font-bold text-white xl:gap-4 xl:text-xl"
            imageClassName="xl:w-8 w-7"
          />
          <div className="flex items-center gap-3">
            <Button
              className="bg-white/5 text-xs font-semibold dark:bg-white/5 dark:text-white xl:text-sm"
              onClick={() => navigate('/register')}
            >
              Daftar
            </Button>
            <Button
              className="bg-white text-xs font-semibold text-primary hover:bg-zinc-200 xl:text-sm"
              onClick={() => navigate('/login')}
            >
              Masuk
            </Button>
          </div>
        </nav>
      </header>
      <Section className="relative items-start justify-start bg-primary bg-[url('@/assets/images/hero-bg.svg')] bg-cover bg-no-repeat xl:min-h-[calc(100vh-80px)] xl:pt-24">
        <Section.Container className="items-start gap-0 xl:flex-col xl:items-center xl:gap-0 xl:px-[120px] xl:text-center">
          <h1 className="text-2xl font-bold text-white xl:text-5xl xl:leading-[64px]">
            Sebuah cara mudah dalam menjawab pertanyaan dan masalah kamu
          </h1>
          <p className="mt-3 text-sm font-medium text-white/80 xl:mt-5 xl:text-base">
            Memiliki kesulitan dalam mengerti pembelajaran di kampus dan ingin mentor serta diskusi dengan orang lain
            yang lebih tau, sudah tidak menjadi masalah dengan aplikasi ini kamu dapat bertanya keseluruh civitas
            akademik mengenai masalahmu dan temukan jawaban terbaikmu ~
          </p>
          <Button
            className="mt-6 gap-2.5 bg-white font-semibold text-primary shadow-xl shadow-white/10 hover:bg-zinc-200 xl:mt-10 xl:rounded-full"
            onClick={() => navigate('/register')}
          >
            <span>Daftar Sekarang</span>
            <HiArrowRight className="text-[17px]" />
          </Button>
        </Section.Container>
        <img
          src={HeroIllustration1}
          alt="illustration"
          className="absolute bottom-0 right-[200px] hidden md:flex md:w-1/3 xl:left-[-262px] xl:w-auto "
        />
        <img
          src={HeroIllustration2}
          alt="illustration"
          className="absolute bottom-0 right-[-50px] w-1/2 md:w-1/3 xl:right-[-262px] xl:w-auto"
        />
      </Section>

      <Section>
        <Section.Container className="justify-between">
          <Section.Image src={ForumIllustration} alt="forum" />
          <Section.Body>
            <Section.Title>Buat Tempat aman untuk berdiskusi</Section.Title>
            <Section.Paragraph>
              Kamu dapat membuat forum yang aman dari konten negatif sebagai tempat bertanya dan berdiskusi dengan topik
              yang kamu inginkan dan mengundang teman-teman kamu.
            </Section.Paragraph>
          </Section.Body>
        </Section.Container>
      </Section>

      <Section className="bg-[#F6F6F6]">
        <Section.Container className="flex-1 items-center justify-between xl:flex-row-reverse">
          <Section.Image src={MemberIllustration} alt="forum" />
          <Section.Body>
            <Section.Title>Tempat nongkrong yang nyaman</Section.Title>
            <Section.Paragraph>
              ASK.UST memberikan tempat yang nyaman untuk berdiskusi dengan teman-teman kamu, dengan fitur-fitur yang
              lengkap dan mudah digunakan.
            </Section.Paragraph>
          </Section.Body>
        </Section.Container>
      </Section>

      <Section>
        <Section.Container className="flex-1 flex-col-reverse justify-center xl:flex-col-reverse xl:gap-4">
          <Section.Image src={MediaIllustration} alt="forum" />
          <Section.Body className="items-center text-center xl:gap-5">
            <Section.Title>Tetap dekat dengan teman-teman forum kamu</Section.Title>
            <Section.Paragraph>
              Suara dan video terasa seperti berada di ruangan yang sama. Sapa melalui video, berdiskusi ringan, atau
              berkumpul dan melakukan sesi menggambar dengan berbagi layar.
            </Section.Paragraph>
          </Section.Body>
        </Section.Container>
      </Section>

      <Section className="bg-[#F6F6F6]">
        <Section.Container className="justify-between">
          <Section.Image src={ProfileIllustration} alt="forum" className="w-[60%]" />
          <Section.Body>
            <Section.Title>Kontributor pembuatan aplikasi</Section.Title>
            <Section.Paragraph>
              ASK.UST dibuat oleh seorang mahasiswa yaitu <b>Ferdinan Imanuel Tumanggor</b> yang memiliki kesulitan
              dalam berdiskusi di universitas-nya, sehingga aplikasi ini dibuat untuk membantu teman-teman yang memiliki
              kesulitan sepertinya.
            </Section.Paragraph>
          </Section.Body>
        </Section.Container>
      </Section>

      <Section className="xl:min-h-0">
        <Section.Container className="items-start gap-0 py-10 xl:w-9/12 xl:flex-col xl:items-center xl:gap-0 xl:p-[100px] xl:text-center">
          <Section.Title className="mb-3 leading-normal xl:mb-6">
            Mulai berdiskusi dan bertanya serta temukan jawaban terbaik dari permasalahan kamu
          </Section.Title>
          <Section.Paragraph className="text-base">
            Diskusi secara online semakin mudah dengan ASK.UST – tetap berdiskusi walaupun pake kuota dari Kemendikbud
            hehe ~. Jadi, tunggu apa lagi, ayo segera mendaftar dan rajin berdiskusi di sini supaya masalah kamu cepat
            terselesaikan biar gak stress mulu ~
          </Section.Paragraph>
          <Button
            className="mt-6 w-fit gap-2.5 dark:bg-primary dark:text-white xl:mt-10 xl:rounded-full xl:shadow-xl xl:shadow-primary/50"
            onClick={() => navigate('/register')}
          >
            <span>Daftar Sekarang</span>
            <HiArrowRight className="text-[17px]" />
          </Button>
        </Section.Container>
      </Section>

      <footer className="bg-primary py-10 text-white xl:py-5">
        <Section.Container className="flex items-center justify-between gap-5 py-0">
          <Brand className="gap-2" />
          <p className="text-sm font-medium">
            dibangun oleh{' '}
            <Link to="https://github.com/ferdinan-ops" target="_blank" className="font-bold hover:underline">
              Ferdinan Imanuel Tumanggor
            </Link>
          </p>
        </Section.Container>
      </footer>
    </>
  )
}
