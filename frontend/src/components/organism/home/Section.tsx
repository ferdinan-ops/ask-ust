import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
}

export default function Section({ children, className }: SectionProps) {
  return (
    <section className={cn('flex flex-col items-center justify-center overflow-hidden xl:min-h-screen', className)}>
      {children}
    </section>
  )
}

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className }: ContainerProps) => (
  <div
    className={cn(
      'mx-auto flex flex-col items-center gap-5 px-5 py-[60px] md:px-10 xl:w-[1180px] xl:flex-row xl:gap-20 xl:py-0',
      className
    )}
  >
    {children}
  </div>
)

interface ImageProps {
  src: string
  alt: string
  className?: string
}

const Image = ({ src, alt, className }: ImageProps) => (
  <img src={src} alt={alt} className={cn('w-full object-cover xl:w-[60%]', className)} />
)

interface BodyProps {
  children: React.ReactNode
  className?: string
}

const Body = ({ children, className }: BodyProps) => (
  <div className={cn('flex flex-col gap-3 xl:gap-6', className)}>{children}</div>
)

const Title = ({ children, className }: BodyProps) => (
  <h2 className={cn('text-2xl font-bold text-primary xl:text-4xl xl:leading-[48px]', className)}>{children}</h2>
)

const Paragraph = ({ children, className }: BodyProps) => (
  <p className={cn('text-base font-medium text-primary/80 xl:text-lg', className)}>{children}</p>
)

Section.Container = Container
Section.Image = Image
Section.Body = Body
Section.Title = Title
Section.Paragraph = Paragraph
