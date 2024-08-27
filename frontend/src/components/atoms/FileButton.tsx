import { getExtension, truncateFilename } from '@/lib/utils'
import { TableButton } from '../ui/table'
import { BsFileEarmarkPdfFill } from 'react-icons/bs'
import { HiPhoto } from 'react-icons/hi2'

interface FileButtonProps {
  filename: string
  maxLetters: number
  className?: string
}

export default function FileButton({ filename, maxLetters, className }: FileButtonProps) {
  const handleSeeFile = (filename: string) => {
    window.open(filename, '_blank')
  }

  return (
    <TableButton
      icon={getExtension(filename as string) === '.pdf' ? BsFileEarmarkPdfFill : HiPhoto}
      variant={getExtension(filename as string) === '.pdf' ? 'destructive' : 'info'}
      onClick={() => handleSeeFile(filename as string)}
      className={className}
    >
      {truncateFilename(filename as string, maxLetters)}
    </TableButton>
  )
}
