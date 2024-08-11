import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'

interface MarkdownProps {
  values: string
  className?: string
  type?: 'reset' | 'default'
  variant?: 'plain-text' | 'html'
}

export default function Markdown({ values, type = 'default', variant = 'html', className }: MarkdownProps) {
  return variant === 'html' ? (
    <article
      dangerouslySetInnerHTML={{ __html: values }}
      className={cn(type === 'default' && defaultClassName, type === 'reset' && 'prose prose-sm', className)}
    />
  ) : (
    <ReactMarkdown className={cn(defaultClassName, className)}>{values}</ReactMarkdown>
  )
}

const defaultClassName = `prose-headings:text-font
text-font/80
prose 
font-medium
prose-sm max-w-none
pb-2
md:prose-base prose-headings:font-bold prose-h1:text-2xl
prose-h2:text-xl prose-h3:text-[19px]
prose-h4:text-lg 
prose-h5:text-[17px] prose-h6:text-xs
prose-a:text-primary
lg:text-[15px] lg:prose-h1:text-[28px]
lg:prose-h2:text-[22px] lg:prose-h3:text-xl
lg:prose-h4:text-lg
lg:prose-h5:text-base
lg:prose-h6:text-sm`
