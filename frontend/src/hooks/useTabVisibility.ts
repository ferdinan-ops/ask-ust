import * as React from 'react'

export default function useTabVisibility() {
  const [isTabActive, setIsTabActive] = React.useState(true)

  React.useEffect(() => {
    // Handler untuk perubahan visibilitas tab
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup event listener ketika komponen unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return isTabActive
}
