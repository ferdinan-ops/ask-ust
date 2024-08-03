import * as React from 'react'

export default function useDisableCopy() {
  const [isTryToCopy, setIsTryToCopy] = React.useState(false)

  React.useEffect(() => {
    // Handler untuk mencegah salin teks
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      setIsTryToCopy(true)
    }

    // Handler untuk mencegah klik kanan
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    document.addEventListener('copy', handleCopy)
    document.addEventListener('contextmenu', handleContextMenu)

    // Cleanup event listener ketika komponen unmount
    return () => {
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  return isTryToCopy
}
