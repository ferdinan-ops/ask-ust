import { cn } from '@/lib/utils'

interface MarkdownProps {
  values: string
  className?: string
  type?: 'reset' | 'default'
}

export default function Markdown({ values, type = 'default', className }: MarkdownProps) {
  return (
    <article
      dangerouslySetInnerHTML={{ __html: values }}
      className={cn(
        type === 'default' &&
          `prose
            prose-sm
            md:prose-base 
            prose-headings:text-font prose-headings:font-bold
            prose-h1:text-2xl
            prose-h2:text-xl prose-h3:text-[19px] prose-h4:text-lg
            prose-h5:text-[17px] prose-h6:text-xs
            prose-a:text-primary 
            lg:prose-h1:text-[28px] lg:prose-h2:text-[22px]
            lg:prose-h3:text-xl
            lg:prose-h4:text-lg lg:prose-h5:text-base
            lg:prose-h6:text-sm text-font/80
            max-w-none
            pb-2
            lg:text-[15px]`,
        type === 'reset' && 'prose prose-sm',
        className
      )}
    />
  )
}
