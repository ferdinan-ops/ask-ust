import * as React from 'react'

export default function useReload() {
  React.useEffect(() => {
    // Check if the page has been reloaded before
    const hasReloaded = sessionStorage.getItem('hasReloaded')

    if (!hasReloaded) {
      // If not, set the flag and reload the page
      sessionStorage.setItem('hasReloaded', 'true')
      window.location.reload()
    }
  }, [])
}
