import { useToast } from '@/components/ui/use-toast'
import * as React from 'react'

export default function useDisableShorcut() {
  const { toast } = useToast()

  React.useEffect(() => {
    // Handler untuk mencegah penggunaan tombol shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key === 'I') || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.key === 'C') || // Ctrl+Shift+C
        (e.ctrlKey && e.shiftKey && e.key === 'J') || // Ctrl+Shift+J
        (e.ctrlKey && e.key === 'U') || // Ctrl+U
        e.key === 'F12' // F12
      ) {
        e.preventDefault()
      }
    }

    // Handler untuk mendeteksi pembukaan DevTools
    const detectDevTools = () => {
      const devtools = /./
      devtools.toString = function () {
        toast({
          title: 'Tidak boleh membuka alat pengembang',
          description: 'Kami peringatkan kamu untuk tidak berbuat curang ya...',
          variant: 'destructive'
        })
        return 'DevTools is open'
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', detectDevTools)

    // Cleanup event listener ketika komponen unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', detectDevTools)
    }
  }, [toast])
}
