import * as React from 'react'

export default function useGetDevices() {
  const [width, setWidth] = React.useState<number>(window.innerWidth)

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const isMobile = width <= 768
  const isTablet = width > 768 && width <= 1024

  return { isMobile, isTablet }
}
